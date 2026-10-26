/* Pizka — motor de la página de cada negocio.
   Lee window.NEGOCIO (definido en <negocio>/datos.js) y arma galería, calendario,
   invitados, barras, toppings, extras y la cotización que se manda por WhatsApp. */
(function () {
  "use strict";
  const N = window.NEGOCIO;
  if (!N) return;

  const $ = (id) => document.getElementById(id);
  const pesos = (n) => "$" + Math.round(n).toLocaleString("es-MX");
  const dos = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const ocupados = new Set(N.diasOcupados || []);
  const pocos = new Set(N.diasCasiLlenos || []);
  const noTrabaja = N.diasQueNoTrabaja || [];
  const min = N.minimoInvitados || 1, max = N.maximoInvitados || 500;

  const st = {
    fecha: null,
    invitados: Math.max(min, N.invitadosIniciales || 50),
    barras: new Set(),          // ids de barras elegidas
    tops: {},                   // idBarra -> Set de toppings
    extras: new Set(),
    m: hoy.getMonth(), y: hoy.getFullYear(),
  };

  document.title = `${N.nombre} · Cotiza tu barra`;
  if (N.color) document.documentElement.style.setProperty("--negocio", N.color);

  /* ---------- Encabezado ---------- */
  $("logo").innerHTML = N.logo ? `<img src="${esc(N.logo)}" alt="Logo de ${esc(N.nombre)}">` : "";
  $("ciudad").textContent = N.ciudad || "";
  $("nombre").textContent = N.nombre;
  $("desc").textContent = N.descripcion || "";
  $("destacados").innerHTML = (N.destacados || []).map((d) => `<li>${esc(d)}</li>`).join("");
  $("redes").innerHTML = Object.entries(N.redes || {}).filter(([, u]) => u)
    .map(([k, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(k)}</a>`).join("");

  /* ---------- Galería y visor ---------- */
  const fotos = N.fotos || [];
  const VISIBLES = 5;
  $("galeria").innerHTML = fotos.slice(0, VISIBLES).map((f, i) =>
    `<button data-foto="${i}" aria-label="Ver foto: ${esc(f.texto)}">
       <img src="${esc(f.archivo)}" alt="${esc(f.texto)}" loading="${i ? "lazy" : "eager"}">
       ${i === VISIBLES - 1 && fotos.length > VISIBLES ? `<span class="mas">+${fotos.length - VISIBLES}</span>` : ""}
     </button>`).join("");
  let fotoActual = 0;
  function verFoto(i) {
    fotoActual = (i + fotos.length) % fotos.length;
    const f = fotos[fotoActual];
    $("visorImg").src = f.archivo; $("visorImg").alt = f.texto || "";
    $("visorTxt").textContent = `${f.texto || ""} · ${fotoActual + 1} de ${fotos.length}`;
    $("visor").hidden = false;
  }

  /* ---------- Calendario ---------- */
  function pintarCal() {
    const { m, y } = st, primero = new Date(y, m, 1), dias = new Date(y, m + 1, 0).getDate();
    const mesTxt = primero.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
    $("mes").textContent = mesTxt.charAt(0).toUpperCase() + mesTxt.slice(1);
    const limite = new Date(hoy); limite.setDate(limite.getDate() + (N.diasDeAnticipacion || 0));
    let h = ["L", "M", "M", "J", "V", "S", "D"].map((d) => `<div class="dow">${d}</div>`).join("");
    for (let i = 0; i < (primero.getDay() + 6) % 7; i++) h += "<div></div>";
    for (let d = 1; d <= dias; d++) {
      const dt = new Date(y, m, d), k = `${y}-${dos(m + 1)}-${dos(d)}`;
      let c = dt < limite ? "pas" : (ocupados.has(k) || noTrabaja.includes(dt.getDay())) ? "ocup" : pocos.has(k) ? "pocos" : "";
      if (st.fecha === k) c += " sel";
      const off = /pas|ocup/.test(c);
      h += `<button class="${c}" ${off ? "disabled" : ""} data-dia="${k}" aria-label="${d}${/ocup/.test(c) ? ", ocupado" : ""}">${d}</button>`;
    }
    $("cal").innerHTML = h;
    $("prev").disabled = y === hoy.getFullYear() && m === hoy.getMonth();
  }

  /* ---------- Invitados ---------- */
  $("minimo").textContent = `Paquetes desde ${min} personas.`;
  $("rango").min = min; $("rango").max = max;
  function invitados(n) {
    st.invitados = Math.max(min, Math.min(max, n));
    $("inv").textContent = st.invitados; $("rango").value = st.invitados;
    cotizar();
  }

  /* ---------- Barras ---------- */
  const barra = (id) => N.barras.find((b) => b.id === id);
  function pintarBarras() {
    $("barras").innerHTML = N.barras.map((b) =>
      `<button class="barra${b.foto ? "" : " sinimg"}" data-barra="${esc(b.id)}" aria-pressed="${st.barras.has(b.id)}">
         ${b.foto ? `<img src="${esc(b.foto)}" alt="" loading="lazy">` : ""}
         <span class="check" aria-hidden="true">✓</span>
         <span class="cuerpo">
           <b>${esc(b.nombre)}</b>
           ${b.descripcion ? `<small>${esc(b.descripcion)}</small>` : ""}
           <span class="precio num">${pesos(b.precioPorPersona)} por persona</span>
         </span>
       </button>`).join("");
  }

  /* ---------- Toppings por barra ---------- */
  function pintarTops() {
    const elegidas = N.barras.filter((b) => st.barras.has(b.id));
    if (!elegidas.length) {
      $("tops").innerHTML = `<p class="vacio">Elige al menos una barra en el paso 3 y aquí aparecen sus toppings.</p>`;
      return;
    }
    $("tops").innerHTML = elegidas.map((b) => {
      const sel = st.tops[b.id] || new Set();
      const grupos = Object.entries(b.toppings || {}).map(([g, lista]) =>
        `<div class="grp">${esc(g)}</div><div class="chips">${lista.map(([t, p]) =>
          `<button class="chip" data-b="${esc(b.id)}" data-t="${esc(t)}" aria-pressed="${sel.has(t)}">${esc(t)}${p ? `<em>+${pesos(p)} p/p</em>` : ""}</button>`).join("")}</div>`).join("");
      return `<div class="persona"><h3>${esc(b.nombre)}</h3>${b.nota ? `<p class="sub">${esc(b.nota)}</p>` : ""}${grupos || `<p class="vacio">Se arma al gusto el día del evento.</p>`}</div>`;
    }).join("");
  }

  /* ---------- Extras del evento ---------- */
  function pintarExtras() {
    $("extras").innerHTML = `<div class="chips">${(N.extras || []).map(([t, p, tipo]) =>
      `<button class="chip" data-x="${esc(t)}" aria-pressed="${st.extras.has(t)}">${esc(t)}<em>+${pesos(p)}${tipo === "persona" ? " p/p" : ""}</em></button>`).join("")}</div>`;
  }

  /* ---------- Cotización ---------- */
  let ultimo = -1;
  function cotizar() {
    const inv = st.invitados, filas = [], detalle = [];
    let total = 0;
    N.barras.filter((b) => st.barras.has(b.id)).forEach((b) => {
      const sel = st.tops[b.id] || new Set();
      const extraPP = (Object.values(b.toppings || {}).flat()).filter(([t]) => sel.has(t)).reduce((s, [, p]) => s + (p || 0), 0);
      const sub = (b.precioPorPersona + extraPP) * inv;
      total += sub;
      filas.push([`${b.nombre} × ${inv}`, pesos(sub)]);
      detalle.push(`• ${b.nombre}${sel.size ? `: ${[...sel].join(", ")}` : ""}`);
    });
    (N.extras || []).filter(([t]) => st.extras.has(t)).forEach(([t, p, tipo]) => {
      const sub = tipo === "persona" ? p * inv : p;
      total += sub; filas.push([t, pesos(sub)]);
    });
    if (N.trasladoYMontaje && st.barras.size) { total += N.trasladoYMontaje; filas.push(["Traslado y montaje", pesos(N.trasladoYMontaje)]); }

    const fechaTxt = st.fecha ? new Date(st.fecha + "T12:00").toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" }) : "Sin elegir";
    $("filas").innerHTML = [["Fecha", fechaTxt], ["Invitados", String(inv)], ...filas]
      .map(([a, b]) => `<div class="fila"><span>${esc(a)}</span><span class="num">${esc(b)}</span></div>`).join("");

    const t = $("total"); t.textContent = pesos(total);
    if (total !== ultimo) { t.classList.remove("salto"); void t.offsetWidth; t.classList.add("salto"); ultimo = total; }
    $("porPersona").textContent = total ? `${pesos(total / inv)} por invitado · anticipo ${Math.round((N.anticipo || 0) * 100)}%: ${pesos(total * (N.anticipo || 0))}` : "";
    $("ejemplo").hidden = !N.preciosDeEjemplo;

    const falta = !st.fecha ? "Elige la fecha de tu evento." : !st.barras.size ? "Elige al menos una barra." : "";
    $("aviso").hidden = !falta; $("aviso").textContent = falta;

    const extrasTxt = (N.extras || []).filter(([x]) => st.extras.has(x)).map(([x]) => x);
    const msg = [
      `¡Hola ${N.nombre}! Quiero cotizar para mi evento:`,
      `📅 Fecha: ${fechaTxt}`,
      `👥 Invitados: ${inv}`,
      ...detalle,
      extrasTxt.length ? `➕ Extras: ${extrasTxt.join(", ")}` : null,
      `💰 Total estimado: ${pesos(total)}`,
      ``, `(Cotizado en pizka.mx)`,
    ].filter((l) => l !== null).join("\n");
    const href = `https://wa.me/${N.whatsapp}?text=${encodeURIComponent(msg)}`;
    ["cta", "ctaMovil"].forEach((id) => { const a = $(id); a.href = href; a.setAttribute("aria-disabled", falta ? "true" : "false"); });
    $("totalMovil").textContent = pesos(total);
    $("resumenMovil").textContent = falta || `${inv} invitados · ${st.barras.size} barra${st.barras.size > 1 ? "s" : ""}`;
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const d = b.dataset;
    if (d.dia) { st.fecha = d.dia; pintarCal(); cotizar(); }
    else if (d.barra) {
      st.barras.has(d.barra) ? st.barras.delete(d.barra) : st.barras.add(d.barra);
      b.setAttribute("aria-pressed", st.barras.has(d.barra)); pintarTops(); cotizar();
    }
    else if (d.t) {
      const s = st.tops[d.b] || (st.tops[d.b] = new Set());
      s.has(d.t) ? s.delete(d.t) : s.add(d.t); b.setAttribute("aria-pressed", s.has(d.t)); cotizar();
    }
    else if (d.x) { st.extras.has(d.x) ? st.extras.delete(d.x) : st.extras.add(d.x); b.setAttribute("aria-pressed", st.extras.has(d.x)); cotizar(); }
    else if (d.foto) verFoto(+d.foto);
    else if (b.id === "menos") invitados(st.invitados - 5);
    else if (b.id === "mas") invitados(st.invitados + 5);
    else if (b.id === "prev") { if (--st.m < 0) { st.m = 11; st.y--; } pintarCal(); }
    else if (b.id === "next") { if (++st.m > 11) { st.m = 0; st.y++; } pintarCal(); }
    else if (b.id === "vAnt") verFoto(fotoActual - 1);
    else if (b.id === "vSig") verFoto(fotoActual + 1);
    else if (b.id === "vCerrar") $("visor").hidden = true;
  });
  $("rango").addEventListener("input", (e) => invitados(+e.target.value));
  document.addEventListener("keydown", (e) => {
    if ($("visor").hidden) return;
    if (e.key === "Escape") $("visor").hidden = true;
    if (e.key === "ArrowRight") verFoto(fotoActual + 1);
    if (e.key === "ArrowLeft") verFoto(fotoActual - 1);
  });

  /* Si al mes actual le quedan pocos días para apartar, el calendario abre en el siguiente */
  {
    const fin = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    if (fin - hoy.getDate() - (N.diasDeAnticipacion || 0) < 7) { st.m = (hoy.getMonth() + 1) % 12; if (st.m === 0) st.y++; }
  }

  /* Arranca con la primera barra elegida para que la cotización no salga vacía */
  if (N.barras.length) st.barras.add(N.barras[0].id);
  pintarBarras(); pintarTops(); pintarExtras(); pintarCal(); invitados(st.invitados);
})();

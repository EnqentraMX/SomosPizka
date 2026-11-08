# -*- coding: utf-8 -*-
"""Pizka · arma la página de cada negocio.

Lee negocios/<slug>.json y escribe:
  public/<slug>/index.html   (la página, con título y vista previa para WhatsApp/Facebook)
  public/<slug>/compartir.jpg (imagen de 1200x630 que se ve al mandar el link)

Uso:  python3 herramientas/armar.py            -> todos los negocios
      python3 herramientas/armar.py tu-barra   -> solo ese
"""
import asyncio, base64, html, json, os, pathlib, sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
PUBLICO = RAIZ / "public"
NEGOCIOS = RAIZ / "negocios"
PLANTILLA = RAIZ / "plantilla" / "negocio.html"
# Dirección pública del sitio (cámbiala cuando tengas dominio propio)
URL_BASE = "https://pizka.demomx.workers.dev/"
# Tipografías locales para dibujar la imagen de vista previa (si no están, usa las del sistema)
FUENTES = pathlib.Path(os.environ.get("PIZKA_FUENTES", "/tmp/claude-0/-home-claude/44511c44-4f6d-516a-a923-024c8755a563/scratchpad/node_modules/@fontsource"))

GIRO_TXT = {"snacks": "Barra de snacks", "taquiza": "Taquizas", "banquete": "Banquetes"}


def pesos(n):
    return "$" + f"{round(n):,}"


def descripcion(n):
    if n.get("resumen"):
        return n["resumen"]
    precios = [b["precioPorPersona"] for b in n["barras"] if b.get("precioPorPersona")]
    desde = f" Desde {pesos(min(precios))} por persona." if precios and not n.get("preciosDeEjemplo") else ""
    return f"Cotiza tu evento en línea: elige tu menú, invitados y fecha, y aparta por WhatsApp.{desde}"


def pagina(n):
    t = PLANTILLA.read_text(encoding="utf-8")
    titulo = f"{n['nombre']} · Cotiza tu evento"
    datos = json.dumps(n, ensure_ascii=False).replace("</", "<\\/")
    rep = {
        "{{TITULO}}": html.escape(titulo),
        "{{DESCRIPCION}}": html.escape(descripcion(n)),
        "{{URL}}": URL_BASE + n["slug"] + "/",
        "{{SLUG}}": n["slug"],
        "{{DATOS}}": datos,
    }
    for a, b in rep.items():
        t = t.replace(a, b)
    return t


def tarjeta(n):
    """HTML de la imagen de vista previa (1200x630)."""
    carpeta = PUBLICO / n["slug"]
    foto = ""
    fotos = n.get("fotos") or []
    if fotos and (carpeta / fotos[0]["archivo"]).exists():
        foto = "data:image/jpeg;base64," + base64.b64encode((carpeta / fotos[0]["archivo"]).read_bytes()).decode()
    logo = ""
    if n.get("logo") and (carpeta / n["logo"]).exists():
        logo = "data:image/jpeg;base64," + base64.b64encode((carpeta / n["logo"]).read_bytes()).decode()
    ff = ""
    if FUENTES.exists():
        for fam, archivo, peso in [("Fraunces", "fraunces/files/fraunces-latin-600-normal.woff2", 600),
                                   ("DM Sans", "dm-sans/files/dm-sans-latin-500-normal.woff2", 500),
                                   ("DM Sans", "dm-sans/files/dm-sans-latin-700-normal.woff2", 700)]:
            p = FUENTES / archivo
            if p.exists():
                ff += f'@font-face{{font-family:"{fam}";font-weight:{peso};src:url("data:font/woff2;base64,{base64.b64encode(p.read_bytes()).decode()}")}}'
    giro = GIRO_TXT.get(n.get("giro", "snacks"), "Eventos")
    menu = " · ".join(b["nombre"].replace("Barra de ", "") for b in n["barras"][:4])
    nombre = html.escape(n["nombre"])
    tam = 92 if len(n["nombre"]) <= 16 else 74 if len(n["nombre"]) <= 24 else 60
    lado = (f'<div class="foto"><img src="{foto}"></div>' if foto else
            '<div class="foto arte"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>')
    marca = f'<img class="logo" src="{logo}">' if logo else ""
    return f"""<html><head><meta charset="utf-8"><style>{ff}
*{{margin:0;box-sizing:border-box}}
body{{width:1200px;height:630px;background:#FAF6EF;color:#1E2A2A;font-family:"DM Sans",system-ui,sans-serif;display:grid;grid-template-columns:1fr 470px;overflow:hidden}}
.tx{{padding:48px 30px 52px 72px;display:flex;flex-direction:column}}
.top{{display:flex;align-items:center;gap:18px}}
.logo{{width:132px;height:132px;border-radius:50%;object-fit:cover;background:#fff;border:5px solid #fff;box-shadow:0 6px 18px rgba(30,42,42,.18)}}
.etq{{font-size:22px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:{n.get('color', '#0F7A66')}}}
h1{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:{tam}px;line-height:1;letter-spacing:-2px;margin-top:24px}}
.menu{{font-size:26px;color:#5B6866;margin-top:22px;line-height:1.35}}
.pie{{margin-top:auto;display:flex;align-items:center;justify-content:space-between}}
.cta{{background:#2BB59A;color:#0B3B31;font-weight:700;font-size:26px;padding:16px 28px;border-radius:999px}}
.pz{{font-family:Fraunces,Georgia,serif;font-weight:600;font-size:30px}} .pz i{{font-style:normal;color:#2BB59A}}
.foto{{margin:36px 36px 36px 0;border-radius:32px;overflow:hidden;position:relative;background:#E9D8B4}}
.foto img{{width:100%;height:100%;object-fit:cover}}
.arte i{{position:absolute;border-radius:28px}}
.arte .b1{{left:30px;top:30px;width:220px;height:300px;background:{n.get('color','#2BB59A')}}}
.arte .b2{{left:270px;top:-40px;width:200px;height:200px;background:#FFB59C}}
.arte .b3{{left:270px;top:180px;width:160px;height:200px;background:#1E2A2A}}
.arte .b4{{left:60px;top:360px;width:330px;height:220px;background:#FFB59C;border-radius:200px 200px 28px 28px}}
</style></head><body>
<div class="tx"><div class="top">{marca}<span class="etq">{html.escape(giro)}</span></div>
<h1>{nombre}</h1><div class="menu">{html.escape(menu)}</div>
<div class="pie"><span class="cta">Cotiza tu evento aquí</span><span class="pz">pizka<i>.</i></span></div></div>
{lado}</body></html>"""


async def imagenes(lista):
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={"width": 1200, "height": 630})
        for n in lista:
            await pg.set_content(tarjeta(n))
            await pg.evaluate("document.fonts.ready")
            await pg.screenshot(path=str(PUBLICO / n["slug"] / "compartir.jpg"), type="jpeg", quality=86)
        await b.close()


def main(slugs):
    lista = []
    for f in sorted(NEGOCIOS.glob("*.json")):
        n = json.loads(f.read_text(encoding="utf-8"))
        n["slug"] = f.stem
        if slugs and n["slug"] not in slugs:
            continue
        carpeta = PUBLICO / n["slug"]
        carpeta.mkdir(parents=True, exist_ok=True)
        (carpeta / "index.html").write_text(pagina(n), encoding="utf-8")
        viejo = carpeta / "datos.js"
        if viejo.exists():
            viejo.unlink()
        lista.append(n)
    asyncio.run(imagenes(lista))
    for n in lista:
        print("ok", n["slug"])


if __name__ == "__main__":
    main(sys.argv[1:])

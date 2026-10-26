# Pizka

**Tu fiesta, en un link.**

Pizka le da a cada barra de snacks su propia página de cotización. Sus clientes eligen la fecha (con días ocupados marcados), el número de invitados, una o varias barras, sus toppings y extras. Ven el total al momento y apartan por WhatsApp con el pedido ya escrito.

- Página de ventas: `pizka.mx`
- Página de cada negocio: `pizka.mx/<negocio>`, por ejemplo `pizka.mx/la-botanita`
- Precio para el negocio: $249 de alta + $99 al mes

## Cómo está organizado

```
public/                  ← lo que se publica en internet
  index.html             página de ventas de Pizka
  404.html
  assets/
    pizka.css            estilos de marca (sistema de diseño "Fresco y elegante")
    negocio.js           motor de las páginas de negocio
  la-botanita/           un negocio = una carpeta; el nombre es su link
    index.html           igual para todos (no se edita)
    datos.js             nombre, fotos, barras, toppings, precios, fechas
    fotos/
plantilla/               copia limpia para dar de alta un negocio nuevo
netlify.toml             le dice a Netlify que publique public/
```

No hay que instalar nada ni compilar: son páginas HTML que Netlify publica directo.

## Dar de alta un negocio

1. Copia `plantilla/` a `public/<link-del-negocio>/`.
2. Llena `datos.js` y pon sus fotos en `fotos/` (máx. ~300 KB cada una, ancho 1000–1200 px).
3. Sube el cambio a GitHub. Netlify lo publica en uno o dos minutos.

## Publicar (una sola vez)

1. Entra a [app.netlify.com](https://app.netlify.com) con tu cuenta de GitHub.
2. **Add new site → Import an existing project → GitHub →** elige `SomosPizka`.
3. Deja todo como viene (Netlify lee `netlify.toml`) y da clic en **Deploy**.
4. En **Site configuration → Change site name** ponle `somospizka` → `somospizka.netlify.app`.
5. Cuando compres el dominio: **Domain management → Add a domain**.

## Siguientes etapas

- [ ] Precios reales de La Botanita (`preciosDeEjemplo: false`)
- [ ] Ícono de app (favicon y redes)
- [ ] Panel para que cada negocio edite sus precios, fotos y días ocupados (Supabase)
- [ ] Cobro automático de la mensualidad (Mercado Pago o Stripe)
- [ ] Panel de administrador y estadísticas de cotizaciones por negocio

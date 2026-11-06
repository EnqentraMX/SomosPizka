# Pizka

**Tu fiesta, en un link.** Páginas de cotización para barras de snacks, taquizas y banquetes.
El cliente elige menú, opciones, invitados y fecha; ve el total y aparta por WhatsApp.
Precio para el negocio: $299 de alta + $99 al mes.

## Organización

```
negocios/<slug>.json     datos de cada negocio (lo único que se edita)
plantilla/negocio.html   plantilla de la página de negocio
herramientas/armar.py    genera public/<slug>/index.html y compartir.jpg
public/                  lo que se publica
  index.html             página de ventas
  assets/                motor (negocio.js), estilos (pizka.css), ícono
  <slug>/                página de cada negocio + fotos/
wrangler.jsonc           configuración de Cloudflare
```

## Dar de alta o cambiar un negocio

1. Crea o edita `negocios/<slug>.json` (copia uno de `negocios/ejemplo-*.json`).
2. Pon las fotos en `public/<slug>/fotos/`.
3. `python3 herramientas/armar.py <slug>`
4. Sube a GitHub. Cloudflare publica solo.

## Publicación

Cloudflare (cuenta demomx) conectado a este repositorio, proyecto `pizka`:
`https://pizka.demomx.workers.dev/`. Si cambia la dirección, actualiza `URL_BASE` en
`herramientas/armar.py` y las etiquetas `og:` de `public/index.html`.

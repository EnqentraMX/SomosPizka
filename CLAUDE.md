# Notas para Claude

- Proyecto de un emprendedor sin experiencia en programación. Explica en español sencillo, sin jerga, y pide confirmación antes de cambios grandes.
- Pizka: páginas de cotización para negocios de comida para eventos: barras de snacks, taquizas y banquetes. Precio: $299 de alta + $99 al mes. WhatsApp de Pizka: 529511836468.
- Sitio estático sin build en el servidor: `public/` se publica tal cual en Cloudflare (`wrangler.jsonc`, proyecto `pizka`, en la cuenta demomx). No agregues frameworks.
- Los datos de cada negocio viven en `negocios/<slug>.json`. Después de cualquier cambio corre `python3 herramientas/armar.py [slug]`: escribe `public/<slug>/index.html` (desde `plantilla/negocio.html`) y `public/<slug>/compartir.jpg` (vista previa para WhatsApp). Nunca edites `public/<slug>/index.html` a mano. Las fotos van en `public/<slug>/fotos/`.
- `giro`: "snacks" (varias barras combinables), "taquiza" o "banquete" (se elige un solo paquete). Límites con `elige` {"Grupo": n o [[desdeInvitados, n], ...]} y `eligeTotal`; `incluye` para lo que ya va; `precioPorPersona: null` en todas = modo "Pedir cotización". `demo: true` muestra la cinta de ejemplo.
- Motor: `public/assets/negocio.js`; estilos: `public/assets/pizka.css`; página de ventas: `public/index.html`.
- Los negocios no deben verse entre sí: sin directorio ni enlaces cruzados; las páginas de negocio llevan `noindex`. Los ejemplos de la página de ventas son ficticios (`ejemplo-*`).
- Marca "Fresco y elegante": crema `#FAF6EF`, menta `#2BB59A` (solo acción principal y selección, texto encima `#0B3B31`), durazno `#FFB59C`, carbón `#1E2A2A`. Títulos Fraunces 600, texto DM Sans. `color` del negocio solo tiñe detalles.
- Textos de cara al cliente: de tú, verbo primero en botones, precios como $3,600.
- Nunca inventes precios como si fueran reales: si no vienen del negocio, `preciosDeEjemplo: true` o modo cotización.

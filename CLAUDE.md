# Notas para Claude

- Proyecto de un emprendedor sin experiencia en programación. Explica en español sencillo, sin jerga, y pide confirmación antes de cambios grandes.
- Sitio estático sin build: `public/` se publica tal cual en Netlify (`netlify.toml`). No agregues frameworks ni pasos de compilación sin acordarlo.
- Cada negocio vive en `public/<slug>/` con `index.html` (idéntico a `plantilla/index.html`) y `datos.js` (`window.NEGOCIO`). El motor es `public/assets/negocio.js`; los estilos `public/assets/pizka.css`.
- Los negocios no deben verse entre sí: no hay directorio ni enlaces cruzados, y las páginas de negocio llevan `noindex`.
- Marca: Pizka, slogan "Tu fiesta, en un link.". Dirección "Fresco y elegante": crema `#FAF6EF`, menta `#2BB59A` (solo acción principal y selección, texto encima `#0B3B31`), durazno `#FFB59C` de acento, carbón `#1E2A2A`. Títulos en Fraunces 600, texto en DM Sans. El color de cada negocio (`NEGOCIO.color`) solo tiñe detalles.
- Textos de cara al cliente: de tú, verbo primero en botones, precios como $3,600.
- Nunca inventes precios como si fueran reales: si no vienen del negocio, deja `preciosDeEjemplo: true`.

/* =========================================================
   PLANTILLA DE NEGOCIO NUEVO
   1. Copia esta carpeta completa dentro de public/ y renómbrala
      con el link del negocio (minúsculas, sin acentos ni espacios):
      public/dulce-antojo  ->  pizka.mx/dulce-antojo
   2. Cambia los datos de abajo y pon sus fotos en fotos/.
   3. Sube los cambios a GitHub. Netlify publica solo.
   ========================================================= */
window.NEGOCIO = {
  nombre: "Nombre del negocio",
  ciudad: "Barra de snacks · Ciudad",
  descripcion: "Más de 30 servicios para todo tipo de eventos: cumpleaños, bodas, XV años y corporativos. El sabor que hace tus momentos especiales.",
  destacados: [
    "Más de 30 servicios",
    "Dentro y fuera de la ciudad",
    "Paquetes para corporativos",
    "Facturamos",
    "Degustación sin costo",
  ],

  whatsapp: "52XXXXXXXXXX",      // 52 + 10 dígitos
  color: "#C2185B",               // rosa de La Botanita, para detalles
  logo: "fotos/logo.jpg",

  redes: {
    "Facebook": "",
    "Instagram": "",
    "TikTok": "",
  },

  fotos: [
    { archivo: "fotos/snacks-tl.jpg",   texto: "Carrito de snacks" },
    { archivo: "fotos/fresas-br.jpg",   texto: "Fresas con crema" },
    { archivo: "fotos/hotcakes-bl.jpg", texto: "Mini hotcakes" },
    { archivo: "fotos/paletas-bl.jpg",  texto: "Paleta loca" },
    { archivo: "fotos/snacks-bl.jpg",   texto: "Vaso personalizado" },
    { archivo: "fotos/snacks-tr.jpg",   texto: "Barra de snacks" },
    { archivo: "fotos/fresas-bl.jpg",   texto: "Fresas con chocolate" },
    { archivo: "fotos/hotcakes-br.jpg", texto: "Mini hotcakes con fruta" },
    { archivo: "fotos/paletas-br.jpg",  texto: "Paleta con gomitas" },
    { archivo: "fotos/snacks-br.jpg",   texto: "Vaso de snacks" },
    { archivo: "fotos/hotcakes-tl.jpg", texto: "Montaje en jardín" },
    { archivo: "fotos/paletas-tl.jpg",  texto: "Carrito de paletas" },
    { archivo: "fotos/fresas-tl.jpg",   texto: "Montaje corporativo" },
    { archivo: "fotos/fresas-tr.jpg",   texto: "Toppings dulces" },
    { archivo: "fotos/paletas-tr.jpg",  texto: "Toppings enchilados" },
  ],

  minimoInvitados: 30,
  maximoInvitados: 500,
  invitadosIniciales: 50,
  anticipo: 0.5,
  trasladoYMontaje: 0,
  diasDeAnticipacion: 2,
  preciosDeEjemplo: true,

  // Cada barra: precio por persona y sus toppings.
  // ["Topping", 0] = incluido · ["Topping", 5] = +$5 por persona
  barras: [
    {
      id: "snacks", nombre: "Barra de Snacks", foto: "fotos/snacks-tr.jpg",
      descripcion: "Vasos preparados con frituras, fruta, verdura y dulces",
      precioPorPersona: 85,
      toppings: {
        "Frituras": [["Churritos", 0], ["Papas", 0], ["Palomitas", 0], ["Cacahuates", 0]],
        "Fruta y verdura": [["Pepino", 0], ["Piña", 0], ["Zanahoria", 0], ["Jícama", 0]],
        "Dulces": [["Gomitas", 0], ["Gusanitos", 0], ["Tiburones", 0], ["Banderilla enchilada", 5]],
        "Salsas": [["Valentina", 0], ["Chamoy", 0], ["Limón", 0], ["Chile en polvo", 0]],
      },
    },
    {
      id: "fresas", nombre: "Barra de Fresas con Crema", foto: "fotos/fresas-br.jpg",
      descripcion: "Fresas con crema y toppings dulces",
      precioPorPersona: 75,
      toppings: {
        "Toppings": [["Oreo", 0], ["Chispas de colores", 0], ["Bombones", 0], ["Lunetas", 0], ["Chocolate", 0]],
        "Para agregar": [["Uva", 4], ["Frutos secos", 6], ["Chantilli", 5]],
      },
    },
    {
      id: "hotcakes", nombre: "Barra de Mini Hotcakes", foto: "fotos/hotcakes-br.jpg",
      descripcion: "Hechos al momento, con todas las cubiertas incluidas",
      precioPorPersona: 80,
      toppings: {
        "Fruta": [["Fresa", 0], ["Plátano", 0], ["Uva", 0]],
        "Toppings": [["Oreo", 0], ["Chispas de colores", 0], ["Bombones", 0], ["Lunetas", 0], ["Nuez", 0], ["Granola", 0]],
        "Cubiertas": [["Chocolate", 0], ["Crema de avellana", 0], ["Lechera", 0], ["Cajeta", 0]],
      },
    },
    {
      id: "paletas", nombre: "Barra de Paletas Locas", foto: "fotos/paletas-bl.jpg",
      descripcion: "Paletas de hielo con chamoy, dulces y enchilados",
      precioPorPersona: 70,
      toppings: {
        "Dulces": [["Gusanitos", 0], ["Ositos", 0], ["Tiburones", 0], ["Churritos enchilados", 0], ["Cacahuates", 0]],
        "Fruta y verdura": [["Pepino", 0], ["Jícama", 0], ["Zanahoria", 0], ["Limón", 0]],
        "Escarchado": [["Chamoy", 0], ["Chile en polvo", 0], ["Diamantina comestible", 4]],
      },
    },
    {
      id: "elotes", nombre: "Elotes y Esquites", foto: "",
      descripcion: "Preparados al gusto",
      precioPorPersona: 70,
      toppings: {
        "Preparación": [["Mayonesa", 0], ["Queso", 0], ["Chile en polvo", 0], ["Limón", 0], ["Crema", 0]],
        "Para agregar": [["Tuétano", 10], ["Cueritos", 6]],
      },
    },
    { id: "maruchan", nombre: "Maruchan Preparadas", foto: "", descripcion: "Con salsas, limón y toppings", precioPorPersona: 65,
      toppings: { "Preparación": [["Salsa Valentina", 0], ["Limón", 0], ["Cueritos", 0], ["Queso", 0]] } },
    { id: "frapes", nombre: "Barra de Frapés", foto: "", descripcion: "Frapés con crema batida", precioPorPersona: 75,
      toppings: { "Sabores": [["Oreo", 0], ["Moka", 0], ["Chocolate", 0], ["Taro", 0]] } },
    { id: "mezcalinas", nombre: "Mezcalinas", foto: "", descripcion: "Para mayores de edad", precioPorPersona: 95,
      nota: "Servicio solo para invitados mayores de edad.",
      toppings: { "Sabores": [["Maracuyá", 0], ["Mango", 0], ["Jamaica", 0], ["Tamarindo", 0]] } },
  ],

  // ["Extra", precio, "persona"] = por invitado · sin "persona" = precio fijo por evento
  extras: [
    ["Vaso personalizado con nombre", 8, "persona"],
    ["Decoración temática", 500],
    ["Hora extra de servicio", 600],
    ["Servicio fuera de la ciudad", 800],
  ],

  // CALENDARIO (formato "AAAA-MM-DD")
  diasOcupados: ["2026-10-31", "2026-11-01", "2026-11-07", "2026-11-14", "2026-11-15", "2026-11-21", "2026-11-28", "2026-12-05", "2026-12-12", "2026-12-19", "2026-12-20"],
  diasCasiLlenos: ["2026-11-08", "2026-11-22", "2026-12-06", "2026-12-13"],
  diasQueNoTrabaja: [],
};

/* =========================================================
   SNACKS QUIERO MÁS
   pizka.mx/snacks-quiero-mas
   ---------------------------------------------------------
   Sin precios todavía: la página funciona como "Pedir cotización".
   Cuando el negocio pase sus precios, agrega precioPorPersona
   a cada barra y la página mostrará el total automáticamente.
   Pendiente de confirmar: ciudad, anticipo, días ocupados,
   detalle de Fresas con crema y del carrito de palomitas.
   ========================================================= */
window.NEGOCIO = {
  nombre: "Snacks Quiero Más",
  ciudad: "Barra de snacks para eventos",
  descripcion: "Barras de snacks, esquites, dorilocos, mini hotcakes y más para tus fiestas. Tú eliges los toppings y nosotros llegamos con todo.",
  destacados: [
    "Paquetes desde 50 personas",
    "8 barras para elegir",
    "Tú eliges tus toppings",
  ],

  whatsapp: "525569738267",
  color: "#B0168F",
  logo: "fotos/logo.jpg",

  redes: {
    "Instagram": "https://www.instagram.com/snaks_quiero_mas",
    "TikTok": "https://www.tiktok.com/@snacks.quieromas",
  },

  fotos: [
    { archivo: "fotos/carrito-dia.jpg",        texto: "Barra de snacks" },
    { archivo: "fotos/vasos.jpg",              texto: "Vasos preparados" },
    { archivo: "fotos/minihotcakes.jpg",       texto: "Mini hotcakes" },
    { archivo: "fotos/doriesquites.jpg",       texto: "Doriesquites" },
    { archivo: "fotos/carrito-noche.jpg",      texto: "Barra iluminada" },
    { archivo: "fotos/palomitas.jpg",          texto: "Carrito de palomitas" },
    { archivo: "fotos/palomitas-servicio.jpg", texto: "En tu evento" },
    { archivo: "fotos/cajita-hotcakes.jpg",    texto: "Cajita de mini hotcakes" },
  ],

  minimoInvitados: 50,
  maximoInvitados: 500,
  invitadosIniciales: 50,
  diasDeAnticipacion: 2,

  // precioPorPersona: null  ->  "Pedir cotización" (no se muestran precios)
  barras: [
    {
      id: "snacks", nombre: "Barra de Snacks", foto: "fotos/vasos.jpg",
      descripcion: "Vasos preparados con verdura, gomitas, dulces y botanas",
      precioPorPersona: null,
      eligeTotal: 15,
      toppings: {
        "Verdura": [["Pepino", 0], ["Zanahoria", 0], ["Jícama", 0]],
        "Gomitas": [["Manguitos enchilados", 0], ["Panditas", 0], ["Pandita enchilado", 0], ["Lombrices", 0], ["Frutas de azúcar", 0]],
        "Dulces": [["Mini Pelón", 0], ["Pulparindo", 0], ["Tamborcitos", 0], ["Skwinkles", 0]],
        "Botanas": [["Cacahuates", 0], ["Japonés", 0], ["Cacahuate Hot Nuts", 0], ["Cueritos", 0], ["Papas naturales", 0], ["Papas adobadas", 0]],
      },
      incluye: ["limón", "sal", "Miguelito", "Tajín", "botanera", "Valentina", "salsas", "inglesa", "Maggi"],
    },
    {
      id: "dorilocos", nombre: "Barra de Dorilocos", foto: "",
      descripcion: "El snack más completo de Quiero Más",
      precioPorPersona: null,
      elige: { "Gomita enchilada": 1, "Gomita dulce": 1 },
      toppings: {
        "Verdura": [["Pepino", 0], ["Zanahoria", 0], ["Jícama", 0]],
        "Gomita enchilada": [["Manguitos enchilados", 0], ["Pandita enchilado", 0]],
        "Gomita dulce": [["Panditas", 0], ["Lombrices", 0], ["Frutas de azúcar", 0]],
        "Botanas": [["Cacahuates", 0], ["Japonés", 0], ["Cacahuate Hot Nuts", 0], ["Cueritos", 0]],
      },
      incluye: ["limón", "sal", "Miguelito", "Tajín", "botanera", "Valentina", "salsas", "inglesa", "Maggi"],
    },
    {
      id: "esquites", nombre: "Barra de Esquites", foto: "",
      descripcion: "Con chilito y limón",
      precioPorPersona: null,
      elige: { "Topping": 3 },
      toppings: {
        "Topping": [["Ruffles de queso", 0], ["Doritos Nacho", 0], ["Doritos Incógnita", 0], ["Cheetos Flamin' Hot", 0], ["Takis Fuego", 0], ["Takis verdes", 0], ["Cheetos naranjas", 0]],
      },
      incluye: ["mayonesa", "queso rallado", "limón", "chile que no pica", "chile que pica", "botanera", "salsa Valentina"],
    },
    {
      id: "doriesquites", nombre: "Doriesquites", foto: "fotos/doriesquites.jpg",
      descripcion: "Esquites servidos sobre Doritos",
      precioPorPersona: null,
      toppings: {},
      incluye: ["mayonesa", "queso rallado", "limón", "chile que no pica", "chile que pica", "botanera", "salsa Valentina"],
    },
    {
      id: "hotcakes", nombre: "Barra de Mini Hotcakes", foto: "fotos/minihotcakes.jpg",
      descripcion: "Esponjositos y llenos de sabor",
      precioPorPersona: null,
      elige: { "Topping": 6, "Untable": 5, "Fruta": [[100, 3], [0, 2]] },
      nota: "Fruta: eliges 2 para 50 personas y 3 desde 100 personas. Depende de la temporada.",
      toppings: {
        "Topping": [["Lunetas", 0], ["Nuez", 0], ["Chispas de chocolate", 0], ["Granillo de chocolate", 0], ["Granillo de colores", 0], ["Mazapán", 0], ["Kranky", 0], ["Mini Oreo", 0], ["Mini tapón de chocolate", 0], ["Mini bombones", 0]],
        "Untable": [["Lechera", 0], ["Nutella", 0], ["Miel", 0], ["Cajeta", 0], ["Hershey's", 0], ["Crema batida", 0], ["Mermelada de fresa", 0]],
        "Fruta": [["Durazno", 0], ["Fresa", 0], ["Uva", 0], ["Plátano", 0], ["Blueberry", 0]],
      },
    },
    {
      id: "paletas", nombre: "Barra de Paletas Locas", foto: "",
      descripcion: "Paletas de agua enchiladas o de leche con chocolate",
      precioPorPersona: null,
      elige: { "Tipo de paleta": 1 },
      eligeTotal: 6,
      toppings: {
        "Tipo de paleta": [["De agua (chamoy, Miguelito y Tajín)", 0], ["De leche (chocolate derretido)", 0]],
        "Para paletas de agua": [["Gomitas de ositos", 0], ["Tiburón", 0], ["Lombrices", 0], ["Mango enchilado", 0], ["Skwinkles", 0], ["Pica fresa", 0], ["Cama de fruta: pepino y jícama", 0]],
        "Para paletas de leche": [["Chispas de chocolate", 0], ["Kranky", 0], ["Cereal", 0], ["Granillo de colores", 0], ["Nuez", 0], ["Granola", 0], ["Granillo de chocolate", 0]],
      },
    },
    {
      id: "fresas", nombre: "Fresas con Crema", foto: "",
      descripcion: "Fresas con crema y toppings",
      precioPorPersona: null,
      toppings: {},
    },
    {
      id: "palomitas", nombre: "Carrito de Palomitas", foto: "fotos/palomitas.jpg",
      descripcion: "Palomitas recién hechas en tu evento",
      precioPorPersona: null,
      toppings: {},
    },
  ],

  extras: [],

  // CALENDARIO (formato "AAAA-MM-DD") — pendiente que el negocio pase sus fechas
  diasOcupados: [],
  diasCasiLlenos: [],
  diasQueNoTrabaja: [],
};

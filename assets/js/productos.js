const productos = [
  { codigo: "TC001", nombre: "Torta Cuadrada de Chocolate", categoria: "Tortas Cuadradas", precio: 45000, descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Square_Piece_of_Chocolate_Cake_%2828157518369%29.jpg/960px-Square_Piece_of_Chocolate_Cake_%2828157518369%29.jpg" },
  { codigo: "TC002", nombre: "Torta Cuadrada de Frutas", categoria: "Tortas Cuadradas", precio: 50000, descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Fruit_cake%281%29.jpg/960px-Fruit_cake%281%29.jpg" },
  { codigo: "TT001", nombre: "Torta Circular de Vainilla", categoria: "Tortas Circulares", precio: 40000, descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.", imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Vanilla_Cake.jpg" },
  { codigo: "TT002", nombre: "Torta Circular de Manjar", categoria: "Tortas Circulares", precio: 42000, descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Torta_de_Chocolate_y_Dulce_de_Leche_San_Martin_de_los_Andes.JPG/960px-Torta_de_Chocolate_y_Dulce_de_Leche_San_Martin_de_los_Andes.JPG" },
  { codigo: "PI001", nombre: "Mousse de Chocolate", categoria: "Postres Individuales", precio: 5000, descripcion: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Chocolate_mousse_%2816013444604%29.jpg/960px-Chocolate_mousse_%2816013444604%29.jpg" },
  { codigo: "PI002", nombre: "Tiramisú Clásico", categoria: "Postres Individuales", precio: 5500, descripcion: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/001_Tiramisu.jpg/960px-001_Tiramisu.jpg" },
  { codigo: "PSA001", nombre: "Torta Sin Azúcar de Naranja", categoria: "Productos Sin Azúcar", precio: 48000, descripcion: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.", imagen: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Orange_Cake_Garnished_with_Fresh_Citrus_Slices.jpg" },
  { codigo: "PSA002", nombre: "Cheesecake Sin Azúcar", categoria: "Productos Sin Azúcar", precio: 47000, descripcion: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Plain_New_York-style_cheesecake.JPG/960px-Plain_New_York-style_cheesecake.JPG" },
  { codigo: "PT001", nombre: "Empanada de Manzana", categoria: "Pastelería Tradicional", precio: 3000, descripcion: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/77/Pastry-Turnover-Apple.jpg/960px-Pastry-Turnover-Apple.jpg" },
  { codigo: "PT002", nombre: "Tarta de Santiago", categoria: "Pastelería Tradicional", precio: 6000, descripcion: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Tarta_de_Santiago-2009.jpg/960px-Tarta_de_Santiago-2009.jpg" },
  { codigo: "PG001", nombre: "Brownie Sin Gluten", categoria: "Productos Sin Gluten", precio: 4000, descripcion: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/af/Brownie_%281%29.jpg/960px-Brownie_%281%29.jpg" },
  { codigo: "PG002", nombre: "Pan Sin Gluten", categoria: "Productos Sin Gluten", precio: 3500, descripcion: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Non_gluten_bread.jpg/960px-Non_gluten_bread.jpg" },
  { codigo: "PV001", nombre: "Torta Vegana de Chocolate", categoria: "Productos Vegana", precio: 50000, descripcion: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Vegan_Chocolate_Cake.jpg/960px-Vegan_Chocolate_Cake.jpg" },
  { codigo: "PV002", nombre: "Galletas Veganas de Avena", categoria: "Productos Vegana", precio: 4500, descripcion: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Oatmeal_cookies_on_a_plate.jpg/960px-Oatmeal_cookies_on_a_plate.jpg" },
  { codigo: "TE001", nombre: "Torta Especial de Cumpleaños", categoria: "Tortas Especiales", precio: 55000, descripcion: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.", imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Birthday_cake_with_candles.jpg" },
  { codigo: "TE002", nombre: "Torta Especial de Boda", categoria: "Tortas Especiales", precio: 60000, descripcion: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.", imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Wedding_cake_-_Kathmandu%2C_Nepal_on_2018.jpg/960px-Wedding_cake_-_Kathmandu%2C_Nepal_on_2018.jpg" }
];

function formatearPrecio(precio) {
  return precio.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });
}

function crearElementoTexto(etiqueta, texto, clase) {
  const elemento = document.createElement(etiqueta);
  elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}

function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "product-card";
  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = `Representación de ${producto.nombre}`;
  imagen.className = "product-image";
  imagen.loading = "lazy";
  imagen.decoding = "async";
  const contenido = document.createElement("div");
  contenido.className = "product-card-content";
  contenido.appendChild(crearElementoTexto("p", producto.codigo, "product-code"));
  contenido.appendChild(crearElementoTexto("h3", producto.nombre));
  contenido.appendChild(crearElementoTexto("p", producto.categoria, "product-category"));
  contenido.appendChild(crearElementoTexto("p", formatearPrecio(producto.precio), "product-price"));
  const enlace = document.createElement("a");
  enlace.href = `producto-detalle.html?codigo=${encodeURIComponent(producto.codigo)}`;
  enlace.className = "button";
  enlace.textContent = "Ver detalle";
  contenido.appendChild(enlace);
  tarjeta.appendChild(imagen);
  tarjeta.appendChild(contenido);
  return tarjeta;
}

function mostrarProductos(listaProductos) {
  const catalogo = document.querySelector("#catalogo-productos");
  const mensaje = document.querySelector("#mensaje-sin-resultados");
  catalogo.replaceChildren();
  mensaje.hidden = listaProductos.length !== 0;
  listaProductos.forEach(function (producto) { catalogo.appendChild(crearTarjetaProducto(producto)); });
}

function filtrarProductos() {
  const texto = document.querySelector("#buscar").value.trim().toLowerCase();
  const categoria = document.querySelector("#categoria").value;
  const filtrados = productos.filter(function (producto) {
    const coincideTexto = producto.nombre.toLowerCase().includes(texto) || producto.codigo.toLowerCase().includes(texto);
    const coincideCategoria = categoria === "" || producto.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });
  mostrarProductos(filtrados);
}

function iniciarCatalogo() {
  if (!document.querySelector("#catalogo-productos")) return;
  mostrarProductos(productos);
  document.querySelector("#buscar").addEventListener("input", filtrarProductos);
  document.querySelector("#categoria").addEventListener("change", filtrarProductos);
}

function esTortaPersonalizable(producto) {
  return producto.nombre.toLowerCase().startsWith("torta");
}

function mostrarDetalleProducto(producto) {
  const detalle = document.querySelector("#detalle-producto");
  detalle.replaceChildren();
  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = `Representación de ${producto.nombre}`;
  imagen.className = "detail-image";
  imagen.loading = "lazy";
  imagen.decoding = "async";
  const informacion = document.createElement("div");
  informacion.className = "detail-content";
  informacion.appendChild(crearElementoTexto("p", producto.codigo, "product-code"));
  informacion.appendChild(crearElementoTexto("h1", producto.nombre));
  informacion.appendChild(crearElementoTexto("p", producto.categoria, "product-category"));
  informacion.appendChild(crearElementoTexto("p", producto.descripcion));
  informacion.appendChild(crearElementoTexto("p", formatearPrecio(producto.precio), "product-price detail-price"));
  if (esTortaPersonalizable(producto)) {
    const campo = document.createElement("div");
    campo.className = "field personalization-field";
    const etiqueta = document.createElement("label");
    etiqueta.htmlFor = "mensaje-torta";
    etiqueta.textContent = "Mensaje para la torta";
    const entrada = document.createElement("input");
    entrada.id = "mensaje-torta";
    entrada.name = "mensaje-torta";
    entrada.type = "text";
    entrada.maxLength = 50;
    entrada.placeholder = "Máximo 50 caracteres";
    campo.appendChild(etiqueta);
    campo.appendChild(entrada);
    informacion.appendChild(campo);
  }
  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = "Agregar al carrito";
  const aviso = crearElementoTexto("p", "", "cart-notice");
  aviso.setAttribute("role", "status");
  boton.addEventListener("click", function () { aviso.textContent = "El carrito se implementará en la próxima etapa."; });
  informacion.appendChild(boton);
  informacion.appendChild(aviso);
  detalle.appendChild(imagen);
  detalle.appendChild(informacion);
}

function iniciarDetalle() {
  const detalle = document.querySelector("#detalle-producto");
  if (!detalle) return;
  const codigo = new URLSearchParams(window.location.search).get("codigo");
  const encontrado = productos.find(function (producto) { return producto.codigo === codigo; });
  if (encontrado) {
    mostrarDetalleProducto(encontrado);
  } else {
    detalle.className = "empty-state no-results";
    detalle.appendChild(crearElementoTexto("h1", "Producto no encontrado"));
    detalle.appendChild(crearElementoTexto("p", "El código indicado no corresponde a un producto del catálogo."));
  }
}

iniciarCatalogo();
iniciarDetalle();

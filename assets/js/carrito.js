const CLAVE_CARRITO = "carritoMilSabores";

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function lineaCarritoValida(linea) {
  if (!linea || typeof linea !== "object") return false;
  const productoExiste = productos.find(function (producto) {
    return producto.codigo === linea.codigo;
  });
  const cantidadValida = Number.isInteger(linea.cantidad) && linea.cantidad >= 1;
  const mensajeValido = linea.mensaje === undefined ||
    (typeof linea.mensaje === "string" && linea.mensaje.length <= 50);
  return Boolean(productoExiste) && cantidadValida && mensajeValido;
}

function obtenerCarrito() {
  const datosGuardados = localStorage.getItem(CLAVE_CARRITO);
  if (!datosGuardados) return [];

  try {
    const carrito = JSON.parse(datosGuardados);
    if (!Array.isArray(carrito) || !carrito.every(lineaCarritoValida)) {
      guardarCarrito([]);
      return [];
    }
    return carrito;
  } catch (error) {
    guardarCarrito([]);
    return [];
  }
}

function agregarProductoAlCarrito(codigo, mensajeIngresado) {
  const carrito = obtenerCarrito();
  const mensaje = String(mensajeIngresado || "").trim().slice(0, 50).trim();
  const indice = carrito.findIndex(function (linea) {
    return linea.codigo === codigo && (linea.mensaje || "") === mensaje;
  });

  if (indice >= 0) {
    carrito[indice].cantidad += 1;
  } else {
    const nuevaLinea = { codigo: codigo, cantidad: 1 };
    if (mensaje) nuevaLinea.mensaje = mensaje;
    carrito.push(nuevaLinea);
  }

  guardarCarrito(carrito);
}

function calcularSubtotal(linea, producto) {
  return linea.cantidad * producto.precio;
}

function calcularTotal(carrito) {
  let total = 0;
  carrito.forEach(function (linea) {
    const producto = productos.find(function (item) { return item.codigo === linea.codigo; });
    total += calcularSubtotal(linea, producto);
  });
  return total;
}

function calcularTotalUnidades(carrito) {
  let unidades = 0;
  carrito.forEach(function (linea) { unidades += linea.cantidad; });
  return unidades;
}

function cambiarCantidad(indice, cambio) {
  const carrito = obtenerCarrito();
  if (!carrito[indice]) return;
  const nuevaCantidad = carrito[indice].cantidad + cambio;
  if (nuevaCantidad < 1) return;
  carrito[indice].cantidad = nuevaCantidad;
  guardarCarrito(carrito);
  mostrarCarrito();
}

function eliminarLinea(indice) {
  const carrito = obtenerCarrito();
  if (!carrito[indice]) return;
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
}

function crearBoton(texto, clase, accion) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = clase;
  boton.textContent = texto;
  boton.addEventListener("click", accion);
  return boton;
}

function crearLineaCarrito(linea, indice) {
  const producto = productos.find(function (item) { return item.codigo === linea.codigo; });
  const articulo = document.createElement("article");
  articulo.className = "cart-item";

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = `Representación de ${producto.nombre}`;
  imagen.className = "cart-item-image";
  imagen.loading = "lazy";
  imagen.decoding = "async";

  const informacion = document.createElement("div");
  informacion.className = "cart-item-info";
  informacion.appendChild(crearElementoTexto("p", producto.codigo, "product-code"));
  informacion.appendChild(crearElementoTexto("h2", producto.nombre));
  informacion.appendChild(crearElementoTexto("p", `Precio unitario: ${formatearPrecio(producto.precio)}`));
  if (linea.mensaje) {
    informacion.appendChild(crearElementoTexto("p", `Mensaje: ${linea.mensaje}`, "cart-message"));
  }

  const controles = document.createElement("div");
  controles.className = "quantity-controls";
  controles.appendChild(crearBoton("−", "quantity-button", function () { cambiarCantidad(indice, -1); }));
  const cantidad = crearElementoTexto("span", String(linea.cantidad), "quantity-value");
  cantidad.setAttribute("aria-label", `Cantidad: ${linea.cantidad}`);
  controles.appendChild(cantidad);
  controles.appendChild(crearBoton("+", "quantity-button", function () { cambiarCantidad(indice, 1); }));
  informacion.appendChild(controles);

  const acciones = document.createElement("div");
  acciones.className = "cart-item-actions";
  acciones.appendChild(crearElementoTexto("p", `Subtotal: ${formatearPrecio(calcularSubtotal(linea, producto))}`, "cart-subtotal"));
  acciones.appendChild(crearBoton("Eliminar", "remove-button", function () { eliminarLinea(indice); }));

  articulo.appendChild(imagen);
  articulo.appendChild(informacion);
  articulo.appendChild(acciones);
  return articulo;
}

function mostrarCarrito() {
  const lista = document.querySelector("#lista-carrito");
  if (!lista) return;

  const carrito = obtenerCarrito();
  const estadoVacio = document.querySelector("#carrito-vacio");
  const contenido = document.querySelector("#carrito-contenido");
  lista.replaceChildren();

  estadoVacio.hidden = carrito.length !== 0;
  contenido.hidden = carrito.length === 0;

  if (carrito.length === 0) return;

  carrito.forEach(function (linea, indice) {
    lista.appendChild(crearLineaCarrito(linea, indice));
  });

  document.querySelector("#total-unidades").textContent = `Productos: ${calcularTotalUnidades(carrito)} unidad(es)`;
  document.querySelector("#total-carrito").textContent = `Total: ${formatearPrecio(calcularTotal(carrito))}`;
}

function vaciarCarrito() {
  if (confirm("¿Deseas vaciar completamente el carrito?")) {
    guardarCarrito([]);
    mostrarCarrito();
  }
}

function iniciarCarrito() {
  if (!document.querySelector("#lista-carrito")) return;
  document.querySelector("#vaciar-carrito").addEventListener("click", vaciarCarrito);
  mostrarCarrito();
}

iniciarCarrito();

import { obtenerProductoPorCodigo } from './productosService.js';

// Misma clave que usaba la versión HTML del proyecto.
const CLAVE_CARRITO = 'carritoMilSabores';

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Devuelve lo guardado: una lista como [{ codigo: 'TC001', cantidad: 2 }].
export function obtenerCarrito() {
  const datos = localStorage.getItem(CLAVE_CARRITO);

  if (!datos) {
    return [];
  }

  try {
    const carrito = JSON.parse(datos);
    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    return [];
  }
}

// Devuelve el carrito con los datos completos de cada producto: [{ producto, cantidad }].
// Si un producto fue eliminado desde el admin, no se incluye.
export function obtenerItemsCarrito() {
  return obtenerCarrito()
    .map((linea) => ({
      producto: obtenerProductoPorCodigo(linea.codigo),
      cantidad: linea.cantidad,
    }))
    .filter((item) => item.producto !== undefined);
}

// Agrega un producto al carrito (si ya está, suma 1 a la cantidad).
// Esta es la función que debe usar el botón "Agregar al carrito".
export function agregarAlCarrito(codigo) {
  const carrito = obtenerCarrito();
  const linea = carrito.find((item) => item.codigo === codigo);

  if (linea) {
    linea.cantidad += 1;
  } else {
    carrito.push({ codigo, cantidad: 1 });
  }

  guardarCarrito(carrito);
}

// Cambia la cantidad de un producto. Use 1 para aumentar y -1 para disminuir (mínimo 1).
export function cambiarCantidad(codigo, cambio) {
  const carrito = obtenerCarrito().map((linea) => {
    if (linea.codigo !== codigo) {
      return linea;
    }
    return { ...linea, cantidad: Math.max(1, linea.cantidad + cambio) };
  });

  guardarCarrito(carrito);
}

export function eliminarDelCarrito(codigo) {
  guardarCarrito(obtenerCarrito().filter((linea) => linea.codigo !== codigo));
}

export function vaciarCarrito() {
  guardarCarrito([]);
}

export function calcularUnidades(items) {
  return items.reduce((suma, item) => suma + item.cantidad, 0);
}

export function calcularTotal(items) {
  return items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);
}

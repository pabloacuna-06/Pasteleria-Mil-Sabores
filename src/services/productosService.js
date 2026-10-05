import { productos as productosIniciales } from '../data/productos.js';

// Clave donde se guardan los productos en el navegador (simulación, no hay base de datos real).
const CLAVE_PRODUCTOS = 'productosMilSabores';

function guardarProductos(lista) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

// Leer todos los productos.
// La primera vez se copian los productos de src/data/productos.js.
export function obtenerProductos() {
  const datos = localStorage.getItem(CLAVE_PRODUCTOS);

  if (datos) {
    try {
      return JSON.parse(datos);
    } catch (error) {
      // Si los datos estaban dañados, se parte de nuevo con los productos iniciales.
    }
  }

  guardarProductos(productosIniciales);
  return productosIniciales;
}

// Leer un producto por su código.
export function obtenerProductoPorCodigo(codigo) {
  return obtenerProductos().find((producto) => producto.codigo === codigo);
}

// Crear un producto. Devuelve false si el código ya existe.
export function crearProducto(producto) {
  const lista = obtenerProductos();
  const existe = lista.some((item) => item.codigo === producto.codigo);

  if (existe) {
    return false;
  }

  guardarProductos([...lista, producto]);
  return true;
}

// Editar un producto. Devuelve false si no existe.
export function editarProducto(codigo, datosNuevos) {
  const lista = obtenerProductos();
  const existe = lista.some((item) => item.codigo === codigo);

  if (!existe) {
    return false;
  }

  const nuevaLista = lista.map((item) => (
    item.codigo === codigo ? { ...item, ...datosNuevos, codigo } : item
  ));
  guardarProductos(nuevaLista);
  return true;
}

// Eliminar un producto por su código.
export function eliminarProducto(codigo) {
  const lista = obtenerProductos();
  guardarProductos(lista.filter((item) => item.codigo !== codigo));
}

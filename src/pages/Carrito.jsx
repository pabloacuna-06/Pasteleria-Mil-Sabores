import { useState } from 'react';
import { Link } from 'react-router-dom';
import CarritoItem from '../components/CarritoItem.jsx';
import ResumenCompra from '../components/ResumenCompra.jsx';
import {
  obtenerItemsCarrito,
  cambiarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
  calcularUnidades,
  calcularTotal,
} from '../services/carritoService.js';

export default function Carrito() {
  const [items, setItems] = useState(obtenerItemsCarrito);

  function cambiar(codigo, cambio) {
    cambiarCantidad(codigo, cambio);
    setItems(obtenerItemsCarrito());
  }

  function eliminar(codigo) {
    eliminarDelCarrito(codigo);
    setItems(obtenerItemsCarrito());
  }

  function vaciar() {
    vaciarCarrito();
    setItems([]);
  }

  if (items.length === 0) {
    return (
      <section>
        <h1 className="mb-3">Carrito de compras</h1>
        <p>Tu carrito está vacío.</p>
        <Link className="btn btn-primary" to="/productos">Explorar productos</Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-3">Carrito de compras</h1>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {items.map((item) => (
            <CarritoItem
              key={item.producto.codigo}
              producto={item.producto}
              cantidad={item.cantidad}
              alAumentar={() => cambiar(item.producto.codigo, 1)}
              alDisminuir={() => cambiar(item.producto.codigo, -1)}
              alEliminar={() => eliminar(item.producto.codigo)}
            />
          ))}
        </div>
        <div className="col-12 col-lg-4">
          <ResumenCompra unidades={calcularUnidades(items)} total={calcularTotal(items)}>
            <div className="d-grid gap-2">
              <Link className="btn btn-primary" to="/checkout">Ir al checkout</Link>
              <button className="btn btn-outline-danger" type="button" onClick={vaciar}>Vaciar carrito</button>
            </div>
          </ResumenCompra>
        </div>
      </div>
    </section>
  );
}

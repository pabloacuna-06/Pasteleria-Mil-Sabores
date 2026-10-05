import { Link, useNavigate } from 'react-router-dom';
import ResumenCompra from '../components/ResumenCompra.jsx';
import {
  obtenerItemsCarrito,
  vaciarCarrito,
  calcularUnidades,
  calcularTotal,
} from '../services/carritoService.js';

export default function Checkout() {
  const navigate = useNavigate();
  const items = obtenerItemsCarrito();

  function manejarCompra(evento) {
    evento.preventDefault();
    vaciarCarrito();
    navigate('/compra-exitosa');
  }

  if (items.length === 0) {
    return (
      <section>
        <h1 className="mb-3">Checkout</h1>
        <p>No puedes finalizar una compra porque tu carrito está vacío.</p>
        <Link className="btn btn-primary" to="/productos">Explorar productos</Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-3">Checkout</h1>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <form onSubmit={manejarCompra}>
            <div className="mb-3">
              <label className="form-label" htmlFor="nombre-checkout">Nombre completo</label>
              <input className="form-control" id="nombre-checkout" name="nombre" type="text" maxLength={50} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="correo-checkout">Correo</label>
              <input className="form-control" id="correo-checkout" name="correo" type="email" maxLength={100} required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="direccion-checkout">Dirección de entrega</label>
              <input className="form-control" id="direccion-checkout" name="direccion" type="text" maxLength={100} required />
            </div>
            <p className="text-muted">La compra es simulada: no se realiza ningún cobro real.</p>
            <button className="btn btn-primary me-2" type="submit">Confirmar compra</button>
            <Link className="btn btn-outline-secondary" to="/carrito">Volver al carrito</Link>
          </form>
        </div>
        <div className="col-12 col-lg-4">
          <ResumenCompra unidades={calcularUnidades(items)} total={calcularTotal(items)} />
        </div>
      </div>
    </section>
  );
}

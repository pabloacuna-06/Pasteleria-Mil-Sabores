import { Link } from 'react-router-dom';

export default function CompraError() {
  return (
    <section>
      <div className="alert alert-danger">
        <h1 className="mb-3">No se pudo completar la compra</h1>
        <p>Ocurrió un problema en la compra simulada.</p>
        <p className="mb-0">Puedes volver al carrito e intentarlo nuevamente.</p>
      </div>
      <Link className="btn btn-primary" to="/carrito">Volver al carrito</Link>
    </section>
  );
}

import { Link } from 'react-router-dom';

export default function CompraExitosa() {
  return (
    <section>
      <div className="alert alert-success">
        <h1 className="mb-3">Compra realizada</h1>
        <p>Tu compra simulada fue realizada correctamente.</p>
        <p className="mb-0">No se realizó ningún cobro real.</p>
      </div>
      <Link className="btn btn-primary" to="/productos">Seguir comprando</Link>
    </section>
  );
}

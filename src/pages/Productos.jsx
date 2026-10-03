import { Link } from 'react-router-dom';

export default function Productos() {
  return (
    <section className="text-center">
      <h1 className="mb-3">Productos</h1>
      <p className="lead">El catálogo se agregará en la siguiente etapa</p>
      <Link className="btn btn-primary" to="/">Volver al inicio</Link>
    </section>
  );
}

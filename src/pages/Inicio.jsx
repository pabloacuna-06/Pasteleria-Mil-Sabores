import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <section className="text-center">
      <h1 className="mb-3">Pastelería Mil Sabores</h1>
      <p className="lead">Bienvenido a nuestra tienda</p>
      <Link className="btn btn-primary" to="/productos">Ver productos</Link>
    </section>
  );
}

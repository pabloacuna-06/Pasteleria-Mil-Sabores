import { Link } from 'react-router-dom';
import { productos } from '../data/productos.js';
import ProductoCard from '../components/ProductoCard.jsx';

export default function Productos() {
  return (
    <section>
      <h1 className="mb-3">Productos</h1>
      <div className="row g-4 mb-4">
        {productos.map((producto) => (
          <div className="col-12 col-md-6 col-lg-3" key={producto.codigo}>
            <ProductoCard producto={producto} />
          </div>
        ))}
      </div>
      <Link className="btn btn-primary" to="/">Volver al inicio</Link>
    </section>
  );
}

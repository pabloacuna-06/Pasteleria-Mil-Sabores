import { Link } from 'react-router-dom';
import { agregarAlCarrito } from '../services/carritoService.js';

export default function ProductoCard({ producto }) {
  return (
    <article className="card h-100">
      <img className="card-img-top producto-imagen" src={producto.imagen} alt={producto.nombre} />
      <div className="card-body">
        <p className="text-muted mb-2">{producto.codigo}</p>
        <h2 className="card-title h5">{producto.nombre}</h2>
        <p className="card-text">{producto.categoria}</p>
        <p className="fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
        {producto.oferta && <span className="badge text-bg-success mb-3">Oferta</span>}
        <div>
          <Link className="btn btn-primary" to={`/productos/${producto.codigo}`}>
            Ver detalle
          </Link>
          <button className="btn btn-primary" type="button" onClick={() => {
            agregarAlCarrito(producto.codigo);
            window.alert('Producto agregado al carrito.');
          }}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

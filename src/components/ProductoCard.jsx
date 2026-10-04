import { Link } from 'react-router-dom';

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
        </div>
      </div>
    </article>
  );
}

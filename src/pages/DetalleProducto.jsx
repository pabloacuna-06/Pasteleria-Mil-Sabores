import { useParams, Link } from 'react-router-dom';
import { productos } from '../data/productos.js';

export default function DetalleProducto() {
  const { codigo } = useParams();
  const producto = productos.find((producto) => producto.codigo === codigo);

  if (!producto) {
    return (
      <section>
        <h1 className="mb-3">Producto no encontrado</h1>
        <Link className="btn btn-primary" to="/productos">Volver a productos</Link>
      </section>
    );
  }

  return (
    <section>
      <article className="card mb-4">
        <img className="card-img-top producto-imagen" src={producto.imagen} alt={producto.nombre} />
        <div className="card-body">
          <p className="text-muted mb-2">{producto.codigo}</p>
          <h1 className="card-title">{producto.nombre}</h1>
          <p className="card-text">{producto.categoria}</p>
          <p className="card-text">{producto.descripcion}</p>
          <p className="fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
        </div>
      </article>
      <Link className="btn btn-primary" to="/productos">Volver a productos</Link>
    </section>
  );
}

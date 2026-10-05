export default function CarritoItem({ producto, cantidad, alAumentar, alDisminuir, alEliminar }) {
  const subtotal = producto.precio * cantidad;

  return (
    <article className="card mb-3">
      <div className="card-body d-flex flex-wrap align-items-center gap-3">
        {producto.imagen && (
          <img style={{ width: 100, height: 100, objectFit: "cover" }} src={producto.imagen} alt={producto.nombre} />
        )}
        <div className="flex-grow-1">
          <p className="text-muted mb-1">{producto.codigo}</p>
          <h2 className="h5">{producto.nombre}</h2>
          <p className="mb-2">{`Precio: $${producto.precio.toLocaleString('es-CL')}`}</p>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary btn-sm" type="button" aria-label="Disminuir cantidad" onClick={alDisminuir}>-</button>
            <span>{cantidad}</span>
            <button className="btn btn-outline-secondary btn-sm" type="button" aria-label="Aumentar cantidad" onClick={alAumentar}>+</button>
          </div>
        </div>
        <div className="text-end">
          <p className="fw-bold">{`Subtotal: $${subtotal.toLocaleString('es-CL')}`}</p>
          <button className="btn btn-danger btn-sm" type="button" onClick={alEliminar}>Eliminar</button>
        </div>
      </div>
    </article>
  );
}

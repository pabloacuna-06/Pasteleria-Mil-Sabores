import { Link, useLocation } from 'react-router-dom';

export default function CompraExitosa() {
  const { state } = useLocation();
  const resumen = state?.resumen;

  return (
    <section>
      <div className="alert alert-success">
        <h1 className="mb-3">Compra realizada</h1>
        <p>Compra simulada realizada correctamente.</p>
        <p className="mb-0">No se realizó ningún cobro real.</p>
      </div>
      {resumen && (
        <div className="card mb-3">
          <div className="card-body">
            <h2 className="h5">Resumen de la compra</h2>
            <p>Cliente: {resumen.nombre}</p>
            <p>Correo: {resumen.correo}</p>
            <p>Dirección: {resumen.direccion}</p>
            <p>Forma de entrega: {resumen.formaEntrega}</p>
            <ul className="list-group mb-3">
              {resumen.productos.map((producto) => (
                <li className="list-group-item" key={producto.codigo}>
                  <p>{producto.nombre}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <p className="mb-0">Subtotal: ${producto.subtotal.toLocaleString('es-CL')}</p>
                </li>
              ))}
            </ul>
            <p className="fw-bold mb-0">Total final: ${resumen.total.toLocaleString('es-CL')}</p>
          </div>
        </div>
      )}
      <Link className="btn btn-primary" to="/productos">Seguir comprando</Link>
    </section>
  );
}

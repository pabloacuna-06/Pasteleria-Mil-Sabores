export default function ResumenCompra({ unidades, total, children }) {
  return (
    <aside className="card">
      <div className="card-body">
        <h2 className="h5">Resumen de compra</h2>
        <p>{`Productos: ${unidades} unidad(es)`}</p>
        <p className="fw-bold fs-5">{`Total: $${total.toLocaleString('es-CL')}`}</p>
        {children}
      </div>
    </aside>
  );
}

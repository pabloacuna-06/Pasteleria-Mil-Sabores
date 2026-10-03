export default function FiltroProductos({ busqueda, categoria, categorias, alCambiarBusqueda, alCambiarCategoria }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-md-6">
        <label className="form-label" htmlFor="buscar-producto">Buscar producto</label>
        <input
          id="buscar-producto"
          type="text"
          className="form-control"
          value={busqueda}
          onChange={(evento) => alCambiarBusqueda(evento.target.value)}
        />
      </div>
      <div className="col-12 col-md-6">
        <label className="form-label" htmlFor="categoria-producto">Categoría</label>
        <select
          id="categoria-producto"
          className="form-select"
          value={categoria}
          onChange={(evento) => alCambiarCategoria(evento.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((nombre) => (
            <option key={nombre} value={nombre}>{nombre}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { categorias } from '../data/productos.js';

const productoVacio = {
  codigo: '',
  nombre: '',
  categoria: '',
  precio: '',
  descripcion: '',
  imagen: '',
  oferta: false,
};

export default function FormularioProducto({ producto, alGuardar }) {
  const editando = Boolean(producto);
  const [datos, setDatos] = useState(producto || productoVacio);

  function cambiarDato(evento) {
    const { name, value, type, checked } = evento.target;
    setDatos({ ...datos, [name]: type === 'checkbox' ? checked : value });
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    alGuardar({ ...datos, precio: Number(datos.precio) });
  }

  return (
    <form onSubmit={manejarEnvio}>
      <div className="mb-3">
        <label className="form-label" htmlFor="codigo-producto">Código</label>
        <input className="form-control" id="codigo-producto" name="codigo" type="text" maxLength={10} value={datos.codigo} onChange={cambiarDato} disabled={editando} required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="nombre-producto">Nombre</label>
        <input className="form-control" id="nombre-producto" name="nombre" type="text" maxLength={100} value={datos.nombre} onChange={cambiarDato} required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="categoria-producto">Categoría</label>
        <select className="form-select" id="categoria-producto" name="categoria" value={datos.categoria} onChange={cambiarDato} required>
          <option value="">Seleccione</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="precio-producto">Precio</label>
        <input className="form-control" id="precio-producto" name="precio" type="number" min="0" value={datos.precio} onChange={cambiarDato} required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="descripcion-producto">Descripción</label>
        <textarea className="form-control" id="descripcion-producto" name="descripcion" maxLength={500} rows={3} value={datos.descripcion} onChange={cambiarDato} required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="imagen-producto">URL de imagen</label>
        <input className="form-control" id="imagen-producto" name="imagen" type="url" value={datos.imagen} onChange={cambiarDato} />
      </div>
      <div className="form-check mb-3">
        <input className="form-check-input" id="oferta-producto" name="oferta" type="checkbox" checked={datos.oferta} onChange={cambiarDato} />
        <label className="form-check-label" htmlFor="oferta-producto">Producto en oferta</label>
      </div>
      <button className="btn btn-primary" type="submit">Guardar producto</button>
    </form>
  );
}

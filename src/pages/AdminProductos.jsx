import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos, eliminarProducto } from '../services/productosService.js';

export default function AdminProductos() {
  const [productos, setProductos] = useState(obtenerProductos);

  function eliminar(producto) {
    if (window.confirm(`¿Deseas eliminar "${producto.nombre}"?`)) {
      eliminarProducto(producto.codigo);
      setProductos(obtenerProductos());
    }
  }

  return (
    <section>
      <h1 className="mb-3">Administración de productos</h1>
      <Link className="btn btn-primary mb-3" to="/admin/productos/nuevo">Nuevo producto</Link>
      {productos.length === 0 && <p>No hay productos registrados.</p>}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precio.toLocaleString('es-CL')}</td>
                <td>
                  <Link className="btn btn-outline-primary btn-sm me-2" to={`/admin/productos/editar/${producto.codigo}`}>Editar</Link>
                  <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => eliminar(producto)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormularioProducto from '../components/FormularioProducto.jsx';
import {
  obtenerProductoPorCodigo,
  crearProducto,
  editarProducto,
} from '../services/productosService.js';

export default function ProductoFormulario() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const producto = codigo ? obtenerProductoPorCodigo(codigo) : undefined;

  if (codigo && !producto) {
    return (
      <section>
        <h1 className="mb-3">Producto no encontrado</h1>
        <Link className="btn btn-primary" to="/admin/productos">Volver a la administración</Link>
      </section>
    );
  }

  function guardar(datos) {
    if (codigo) {
      editarProducto(codigo, datos);
    } else if (!crearProducto(datos)) {
      setError('Ya existe un producto con ese código.');
      return;
    }
    navigate('/admin/productos');
  }

  return (
    <section>
      <h1 className="mb-3">{codigo ? 'Editar producto' : 'Nuevo producto'}</h1>
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      <FormularioProducto producto={producto} alGuardar={guardar} />
      <Link className="btn btn-outline-secondary mt-3" to="/admin/productos">Cancelar</Link>
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categorias } from '../data/productos.js';
import { obtenerProductos } from '../services/productosService.js';
import ProductoCard from '../components/ProductoCard.jsx';
import FiltroProductos from '../components/FiltroProductos.jsx';

export default function Productos() {
  const productos = obtenerProductos();
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  const productosFiltrados = productos.filter((producto) => (
    (producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.codigo.toLowerCase().includes(busqueda.toLowerCase())) &&
    (categoria === '' || producto.categoria === categoria)
  ));

  return (
    <section>
      <h1 className="mb-3">Productos</h1>
      <FiltroProductos
        busqueda={busqueda}
        categoria={categoria}
        categorias={categorias}
        alCambiarBusqueda={setBusqueda}
        alCambiarCategoria={setCategoria}
      />
      {productosFiltrados.length === 0 && <p>No se encontraron productos.</p>}
      <div className="row g-4 mb-4">
        {productosFiltrados.map((producto) => (
          <div className="col-12 col-md-6 col-lg-3" key={producto.codigo}>
            <ProductoCard producto={producto} />
          </div>
        ))}
      </div>
      <Link className="btn btn-primary" to="/">Volver al inicio</Link>
    </section>
  );
}

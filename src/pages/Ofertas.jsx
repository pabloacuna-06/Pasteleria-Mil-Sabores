import { obtenerProductos } from '../services/productosService.js';
import ProductoCard from '../components/ProductoCard.jsx';

export default function Ofertas() {
  const productos = obtenerProductos();
  const ofertas = productos.filter((producto) => producto.oferta);

  return (
    <section>
      <h1 className="mb-3">Ofertas</h1>
      <div className="row g-4 mb-4">
        {ofertas.map((producto) => (
          <div className="col-12 col-md-6 col-lg-3" key={producto.codigo}>
            <ProductoCard producto={producto} />
          </div>
        ))}
      </div>
    </section>
  );
}

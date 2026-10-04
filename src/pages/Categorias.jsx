import { categorias, productos } from '../data/productos.js';

export default function Categorias() {
  return (
    <section>
      <h1 className="mb-3">Categorías</h1>
      <ul className="list-group">
        {categorias.map((categoria) => (
          <li className="list-group-item" key={categoria}>
            <h2 className="h5">{categoria}</h2>
            <p className="mb-0">
              {productos.filter((producto) => producto.categoria === categoria).length} productos
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

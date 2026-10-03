import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar bg-white py-3" aria-label="Navegación principal">
      <div className="container d-flex flex-wrap gap-3">
        <a className="navbar-brand" href="/">Pastelería Mil Sabores</a>
        <ul className="nav flex-wrap">
          <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
          <li className="nav-item"><a className="nav-link" href="/pages/nosotros.html">Nosotros</a></li>
          <li className="nav-item"><a className="nav-link" href="/pages/blogs.html">Blogs</a></li>
          <li className="nav-item"><a className="nav-link" href="/pages/contacto.html">Contacto</a></li>
          <li className="nav-item"><a className="nav-link" href="/pages/registro.html">Registro</a></li>
          <li className="nav-item"><a className="nav-link" href="/pages/login.html">Iniciar sesión</a></li>
          <li className="nav-item"><a className="nav-link" href="/pages/carrito.html">Carrito</a></li>
        </ul>
      </div>
    </nav>
  );
}

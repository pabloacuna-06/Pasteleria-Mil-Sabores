import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Inicio from './pages/Inicio.jsx';
import Productos from './pages/Productos.jsx';
import Categorias from './pages/Categorias.jsx';
import Ofertas from './pages/Ofertas.jsx';
import DetalleProducto from './pages/DetalleProducto.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

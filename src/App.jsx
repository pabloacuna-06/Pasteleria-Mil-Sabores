import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container py-5 text-center">
        <h1 className="mb-3">Pastelería Mil Sabores</h1>
        <p className="lead">Migración a React iniciada</p>
        <button type="button" className="btn btn-primary">Ver productos</button>
      </main>
      <Footer />
    </>
  );
}

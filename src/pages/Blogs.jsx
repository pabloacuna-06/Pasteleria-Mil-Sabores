import { Link } from 'react-router-dom';

const blogs = [
  {
    id: '1',
    titulo: 'Técnicas básicas para comenzar',
    resumen: 'Conoce prácticas simples que ayudan a obtener mejores resultados al hornear.',
  },
  {
    id: '2',
    titulo: 'Cómo conservar tortas y pasteles',
    resumen: 'Aprende a proteger su frescura, textura y sabor por más tiempo.',
  },
];

export default function Blogs() {
  return (
    <section>
      <h1 className="mb-3">Blog de repostería</h1>
      <p>Consejos sencillos para disfrutar y cuidar tus preparaciones.</p>
      <div className="row g-4" aria-label="Publicaciones">
        {blogs.map((blog) => (
          <div className="col-12 col-md-6" key={blog.id}>
            <article className="card h-100">
              <div className="card-body">
                <h2 className="card-title h5">{blog.titulo}</h2>
                <p className="card-text">{blog.resumen}</p>
                <Link className="btn btn-primary" to={`/blogs/${blog.id}`}>Leer publicación</Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

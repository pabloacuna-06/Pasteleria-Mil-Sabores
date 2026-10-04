import { useParams, Link } from 'react-router-dom';

const blogs = [
  {
    id: '1',
    titulo: 'Técnicas básicas para comenzar',
    contenido: (
      <>
        <p className="text-muted">Consejos de repostería</p>
        <p>La repostería combina precisión, paciencia y práctica. Antes de comenzar, lee la receta completa y deja todos los ingredientes medidos.</p>
        <h2>Respeta las cantidades</h2>
        <p>Usa medidas claras y evita cambiar proporciones. En masas y bizcochos, una pequeña diferencia puede modificar la textura final.</p>
        <h2>Cuida la temperatura</h2>
        <p>Precalienta el horno y procura que los ingredientes estén a la temperatura indicada. Evita abrir el horno durante los primeros minutos de cocción.</p>
        <h2>Mezcla con atención</h2>
        <p>Cuando incorpores harina, mezcla solo hasta integrar. Así evitas desarrollar demasiado gluten y consigues preparaciones más suaves.</p>
      </>
    ),
  },
  {
    id: '2',
    titulo: 'Cómo conservar tortas y pasteles',
    contenido: (
      <>
        <p className="text-muted">Consejos de conservación</p>
        <p>Guardar correctamente una preparación ayuda a mantener su frescura y sabor. Protégela siempre en un recipiente cerrado para evitar que absorba olores o pierda humedad.</p>
        <h2>¿Refrigerar o mantener a temperatura ambiente?</h2>
        <p>Las preparaciones con crema, fruta fresca o rellenos lácteos deben refrigerarse. Los bizcochos sin relleno pueden permanecer en un lugar fresco y seco durante un tiempo breve.</p>
        <h2>Antes de servir</h2>
        <p>Retira la torta refrigerada algunos minutos antes de servir para que recupere una textura agradable. Evita dejarla expuesta al sol o cerca de fuentes de calor.</p>
        <div className="ratio ratio-16x9 mb-4">
          <iframe src="https://www.youtube.com/embed/n1IYbNtJ4sU" title="Video sobre cómo conservar un trozo de torta por más tiempo" loading="lazy" allowFullScreen />
        </div>
      </>
    ),
  },
];

export default function BlogDetalle() {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <section>
        <h1 className="mb-3">Blog no encontrado</h1>
        <Link className="btn btn-primary" to="/blogs">Volver a Blogs</Link>
      </section>
    );
  }

  return (
    <section>
      <article>
        <h1 className="mb-3">{blog.titulo}</h1>
        {blog.contenido}
      </article>
      <Link className="btn btn-primary" to="/blogs">Volver a Blogs</Link>
    </section>
  );
}

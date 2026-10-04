import { useState } from 'react';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviado(true);
    evento.target.reset();
  }

  return (
    <section>
      <h1 className="mb-3">Contacto</h1>
      <p>¿Tienes una consulta? Escríbenos y cuéntanos cómo podemos ayudarte.</p>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label" htmlFor="nombre-contacto">Nombre</label>
          <input className="form-control" id="nombre-contacto" name="nombre" type="text" maxLength={100} autoComplete="name" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="correo-contacto">Correo (opcional)</label>
          <input className="form-control" id="correo-contacto" name="correo" type="email" maxLength={100} autoComplete="email" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="comentario">Comentario</label>
          <textarea className="form-control" id="comentario" name="comentario" rows={6} maxLength={500} required />
        </div>
        <button className="btn btn-primary" type="submit">Enviar</button>
      </form>
      {enviado && <p className="alert alert-success mt-3" role="status">Tu mensaje fue enviado correctamente.</p>}
    </section>
  );
}

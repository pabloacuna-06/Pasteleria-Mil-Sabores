import { useState } from 'react';

export default function Registro() {
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  function manejarRegistro(evento) {
    evento.preventDefault();
    const datos = new FormData(evento.target);
    const contrasena = datos.get('contrasena');
    const confirmacion = datos.get('confirmacion');

    if (contrasena !== confirmacion) {
      setMensaje('');
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    setMensaje('Tu cuenta fue registrada correctamente.');
    evento.target.reset();
  }

  return (
    <section>
      <h1 className="mb-3">Registro</h1>
      <form onSubmit={manejarRegistro}>
        <div className="mb-3">
          <label className="form-label" htmlFor="nombre-registro">Nombre</label>
          <input className="form-control" id="nombre-registro" name="nombre" type="text" maxLength={50} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="correo-registro">Correo</label>
          <input className="form-control" id="correo-registro" name="correo" type="email" maxLength={100} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="contrasena-registro">Contraseña</label>
          <input className="form-control" id="contrasena-registro" name="contrasena" type="password" minLength={4} maxLength={10} required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="confirmacion-registro">Confirmar contraseña</label>
          <input className="form-control" id="confirmacion-registro" name="confirmacion" type="password" minLength={4} maxLength={10} required />
        </div>
        <button className="btn btn-primary" type="submit">Registrarme</button>
      </form>
      {error && <p className="alert alert-danger mt-3" role="alert">{error}</p>}
      {mensaje && <p className="alert alert-success mt-3" role="status">{mensaje}</p>}
    </section>
  );
}

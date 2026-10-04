import { useState } from 'react';

export default function Login() {
  const [mensaje, setMensaje] = useState('');

  function manejarLogin(evento) {
    evento.preventDefault();
    setMensaje('Inicio de sesión simulado correctamente.');
    evento.target.reset();
  }

  return (
    <section>
      <h1 className="mb-3">Iniciar sesión</h1>
      <p>Acceso simulado para esta versión académica.</p>
      <form onSubmit={manejarLogin}>
        <div className="mb-3">
          <label className="form-label" htmlFor="correo-login">Correo</label>
          <input className="form-control" id="correo-login" name="correo" type="email" maxLength={100} autoComplete="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="contrasena-login">Contraseña</label>
          <input className="form-control" id="contrasena-login" name="contrasena" type="password" minLength={4} maxLength={10} autoComplete="current-password" required />
        </div>
        <button className="btn btn-primary" type="submit">Iniciar sesión</button>
      </form>
      {mensaje && <p className="alert alert-success mt-3" role="status">{mensaje}</p>}
    </section>
  );
}

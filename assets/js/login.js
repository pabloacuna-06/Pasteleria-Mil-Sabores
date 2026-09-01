const CLAVE_SESION = "sesionMilSabores";

function obtenerSesion() {
  const datos = localStorage.getItem(CLAVE_SESION);
  if (!datos) return null;
  try {
    const sesion = JSON.parse(datos);
    const sesionValida = sesion && typeof sesion === "object" &&
      typeof sesion.run === "string" && typeof sesion.nombre === "string" &&
      typeof sesion.correo === "string" && typeof sesion.perfil === "string";
    return sesionValida ? sesion : null;
  } catch (error) {
    return null;
  }
}

function validarCampoLogin(campo) {
  let mensaje = "";
  if (campo.id === "correo-login") mensaje = validarCorreoPermitido(campo.value, true);
  if (campo.id === "contrasena-login") {
    if (!campo.value) mensaje = "La contraseña es obligatoria.";
    else if (campo.value.length < 4 || campo.value.length > 10) mensaje = "La contraseña debe tener entre 4 y 10 caracteres.";
  }
  return mostrarEstadoCampo(campo, mensaje);
}

function mostrarSesion() {
  const sesion = obtenerSesion();
  const panel = document.querySelector("#saludo-sesion");
  const texto = document.querySelector("#texto-sesion");
  panel.hidden = !sesion;
  texto.textContent = sesion ? `Hola, ${sesion.nombre}. Tu sesión como ${sesion.perfil} está activa.` : "";
}

function iniciarSesion(evento) {
  evento.preventDefault();
  const correo = document.querySelector("#correo-login");
  const contrasena = document.querySelector("#contrasena-login");
  const mensaje = document.querySelector("#mensaje-login");
  mensaje.textContent = "";
  mensaje.className = "form-message";

  const correoValido = validarCampoLogin(correo);
  const contrasenaValida = validarCampoLogin(contrasena);
  if (!correoValido || !contrasenaValida) {
    mensaje.textContent = "Revisa los datos antes de iniciar sesión.";
    mensaje.classList.add("error-general");
    return;
  }

  const correoNormalizado = correo.value.trim().toLowerCase();
  const usuario = obtenerUsuarios().find(function (elemento) {
    return elemento && typeof elemento.correo === "string" &&
      elemento.correo.toLowerCase() === correoNormalizado;
  });

  if (!usuario) {
    mostrarEstadoCampo(correo, "No existe un usuario registrado con este correo.");
    mensaje.textContent = "No fue posible iniciar sesión.";
    mensaje.classList.add("error-general");
    return;
  }
  if (usuario.contrasena !== contrasena.value) {
    mostrarEstadoCampo(contrasena, "La contraseña no coincide con la cuenta registrada.");
    mensaje.textContent = "No fue posible iniciar sesión.";
    mensaje.classList.add("error-general");
    return;
  }

  const sesion = {
    run: usuario.run,
    nombre: usuario.nombre,
    correo: usuario.correo,
    perfil: usuario.perfil
  };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  mensaje.textContent = "Acceso correcto.";
  mensaje.classList.add("success-message");
  evento.currentTarget.reset();
  evento.currentTarget.querySelectorAll("input").forEach(limpiarEstadoCampo);
  mostrarSesion();
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  document.querySelector("#mensaje-login").textContent = "La sesión fue cerrada correctamente.";
  document.querySelector("#mensaje-login").className = "form-message success-message";
  mostrarSesion();
}

function iniciarLogin() {
  const formulario = document.querySelector("#formulario-login");
  if (!formulario) return;

  formulario.querySelectorAll("input").forEach(function (campo) {
    campo.addEventListener("input", function () { validarCampoLogin(campo); });
  });
  formulario.addEventListener("submit", iniciarSesion);
  document.querySelector("#cerrar-sesion").addEventListener("click", cerrarSesion);
  mostrarSesion();
}

iniciarLogin();

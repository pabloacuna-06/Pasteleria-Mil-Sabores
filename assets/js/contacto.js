function validarCampoContacto(campo) {
  let mensaje = "";
  const texto = campo.value.trim();

  if (campo.id === "nombre-contacto") {
    if (!texto) mensaje = "El nombre es obligatorio.";
    else if (texto.length > 100) mensaje = "El nombre no puede superar los 100 caracteres.";
  }
  if (campo.id === "correo-contacto") mensaje = validarCorreoPermitido(campo.value, false);
  if (campo.id === "comentario") {
    if (!texto) mensaje = "El comentario es obligatorio.";
    else if (texto.length > 500) mensaje = "El comentario no puede superar los 500 caracteres.";
  }
  return mostrarEstadoCampo(campo, mensaje);
}

function enviarContacto(evento) {
  evento.preventDefault();
  const campos = [
    document.querySelector("#nombre-contacto"),
    document.querySelector("#correo-contacto"),
    document.querySelector("#comentario")
  ];
  const mensaje = document.querySelector("#mensaje-contacto");
  let formularioValido = true;

  campos.forEach(function (campo) {
    if (!validarCampoContacto(campo)) formularioValido = false;
  });

  if (!formularioValido) {
    mensaje.textContent = "Revisa los campos marcados antes de enviar el formulario.";
    mensaje.className = "form-message error-general";
    return;
  }

  mensaje.textContent = "El formulario fue enviado correctamente.";
  mensaje.className = "form-message success-message";
  evento.currentTarget.reset();
  campos.forEach(limpiarEstadoCampo);
}

function iniciarContacto() {
  const formulario = document.querySelector("#formulario-contacto");
  if (!formulario) return;
  formulario.querySelectorAll("input, textarea").forEach(function (campo) {
    campo.addEventListener("input", function () { validarCampoContacto(campo); });
  });
  formulario.addEventListener("submit", enviarContacto);
}

iniciarContacto();

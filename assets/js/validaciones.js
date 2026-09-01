const CLAVE_USUARIOS = "usuariosMilSabores";
const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

function mostrarEstadoCampo(campo, mensaje) {
  const elementoError = document.querySelector(`#error-${campo.id}`);
  if (elementoError) elementoError.textContent = mensaje;
  campo.classList.toggle("campo-invalido", Boolean(mensaje));
  campo.classList.toggle("campo-valido", !mensaje && Boolean(campo.value));
  campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
  return !mensaje;
}

function limpiarEstadoCampo(campo) {
  const elementoError = document.querySelector(`#error-${campo.id}`);
  if (elementoError) elementoError.textContent = "";
  campo.classList.remove("campo-invalido", "campo-valido");
  campo.setAttribute("aria-invalid", "false");
}

function validarCorreoPermitido(valor, requerido) {
  const correo = valor.trim().toLowerCase();
  if (!correo) return requerido ? "El correo es obligatorio." : "";
  if (correo.length > 100) return "El correo no puede superar los 100 caracteres.";

  const partes = correo.split("@");
  if (partes.length !== 2 || !partes[0] || !partes[1] || correo.includes(" ")) {
    return "Ingresa un correo válido.";
  }
  if (!DOMINIOS_PERMITIDOS.includes(partes[1])) {
    return "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }
  return "";
}

function obtenerUsuarios() {
  const datos = localStorage.getItem(CLAVE_USUARIOS);
  if (!datos) return [];

  try {
    const usuarios = JSON.parse(datos);
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (error) {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

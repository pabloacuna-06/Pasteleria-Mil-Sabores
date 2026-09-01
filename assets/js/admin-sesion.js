const CLAVE_SESION_ADMIN = "sesionMilSabores";
const CLAVE_USUARIOS_ADMIN = "usuariosMilSabores";

function obtenerUsuariosAdmin() {
  try {
    const usuarios = JSON.parse(localStorage.getItem(CLAVE_USUARIOS_ADMIN) || "[]");
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (error) {
    return [];
  }
}

function guardarUsuariosAdmin(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS_ADMIN, JSON.stringify(usuarios));
}

function asegurarUsuariosDemostracion() {
  const usuarios = obtenerUsuariosAdmin();
  const demostracion = [
    { run: "123456785", nombre: "Administradora", apellidos: "Mil Sabores", correo: "admin@duoc.cl", fechaNacimiento: "", region: "Metropolitana de Santiago", comuna: "Santiago", direccion: "Dirección demostrativa", contrasena: "admin1", perfil: "Administrador" },
    { run: "111111111", nombre: "Vendedor", apellidos: "Mil Sabores", correo: "vendedor@duoc.cl", fechaNacimiento: "", region: "Metropolitana de Santiago", comuna: "Santiago", direccion: "Dirección demostrativa", contrasena: "vend1", perfil: "Vendedor" }
  ];
  demostracion.forEach(function (cuenta) {
    if (!usuarios.find(function (usuario) { return usuario && usuario.run === cuenta.run; })) usuarios.push(cuenta);
  });
  guardarUsuariosAdmin(usuarios);
}

function obtenerSesionAdmin() {
  try {
    const sesion = JSON.parse(localStorage.getItem(CLAVE_SESION_ADMIN) || "null");
    return sesion && typeof sesion === "object" ? sesion : null;
  } catch (error) {
    return null;
  }
}

function cerrarSesionAdmin() {
  localStorage.removeItem(CLAVE_SESION_ADMIN);
  const esSubcarpeta = window.location.pathname.includes("/admin/productos/") || window.location.pathname.includes("/admin/usuarios/");
  window.location.href = esSubcarpeta ? "../../pages/login.html" : "../pages/login.html";
}

function protegerAdministracion(opcion) {
  const sesion = obtenerSesionAdmin();
  const rutaLogin = opcion && opcion.profundidad === 2 ? "../../pages/login.html" : "../pages/login.html";
  if (!sesion) {
    window.location.href = `${rutaLogin}?mensaje=Inicia%20sesión%20para%20acceder%20a%20la%20administración`;
    return null;
  }
  const esAdministrador = sesion.perfil === "Administrador";
  const esVendedor = sesion.perfil === "Vendedor";
  if (!esAdministrador && !(opcion && opcion.permiteVendedor && esVendedor)) {
    window.location.href = `${rutaLogin}?mensaje=No%20tienes%20permiso%20para%20esta%20sección`;
    return null;
  }
  document.querySelectorAll("[data-solo-admin]").forEach(function (elemento) { elemento.hidden = !esAdministrador; });
  const nombre = document.querySelector("#nombre-sesion-admin");
  const perfil = document.querySelector("#perfil-sesion-admin");
  if (nombre) nombre.textContent = sesion.nombre;
  if (perfil) perfil.textContent = sesion.perfil;
  const boton = document.querySelector("#cerrar-sesion-admin");
  if (boton) boton.addEventListener("click", cerrarSesionAdmin);
  return sesion;
}

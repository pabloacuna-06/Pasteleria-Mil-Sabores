function crearCeldaUsuario(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

function listarUsuariosAdmin() {
  const tabla = document.querySelector("#lista-usuarios-admin");
  if (!tabla) return;
  if (!protegerAdministracion({ profundidad: 2, permiteVendedor: false })) return;
  asegurarUsuariosDemostracion();
  tabla.replaceChildren();
  const usuarios = obtenerUsuariosAdmin();
  if (usuarios.length === 0) {
    const fila = document.createElement("tr");
    const celda = crearCeldaUsuario("No hay usuarios registrados.");
    celda.colSpan = 7;
    fila.appendChild(celda);
    tabla.appendChild(fila);
    return;
  }
  usuarios.forEach(function (usuario) {
    const fila = document.createElement("tr");
    [usuario.run, `${usuario.nombre} ${usuario.apellidos}`, usuario.correo, usuario.region, usuario.comuna, usuario.perfil].forEach(function (texto) { fila.appendChild(crearCeldaUsuario(texto || "")); });
    const acciones = document.createElement("td");
    const detalle = document.createElement("a"); detalle.href = `detalle.html?run=${encodeURIComponent(usuario.run)}`; detalle.textContent = "Ver detalle"; detalle.className = "text-link";
    const editar = document.createElement("a"); editar.href = `formulario.html?run=${encodeURIComponent(usuario.run)}`; editar.textContent = "Editar"; editar.className = "text-link";
    acciones.append(detalle, document.createTextNode(" · "), editar); fila.appendChild(acciones); tabla.appendChild(fila);
  });
}

function mostrarDetalleUsuarioAdmin() {
  const contenedor = document.querySelector("#detalle-usuario-admin");
  if (!contenedor) return;
  if (!protegerAdministracion({ profundidad: 2, permiteVendedor: false })) return;
  const usuario = obtenerUsuariosAdmin().find(function (item) { return item.run === new URLSearchParams(window.location.search).get("run"); });
  if (!usuario) { contenedor.textContent = "Usuario no encontrado."; return; }
  contenedor.replaceChildren();
  [["RUN", usuario.run], ["Nombre", `${usuario.nombre} ${usuario.apellidos}`], ["Correo", usuario.correo], ["Fecha de nacimiento", usuario.fechaNacimiento || "No informada"], ["Región", usuario.region], ["Comuna", usuario.comuna], ["Dirección", usuario.direccion], ["Perfil", usuario.perfil]].forEach(function (dato) { contenedor.appendChild(crearElementoTexto("p", `${dato[0]}: ${dato[1]}`)); });
}

function validarUsuarioAdmin(campo) {
  let mensaje = ""; const valor = campo.value.trim();
  if (campo.id === "usuario-run") mensaje = mensajeRun(valor);
  if (campo.id === "usuario-nombre") mensaje = mensajeTextoRequerido(valor, "El nombre", 50);
  if (campo.id === "usuario-apellidos") mensaje = mensajeTextoRequerido(valor, "Los apellidos", 100, "Los apellidos son obligatorios.");
  if (campo.id === "usuario-correo") mensaje = validarCorreoPermitido(valor, true);
  if (campo.id === "usuario-region" && !valor) mensaje = "Selecciona una región.";
  if (campo.id === "usuario-comuna" && !valor) mensaje = "Selecciona una comuna.";
  if (campo.id === "usuario-direccion") mensaje = mensajeTextoRequerido(valor, "La dirección", 300);
  if (campo.id === "usuario-perfil" && !valor) mensaje = "Selecciona un perfil.";
  if (campo.id === "usuario-contrasena" && valor && (valor.length < 4 || valor.length > 10)) mensaje = "La contraseña debe tener entre 4 y 10 caracteres.";
  if (campo.id === "usuario-confirmar" && valor !== document.querySelector("#usuario-contrasena").value) mensaje = "Las contraseñas deben coincidir.";
  return mostrarEstadoCampo(campo, mensaje);
}

function iniciarFormularioUsuarioAdmin() {
  const formulario = document.querySelector("#formulario-usuario-admin"); if (!formulario) return;
  if (!protegerAdministracion({ profundidad: 2, permiteVendedor: false })) return;
  const region = formulario.elements.region; regionesYComunas.forEach(function (item) { const opcion = document.createElement("option"); opcion.value = item.region; opcion.textContent = item.region; region.appendChild(opcion); });
  const runEditar = new URLSearchParams(window.location.search).get("run"); const existente = obtenerUsuariosAdmin().find(function (item) { return item.run === runEditar; });
  function poblarComunas(valor) { const seleccion = regionesYComunas.find(function (item) { return item.region === region.value; }); const comuna = formulario.elements.comuna; comuna.replaceChildren(); const inicial = document.createElement("option"); inicial.value = ""; inicial.textContent = "Seleccione una comuna"; comuna.appendChild(inicial); comuna.disabled = !seleccion; if (seleccion) seleccion.comunas.forEach(function (nombre) { const opcion = document.createElement("option"); opcion.value = nombre; opcion.textContent = nombre; comuna.appendChild(opcion); }); if (valor) comuna.value = valor; }
  if (existente) { ["run","nombre","apellidos","correo","fechaNacimiento","region","direccion","perfil"].forEach(function (clave) { if (formulario.elements[clave]) formulario.elements[clave].value = existente[clave] || ""; }); poblarComunas(existente.comuna); }
  else poblarComunas();
  region.addEventListener("change", function () { poblarComunas(); validarUsuarioAdmin(region); });
  formulario.querySelectorAll("input,select").forEach(function (campo) { campo.addEventListener("input", function () { validarUsuarioAdmin(campo); }); });
  formulario.addEventListener("submit", function (evento) { evento.preventDefault(); let valido = true; formulario.querySelectorAll("input,select").forEach(function (campo) { if (campo.id !== "usuario-contrasena" && campo.id !== "usuario-confirmar" && !validarUsuarioAdmin(campo)) valido = false; }); const nueva = formulario.elements.contrasena.value; const confirmar = formulario.elements.confirmar.value; if (!existente && !nueva) { mostrarEstadoCampo(formulario.elements.contrasena, "La contraseña es obligatoria."); valido = false; } if (nueva && (!validarUsuarioAdmin(formulario.elements.contrasena) || !validarUsuarioAdmin(formulario.elements.confirmar))) valido = false; if (!valido) return; const lista = obtenerUsuariosAdmin(); const run = formulario.elements.run.value.trim().toUpperCase(); const correo = formulario.elements.correo.value.trim().toLowerCase(); if (lista.find(function (u) { return u.run === run && u.run !== runEditar; })) { mostrarEstadoCampo(formulario.elements.run, "El RUN ya existe."); return; } if (lista.find(function (u) { return u.correo === correo && u.run !== runEditar; })) { mostrarEstadoCampo(formulario.elements.correo, "El correo ya existe."); return; } const usuario = { run: run, nombre: formulario.elements.nombre.value.trim(), apellidos: formulario.elements.apellidos.value.trim(), correo: correo, fechaNacimiento: formulario.elements.fechaNacimiento.value, region: region.value, comuna: formulario.elements.comuna.value, direccion: formulario.elements.direccion.value.trim(), contrasena: nueva || existente.contrasena, perfil: formulario.elements.perfil.value }; const indice = lista.findIndex(function (u) { return u.run === runEditar; }); if (indice >= 0) lista[indice] = usuario; else lista.push(usuario); guardarUsuariosAdmin(lista); const sesion = obtenerSesionAdmin(); if (sesion && sesion.run === runEditar) localStorage.setItem(CLAVE_SESION_ADMIN, JSON.stringify({ run: usuario.run, nombre: usuario.nombre, correo: usuario.correo, perfil: usuario.perfil })); window.location.href = "index.html"; });
}

listarUsuariosAdmin(); mostrarDetalleUsuarioAdmin(); iniciarFormularioUsuarioAdmin();

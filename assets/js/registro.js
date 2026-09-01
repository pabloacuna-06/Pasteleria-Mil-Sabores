function validarDigitoRun(run) {
  const cuerpo = run.slice(0, -1);
  const digitoIngresado = run.slice(-1).toUpperCase();
  let suma = 0;
  let multiplicador = 2;

  for (let indice = cuerpo.length - 1; indice >= 0; indice--) {
    suma += Number(cuerpo[indice]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resultado = 11 - (suma % 11);
  let digitoEsperado = String(resultado);
  if (resultado === 11) digitoEsperado = "0";
  if (resultado === 10) digitoEsperado = "K";
  return digitoIngresado === digitoEsperado;
}

function mensajeRun(valor) {
  const run = valor.trim().toUpperCase();
  if (!run) return "El RUN es obligatorio.";
  if (run.includes(".")) return "Escribe el RUN sin puntos.";
  if (run.includes("-")) return "Escribe el RUN sin guion.";
  if (run.length < 7 || run.length > 9) return "El RUN debe tener entre 7 y 9 caracteres.";
  if (!/^\d+[0-9K]$/.test(run)) return "El RUN solo puede contener números y K como dígito verificador.";
  if (!validarDigitoRun(run)) return "El RUN ingresado no es correcto.";
  return "";
}

function mensajeTextoRequerido(valor, nombre, maximo, mensajeObligatorio) {
  const texto = valor.trim();
  if (!texto) return mensajeObligatorio || `${nombre} es obligatorio.`;
  if (texto.length > maximo) return `${nombre} no puede superar los ${maximo} caracteres.`;
  return "";
}

function cargarRegiones() {
  const selectorRegion = document.querySelector("#region");
  regionesYComunas.forEach(function (elemento) {
    const opcion = document.createElement("option");
    opcion.value = elemento.region;
    opcion.textContent = elemento.region;
    selectorRegion.appendChild(opcion);
  });
}

function cargarComunas() {
  const selectorRegion = document.querySelector("#region");
  const selectorComuna = document.querySelector("#comuna");
  const seleccion = regionesYComunas.find(function (elemento) {
    return elemento.region === selectorRegion.value;
  });

  selectorComuna.replaceChildren();
  const opcionInicial = document.createElement("option");
  opcionInicial.value = "";
  opcionInicial.textContent = seleccion ? "Seleccione una comuna" : "Primero seleccione una región";
  selectorComuna.appendChild(opcionInicial);
  selectorComuna.disabled = !seleccion;

  if (seleccion) {
    seleccion.comunas.forEach(function (comuna) {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      selectorComuna.appendChild(opcion);
    });
  }
}

function validarCampoRegistro(campo) {
  let mensaje = "";
  if (campo.id === "run") mensaje = mensajeRun(campo.value);
  if (campo.id === "nombre") mensaje = mensajeTextoRequerido(campo.value, "El nombre", 50);
  if (campo.id === "apellidos") mensaje = mensajeTextoRequerido(campo.value, "Los apellidos", 100, "Los apellidos son obligatorios.");
  if (campo.id === "correo") mensaje = validarCorreoPermitido(campo.value, true);
  if (campo.id === "region" && !campo.value) mensaje = "Selecciona una región.";
  if (campo.id === "comuna" && !campo.value) mensaje = "Selecciona una comuna.";
  if (campo.id === "direccion") mensaje = mensajeTextoRequerido(campo.value, "La dirección", 300);
  if (campo.id === "contrasena") {
    if (!campo.value) mensaje = "La contraseña es obligatoria.";
    else if (campo.value.length < 4 || campo.value.length > 10) mensaje = "La contraseña debe tener entre 4 y 10 caracteres.";
  }
  if (campo.id === "confirmar-contrasena") {
    const contrasena = document.querySelector("#contrasena").value;
    if (!campo.value) mensaje = "Confirma la contraseña.";
    else if (campo.value !== contrasena) mensaje = "Las contraseñas deben coincidir.";
  }
  return mostrarEstadoCampo(campo, mensaje);
}

function validarRegistroCompleto() {
  const ids = ["run", "nombre", "apellidos", "correo", "region", "comuna", "direccion", "contrasena", "confirmar-contrasena"];
  let formularioValido = true;
  ids.forEach(function (id) {
    if (!validarCampoRegistro(document.querySelector(`#${id}`))) formularioValido = false;
  });
  return formularioValido;
}

function registrarUsuario(evento) {
  evento.preventDefault();
  const mensajeGeneral = document.querySelector("#mensaje-registro");
  const accesoLogin = document.querySelector("#acceso-login");
  mensajeGeneral.textContent = "";
  mensajeGeneral.className = "form-message";
  accesoLogin.hidden = true;

  if (!validarRegistroCompleto()) {
    mensajeGeneral.textContent = "Revisa los campos marcados antes de registrarte.";
    mensajeGeneral.classList.add("error-general");
    return;
  }

  const run = document.querySelector("#run").value.trim().toUpperCase();
  const correo = document.querySelector("#correo").value.trim().toLowerCase();
  const usuarios = obtenerUsuarios();
  const runRepetido = usuarios.find(function (usuario) { return usuario && usuario.run === run; });
  const correoRepetido = usuarios.find(function (usuario) {
    return usuario && typeof usuario.correo === "string" && usuario.correo.toLowerCase() === correo;
  });

  if (runRepetido) {
    mostrarEstadoCampo(document.querySelector("#run"), "Ya existe un usuario registrado con este RUN.");
    mensajeGeneral.textContent = "No fue posible completar el registro.";
    mensajeGeneral.classList.add("error-general");
    return;
  }
  if (correoRepetido) {
    mostrarEstadoCampo(document.querySelector("#correo"), "Ya existe un usuario registrado con este correo.");
    mensajeGeneral.textContent = "No fue posible completar el registro.";
    mensajeGeneral.classList.add("error-general");
    return;
  }

  const usuario = {
    run: run,
    nombre: document.querySelector("#nombre").value.trim(),
    apellidos: document.querySelector("#apellidos").value.trim(),
    correo: correo,
    fechaNacimiento: document.querySelector("#fecha-nacimiento").value,
    region: document.querySelector("#region").value,
    comuna: document.querySelector("#comuna").value,
    direccion: document.querySelector("#direccion").value.trim(),
    // Solo se guarda para esta demostración académica; en un sistema real sería inseguro.
    contrasena: document.querySelector("#contrasena").value,
    perfil: "Cliente"
  };

  usuarios.push(usuario);
  guardarUsuarios(usuarios);
  evento.currentTarget.reset();
  evento.currentTarget.querySelectorAll("input, select").forEach(limpiarEstadoCampo);
  cargarComunas();
  mensajeGeneral.textContent = "Tu cuenta fue registrada correctamente.";
  mensajeGeneral.classList.add("success-message");
  accesoLogin.hidden = false;
}

function iniciarRegistro() {
  const formulario = document.querySelector("#formulario-registro");
  if (!formulario) return;

  cargarRegiones();
  cargarComunas();
  formulario.querySelectorAll("input").forEach(function (campo) {
    campo.addEventListener("input", function () {
      validarCampoRegistro(campo);
      if (campo.id === "contrasena" && document.querySelector("#confirmar-contrasena").value) {
        validarCampoRegistro(document.querySelector("#confirmar-contrasena"));
      }
    });
  });
  document.querySelector("#region").addEventListener("change", function (evento) {
    cargarComunas();
    validarCampoRegistro(evento.currentTarget);
    validarCampoRegistro(document.querySelector("#comuna"));
  });
  document.querySelector("#comuna").addEventListener("change", function (evento) {
    validarCampoRegistro(evento.currentTarget);
  });
  formulario.addEventListener("submit", registrarUsuario);
}

iniciarRegistro();

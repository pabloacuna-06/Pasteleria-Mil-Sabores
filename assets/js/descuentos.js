const CLAVE_BENEFICIO = "beneficioMilSabores";
const CLAVE_USUARIOS_BENEFICIOS = "usuariosMilSabores";
const CLAVE_SESION_BENEFICIOS = "sesionMilSabores";

function obtenerDatosLocal(clave) {
  const datos = localStorage.getItem(clave);
  if (!datos) return null;
  try {
    return JSON.parse(datos);
  } catch (error) {
    return null;
  }
}

function obtenerUsuarioConSesion() {
  const sesion = obtenerDatosLocal(CLAVE_SESION_BENEFICIOS);
  const usuarios = obtenerDatosLocal(CLAVE_USUARIOS_BENEFICIOS);
  if (!sesion || !sesion.run || !Array.isArray(usuarios)) return null;
  return usuarios.find(function (usuario) {
    return usuario && usuario.run === sesion.run;
  }) || null;
}

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const partes = fechaNacimiento.split("-");
  if (partes.length !== 3) return null;
  const fechaActual = new Date();
  const anio = Number(partes[0]);
  const mes = Number(partes[1]) - 1;
  const dia = Number(partes[2]);
  let edad = fechaActual.getFullYear() - anio;
  const aunNoCumple = fechaActual.getMonth() < mes ||
    (fechaActual.getMonth() === mes && fechaActual.getDate() < dia);
  if (aunNoCumple) edad -= 1;
  return edad;
}

function esCorreoDuoc(correo) {
  const correoNormalizado = String(correo || "").trim().toLowerCase();
  return correoNormalizado.endsWith("@duoc.cl") || correoNormalizado.endsWith("@profesor.duoc.cl");
}

function esCumpleanosHoy(fechaNacimiento) {
  if (!fechaNacimiento) return false;
  const partes = fechaNacimiento.split("-");
  if (partes.length !== 3) return false;
  const fechaActual = new Date();
  return Number(partes[1]) === fechaActual.getMonth() + 1 &&
    Number(partes[2]) === fechaActual.getDate();
}

function esTorta(producto) {
  return producto.nombre.toLowerCase().startsWith("torta");
}

function obtenerCodigoAplicado() {
  return localStorage.getItem(CLAVE_BENEFICIO) || "";
}

function calcularBeneficios(carrito) {
  const subtotal = calcularTotal(carrito);
  const beneficios = [];
  const usuario = obtenerUsuarioConSesion();
  let mensajePersonal = "";

  if (!obtenerDatosLocal(CLAVE_SESION_BENEFICIOS)) {
    mensajePersonal = "Inicia sesión para revisar tus beneficios personales. Puedes continuar con la compra simulada.";
  } else if (!usuario) {
    mensajePersonal = "No se encontró el usuario de la sesión para calcular beneficios personales.";
  } else {
    const edad = calcularEdad(usuario.fechaNacimiento);
    if (edad !== null && edad > 50) {
      beneficios.push({ nombre: "50% por ser mayor de 50 años", monto: subtotal * 0.5 });
    }

    if (esCorreoDuoc(usuario.correo) && esCumpleanosHoy(usuario.fechaNacimiento)) {
      const lineaTorta = carrito.find(function (linea) {
        const producto = productos.find(function (item) { return item.codigo === linea.codigo; });
        return producto && esTorta(producto);
      });
      if (lineaTorta) {
        const torta = productos.find(function (item) { return item.codigo === lineaTorta.codigo; });
        beneficios.push({
          nombre: `Torta gratis por cumpleaños: ${torta.nombre}`,
          monto: calcularSubtotal(lineaTorta, torta)
        });
      } else {
        mensajePersonal = "Cumples las condiciones de cumpleaños, pero agrega una torta al carrito para aplicar el beneficio.";
      }
    }
    if (!mensajePersonal && beneficios.length === 0) {
      mensajePersonal = "No tienes beneficios personales disponibles para esta compra.";
    }
  }

  if (obtenerCodigoAplicado() === "FELICES50") {
    beneficios.push({ nombre: "10% con código FELICES50", monto: subtotal * 0.1 });
  }

  const montoDescontado = Math.min(subtotal, beneficios.reduce(function (total, beneficio) {
    return total + beneficio.monto;
  }, 0));

  return {
    subtotal: subtotal,
    beneficios: beneficios,
    montoDescontado: montoDescontado,
    totalFinal: subtotal - montoDescontado,
    mensajePersonal: mensajePersonal
  };
}

function mostrarBeneficios(carrito) {
  const resultado = calcularBeneficios(carrito);
  const campoCodigo = document.querySelector("#codigo-promocional");
  const mensajePersonal = document.querySelector("#mensaje-beneficios-personales");
  const beneficioAplicado = document.querySelector("#beneficio-aplicado");
  if (!campoCodigo) return resultado;

  campoCodigo.value = obtenerCodigoAplicado();
  mensajePersonal.textContent = resultado.mensajePersonal;
  beneficioAplicado.textContent = resultado.beneficios.length ?
    `Beneficio aplicado: ${resultado.beneficios.map(function (beneficio) { return beneficio.nombre; }).join(" + ")}` :
    "Beneficio aplicado: ninguno";
  document.querySelector("#subtotal-original").textContent = `Subtotal original: ${formatearPrecio(resultado.subtotal)}`;
  document.querySelector("#monto-descuento").textContent = `Monto descontado: ${formatearPrecio(resultado.montoDescontado)}`;
  document.querySelector("#total-final").textContent = `Total final: ${formatearPrecio(resultado.totalFinal)}`;
  return resultado;
}

function aplicarCodigoPromocional() {
  const campoCodigo = document.querySelector("#codigo-promocional");
  const mensajeCodigo = document.querySelector("#mensaje-codigo-promocional");
  const codigo = campoCodigo.value.trim();
  mensajeCodigo.className = "form-message";

  if (codigo !== "FELICES50") {
    localStorage.removeItem(CLAVE_BENEFICIO);
    mensajeCodigo.textContent = "El código no es válido. Escribe exactamente FELICES50.";
    mensajeCodigo.classList.add("error-general");
    mostrarCarrito();
    return;
  }

  localStorage.setItem(CLAVE_BENEFICIO, codigo);
  mensajeCodigo.textContent = "Código FELICES50 aplicado correctamente.";
  mensajeCodigo.classList.add("success-message");
  mostrarCarrito();
  document.querySelector("#mensaje-codigo-promocional").textContent = "Código FELICES50 aplicado correctamente.";
  document.querySelector("#mensaje-codigo-promocional").className = "form-message success-message";
}

function iniciarBeneficios() {
  const boton = document.querySelector("#aplicar-codigo");
  if (!boton) return;
  boton.addEventListener("click", aplicarCodigoPromocional);
}

function guardarProductosAdmin(lista) {
  localStorage.setItem("productosMilSabores", JSON.stringify(lista));
  actualizarProductosActuales();
}

function categoriasProductosAdmin() {
  return productosIniciales.reduce(function (categorias, producto) {
    if (!categorias.includes(producto.categoria)) categorias.push(producto.categoria);
    return categorias;
  }, []);
}

function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

function mostrarListadoProductosAdmin() {
  const tabla = document.querySelector("#lista-productos-admin");
  if (!tabla) return;
  const sesion = protegerAdministracion({ profundidad: 2, permiteVendedor: true });
  if (!sesion) return;
  tabla.replaceChildren();
  obtenerProductosActuales().forEach(function (producto) {
    const fila = document.createElement("tr");
    fila.appendChild(crearCelda(producto.codigo));
    const imagenCelda = document.createElement("td");
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = `Imagen de ${producto.nombre}`;
    imagen.className = "admin-thumb";
    imagenCelda.appendChild(imagen);
    fila.appendChild(imagenCelda);
    fila.appendChild(crearCelda(producto.nombre));
    fila.appendChild(crearCelda(producto.categoria));
    fila.appendChild(crearCelda(formatearPrecio(producto.precio)));
    const acciones = document.createElement("td");
    const detalle = document.createElement("a");
    detalle.className = "text-link";
    detalle.href = `detalle.html?codigo=${encodeURIComponent(producto.codigo)}`;
    detalle.textContent = "Ver detalle";
    acciones.appendChild(detalle);
    if (sesion.perfil === "Administrador") {
      const editar = document.createElement("a");
      editar.className = "text-link";
      editar.href = `formulario.html?codigo=${encodeURIComponent(producto.codigo)}`;
      editar.textContent = "Editar";
      acciones.appendChild(document.createTextNode(" · "));
      acciones.appendChild(editar);
      const eliminar = document.createElement("button");
      eliminar.type = "button";
      eliminar.className = "link-button";
      eliminar.textContent = "Eliminar";
      eliminar.addEventListener("click", function () { eliminarProductoAdmin(producto.codigo); });
      acciones.appendChild(document.createTextNode(" · "));
      acciones.appendChild(eliminar);
    }
    fila.appendChild(acciones);
    tabla.appendChild(fila);
  });
}

function eliminarProductoAdmin(codigo) {
  if (!confirm("¿Deseas eliminar este producto?")) return;
  const lista = obtenerProductosActuales().filter(function (producto) { return producto.codigo !== codigo; });
  guardarProductosAdmin(lista);
  mostrarListadoProductosAdmin();
}

function mostrarDetalleProductoAdmin() {
  const contenedor = document.querySelector("#detalle-producto-admin");
  if (!contenedor) return;
  const sesion = protegerAdministracion({ profundidad: 2, permiteVendedor: true });
  if (!sesion) return;
  const codigo = new URLSearchParams(window.location.search).get("codigo");
  const producto = obtenerProductosActuales().find(function (elemento) { return elemento.codigo === codigo; });
  if (!producto) { contenedor.textContent = "Producto no encontrado."; return; }
  contenedor.replaceChildren();
  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = `Imagen de ${producto.nombre}`;
  imagen.className = "detail-image";
  contenedor.appendChild(imagen);
  [producto.codigo, producto.nombre, producto.categoria, producto.descripcion, formatearPrecio(producto.precio), `Stock: ${producto.stock || 0}`, `Stock crítico: ${producto.stockCritico || 0}`].forEach(function (texto) { contenedor.appendChild(crearElementoTexto("p", texto)); });
}

function validarCampoProducto(campo) {
  let mensaje = "";
  const valor = campo.value.trim();
  if (campo.id === "producto-codigo") { if (!valor) mensaje = "El código es obligatorio."; else if (valor.length < 3) mensaje = "El código debe tener al menos 3 caracteres."; }
  if (campo.id === "producto-nombre") { if (!valor) mensaje = "El nombre es obligatorio."; else if (valor.length > 100) mensaje = "Máximo 100 caracteres."; }
  if (campo.id === "producto-descripcion" && valor.length > 500) mensaje = "Máximo 500 caracteres.";
  if (campo.id === "producto-precio" && (valor === "" || Number(valor) <= 0 || Number.isNaN(Number(valor)))) mensaje = "Ingresa un precio numérico mayor que 0.";
  if (campo.id === "producto-stock" && (!Number.isInteger(Number(valor)) || Number(valor) < 0)) mensaje = "Ingresa un stock entero desde 0.";
  if (campo.id === "producto-stock-critico" && valor && (!Number.isInteger(Number(valor)) || Number(valor) < 0)) mensaje = "Ingresa un stock crítico entero desde 0.";
  if (campo.id === "producto-categoria" && !valor) mensaje = "Selecciona una categoría.";
  if (campo.id === "producto-imagen" && valor && (!valor.startsWith("https://") || !/\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(valor))) mensaje = "La imagen debe usar una URL HTTPS directa de imagen.";
  return mostrarEstadoCampo(campo, mensaje);
}

function iniciarFormularioProductoAdmin() {
  const formulario = document.querySelector("#formulario-producto-admin");
  if (!formulario) return;
  const sesion = protegerAdministracion({ profundidad: 2, permiteVendedor: false });
  if (!sesion) return;
  const categoria = document.querySelector("#producto-categoria");
  categoriasProductosAdmin().forEach(function (nombre) { const opcion = document.createElement("option"); opcion.value = nombre; opcion.textContent = nombre; categoria.appendChild(opcion); });
  const codigoEditar = new URLSearchParams(window.location.search).get("codigo");
  const existente = obtenerProductosActuales().find(function (producto) { return producto.codigo === codigoEditar; });
  if (existente) Object.keys(existente).forEach(function (clave) { const campo = formulario.elements[clave === "codigo" ? "codigo" : clave]; if (campo) campo.value = existente[clave]; });
  formulario.querySelectorAll("input, textarea, select").forEach(function (campo) { campo.addEventListener("input", function () { validarCampoProducto(campo); }); campo.addEventListener("change", function () { validarCampoProducto(campo); }); });
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let valido = true;
    formulario.querySelectorAll("input, textarea, select").forEach(function (campo) { if (!validarCampoProducto(campo)) valido = false; });
    const mensaje = document.querySelector("#mensaje-producto-admin");
    if (!valido) { mensaje.textContent = "Revisa los campos del formulario."; return; }
    const codigo = formulario.elements.codigo.value.trim();
    const lista = obtenerProductosActuales();
    if (lista.find(function (producto) { return producto.codigo === codigo && producto.codigo !== codigoEditar; })) { mostrarEstadoCampo(formulario.elements.codigo, "El código ya existe."); return; }
    const producto = { codigo: codigo, nombre: formulario.elements.nombre.value.trim(), categoria: formulario.elements.categoria.value, precio: Number(formulario.elements.precio.value), descripcion: formulario.elements.descripcion.value.trim(), imagen: formulario.elements.imagen.value.trim() || "https://upload.wikimedia.org/wikipedia/commons/a/a2/Vanilla_Cake.jpg", stock: Number(formulario.elements.stock.value), stockCritico: formulario.elements.stockCritico.value ? Number(formulario.elements.stockCritico.value) : 0 };
    const indice = lista.findIndex(function (item) { return item.codigo === codigoEditar; });
    if (indice >= 0) lista[indice] = producto; else lista.push(producto);
    guardarProductosAdmin(lista);
    window.location.href = "index.html";
  });
}

mostrarListadoProductosAdmin();
mostrarDetalleProductoAdmin();
iniciarFormularioProductoAdmin();

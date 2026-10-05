# Pastelería Mil Sabores

## Integrantes

- Pablo Acuña
- Cristobal Cargnino

## Descripción

Tienda de pastelería migrada a React para la Evaluación Parcial 2 de Desarrollo Fullstack II. Permite explorar productos, administrar el catálogo y realizar compras simuladas.

## Tecnologías

- React
- Vite
- React Router
- Bootstrap
- JavaScript
- localStorage
- Vitest
- React Testing Library

## Funcionalidades

- Inicio.
- Catálogo inicial de 16 productos, actualizable desde Administración.
- Búsqueda por nombre o código y filtro por categoría.
- Categorías con cantidades de productos actuales.
- Ofertas.
- Detalle de producto.
- Nosotros.
- Blogs y detalle de publicaciones.
- Contacto.
- Registro básico.
- Inicio de sesión simulado.
- Carrito persistente.
- Cambio de cantidades, eliminación de productos y vaciado del carrito.
- Checkout simulado.
- Retiro en tienda o despacho a domicilio.
- Resumen de compra realizada con cliente, entrega, productos, cantidades, subtotales y total.
- Administración CRUD de productos: crear, consultar, editar y eliminar.
- Compra exitosa y vista simulada de error. La vista de error está disponible en `/compra-error`, pero no está conectada al checkout.
- Diez pruebas unitarias.

## Componentes propios

- **Navbar:** muestra los enlaces de navegación de la tienda y Administración.
- **Footer:** muestra el pie de página.
- **ProductoCard:** muestra los datos de un producto y permite ver su detalle o agregarlo al carrito.
- **FiltroProductos:** permite buscar productos y seleccionar una categoría.
- **CarritoItem:** muestra un producto del carrito, su cantidad y subtotal, con botones para cambiar la cantidad o eliminarlo.
- **ResumenCompra:** muestra las unidades y el total del carrito o checkout.
- **FormularioProducto:** permite ingresar o editar los datos de un producto.

## Ejecución

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente http://localhost:5173/.

## Pruebas

```bash
npm test
```

- 7 archivos de pruebas.
- 10 pruebas unitarias.
- Vitest y React Testing Library.
- Vitest fue utilizado siguiendo la recomendación del docente.

## Compilación

```bash
npm run build
```

La compilación se genera en la carpeta `dist`.

## Persistencia simulada

Los productos y el carrito utilizan localStorage para guardar datos en el navegador. No existe backend ni base de datos real.

## Compra simulada

- No se solicitan tarjetas.
- No existe pasarela de pago.
- No se realiza ningún cobro real.

## Limitaciones académicas

- Login y registro son demostrativos.
- Persistencia local en el navegador.
- Sin backend.
- Sin autenticación segura.
- Las imágenes externas requieren internet.

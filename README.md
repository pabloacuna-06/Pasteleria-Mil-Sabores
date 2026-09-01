# Pastelería Mil Sabores

Proyecto académico desarrollado para la asignatura **Desarrollo Fullstack II** (`DSY1104`). Corresponde a la versión final de la **Evaluación Parcial N.º 1**.

## Integrantes

- Pablo Acuña Escobar
- Cristobal Cargnino
- Tomas Recabarren

## Descripción

Pastelería Mil Sabores es un sitio web de una pastelería ficticia. Permite explorar un catálogo de productos, buscar y filtrar, revisar detalles, personalizar tortas, administrar un carrito y simular registro, inicio de sesión, beneficios y administración según perfil.

## Tecnologías

- HTML5
- CSS3
- JavaScript

No utiliza frameworks, librerías, backend ni base de datos.

## Funcionalidades principales

- Catálogo de 16 productos, búsqueda por nombre o código y filtro por categoría.
- Detalle de producto y mensaje personalizable para tortas.
- Carrito persistente con `localStorage`.
- Registro, contacto e inicio de sesión simulados con validaciones.
- Beneficios académicos y finalización de compra simulada.
- Panel de productos y usuarios con permisos para Cliente, Vendedor y Administrador.

## Perfiles

- **Cliente:** navega, compra de forma simulada y no accede a administración.
- **Vendedor:** consulta productos administrativos y sus detalles.
- **Administrador:** administra productos y usuarios de forma simulada.

## Ejecución local

1. Abra la carpeta del proyecto en Visual Studio Code.
2. Abra `index.html`.
3. Inicie la extensión **Live Server** con “Open with Live Server”.

El uso de un servidor local permite que las rutas y los scripts se comporten de forma consistente durante las pruebas.

## Credenciales demostrativas

| Perfil | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@duoc.cl | admin1 |
| Vendedor | vendedor@duoc.cl | vend1 |

Las cuentas se crean localmente para fines de demostración si aún no existen.

## Persistencia académica

El prototipo utiliza `localStorage` del navegador para guardar el carrito, usuarios, sesión y productos administrativos. Esta persistencia es solo académica: no equivale a una base de datos ni ofrece seguridad real.

No existe backend, base de datos, procesamiento de pagos ni pago real.

## Repositorio

[https://github.com/pabloacuna-06/Pasteleria-Mil-Sabores](https://github.com/pabloacuna-06/Pasteleria-Mil-Sabores)

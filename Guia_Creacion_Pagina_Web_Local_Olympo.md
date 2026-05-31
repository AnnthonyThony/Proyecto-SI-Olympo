# Guia para crear la pagina web local de Olympo Recepciones

## 1. Objetivo del documento

Este documento explica como se construyo el prototipo web local de **Olympo Recepciones** y como otra persona puede reproducirlo, abrirlo y modificarlo.

La pagina fue desarrollada como un sitio web estatico. Esto significa que no necesita instalar un framework, configurar una base de datos ni publicar el proyecto en internet para visualizarlo. Los archivos se guardan juntos en una carpeta y el navegador los interpreta directamente.

Ruta utilizada para el proyecto:

```text
C:\Users\Anthony\Desktop\FIS\4 Semestre\Sistemas de la Informacion\ProyectoOlympo
```

## 2. Tecnologias utilizadas

El prototipo utiliza las tecnologias basicas de una pagina web:

| Tecnologia | Archivo principal | Funcion |
| --- | --- | --- |
| HTML5 | `index.html` | Define la estructura y el contenido visible de la pagina. |
| CSS3 | `styles.css` | Define colores, tipografias, distribucion de elementos y adaptacion a celulares. |
| JavaScript | `script.js` | Agrega interactividad: cotizador, menu movil, galeria ampliada y enlace de WhatsApp. |
| Imagenes locales | Archivos `.jpg` y `.jpeg` | Muestran el logo y las fotografias del salon. |
| Google Fonts | Enlaces dentro de `index.html` | Cargan las tipografias `DM Sans` y `Libre Baskerville` cuando existe conexion a internet. |

No se utilizaron librerias externas de JavaScript, gestores de paquetes como `npm`, servidores con backend ni bases de datos.

## 3. Estructura de archivos

Todos los archivos deben permanecer en la misma carpeta para que las rutas funcionen como estan configuradas actualmente:

```text
ProyectoOlympo/
|-- index.html
|-- styles.css
|-- script.js
|-- Logo Olympo.jpeg
|-- 20230709_120049.jpg
|-- 20231209_151801.jpg
|-- 20241207_154325.jpg
|-- 20241207_160234.jpg
|-- 20241213_152002.jpg
|-- Documento_Ingenieria_Requerimientos_Olympo.md
`-- Guia_Creacion_Pagina_Web_Local_Olympo.md
```

Los tres archivos esenciales son:

1. `index.html`: contiene la pagina.
2. `styles.css`: contiene la presentacion visual.
3. `script.js`: contiene el comportamiento interactivo.

Las imagenes pueden reemplazarse, pero se deben conservar sus nombres o actualizar las referencias correspondientes dentro de `index.html`.

## 4. Como se construyo la pagina

### 4.1 Creacion del archivo HTML

Se creo `index.html` como punto de entrada del sitio. Este archivo:

- Declara el idioma español y la codificacion UTF-8.
- Incluye las tipografias desde Google Fonts.
- Vincula el archivo de estilos con:

```html
<link rel="stylesheet" href="styles.css" />
```

- Vincula el archivo JavaScript antes de cerrar el cuerpo de la pagina:

```html
<script src="script.js"></script>
```

El contenido se organizo en secciones identificadas mediante atributos `id`. Estos identificadores permiten navegar dentro de la misma pagina:

| Seccion | Identificador | Contenido |
| --- | --- | --- |
| Encabezado | `inicio` | Logotipo y menu de navegacion. |
| Portada | Sin identificador propio | Imagen principal, descripcion y botones. |
| Espacios | `espacios` | Presentacion del salon y espacios disponibles. |
| Servicios | `servicios` | Ambientacion, catering, entretenimiento y coordinacion. |
| Paquetes | `paquetes` | Planes Esencial, Celebracion y Experiencia Olympo. |
| Galeria | `galeria` | Fotografias locales que se pueden ampliar. |
| Cotizador | `cotizador` | Formulario para calcular un valor referencial. |
| Contacto | `contacto` | WhatsApp, correo y ubicacion. |

Ejemplo de un enlace que desplaza al usuario hacia el cotizador:

```html
<a href="#cotizador">Cotizar evento</a>
```

### 4.2 Creacion de los estilos CSS

Se creo `styles.css` para separar la presentacion visual del contenido. Al inicio del archivo se declararon variables reutilizables:

```css
:root {
  --ink: #173042;
  --green: #1d5a43;
  --gold: #c8982f;
  --paper: #fbfaf7;
}
```

Estas variables facilitan mantener una identidad visual consistente. Si se requiere modificar el color principal o secundario, se recomienda cambiar primero estos valores.

El archivo CSS tambien incluye:

- Distribuciones con `display: grid` y `display: flex`.
- Botones y tarjetas de paquetes.
- Superposicion oscura sobre la imagen principal para mejorar la lectura del texto.
- Estilos del formulario del cotizador.
- Ventana emergente de la galeria.
- Diseño adaptable mediante reglas `@media`.

Las reglas responsivas ajustan la pagina para pantallas medianas y pequeñas:

```css
@media (max-width: 900px) {
  /* Ajustes para tabletas y pantallas medianas */
}

@media (max-width: 620px) {
  /* Ajustes para celulares */
}
```

### 4.3 Creacion de la interactividad con JavaScript

Se creo `script.js` para agregar funciones que el HTML y CSS por si solos no realizan.

#### Cotizador de eventos

El script almacena los precios y minimos de invitados de cada plan:

```javascript
const plans = {
  esencial: { label: "Esencial", price: 17.5, minimum: 100 },
  celebracion: { label: "Celebracion", price: 20, minimum: 50 },
  experiencia: { label: "Experiencia Olympo", price: 25, minimum: 50 },
};
```

Tambien almacena los valores de los extras demostrativos:

```javascript
const extras = {
  dj: { label: "DJ y animacion", price: 180 },
  foto: { label: "Fotografia adicional", price: 160 },
  decoracion: { label: "Decoracion especial", price: 220 },
  hora: { label: "Hora loca", price: 140 },
};
```

La funcion `updateQuote()` realiza el calculo:

```text
total = numero de invitados x precio del paquete + extras seleccionados
```

El resultado cambia automaticamente cuando el usuario selecciona un paquete, modifica la cantidad de invitados o marca un extra.

#### Enlace de WhatsApp

El cotizador genera un mensaje con los datos elegidos y lo agrega al enlace:

```text
https://wa.me/593959634548
```

Al presionar **Consultar por WhatsApp**, se abre WhatsApp con el resumen de la cotizacion preparado para enviar.

#### Menu para celulares

En pantallas pequeñas, el menu superior se oculta y aparece un boton. JavaScript agrega o retira la clase `open` para mostrar u ocultar las opciones.

#### Galeria ampliada

Cada fotografia de la galeria tiene un atributo `data-image`. Al seleccionar una imagen, JavaScript abre un elemento HTML `dialog` y muestra la fotografia en mayor tamaño.

#### Año automatico

El pie de pagina obtiene el año actual desde el navegador:

```javascript
document.querySelector("#year").textContent = new Date().getFullYear();
```

## 5. Procedimiento para crear una pagina local similar desde cero

1. Crear una carpeta para el proyecto, por ejemplo:

```text
C:\PaginasWeb\MiSitioLocal
```

2. Crear dentro de esa carpeta tres archivos vacios:

```text
index.html
styles.css
script.js
```

3. Colocar las imagenes que utilizara el sitio dentro de la misma carpeta o dentro de una subcarpeta como `images`.

4. Escribir la estructura del sitio en `index.html`.

5. Agregar en la etiqueta `<head>` de `index.html` la referencia a `styles.css`.

6. Agregar antes de `</body>` la referencia a `script.js`.

7. Crear las reglas visuales dentro de `styles.css`.

8. Crear en `script.js` las funciones que respondan a acciones del usuario.

9. Verificar que los nombres utilizados en `src`, `href` y `data-image` coincidan exactamente con los nombres reales de los archivos.

10. Abrir el sitio localmente con una de las opciones de la siguiente seccion.

## 6. Como abrir el prototipo

### Opcion A: abrir el archivo directamente

Esta es la forma mas rapida para revisar el prototipo:

1. Abrir la carpeta:

```text
C:\Users\Anthony\Desktop\FIS\4 Semestre\Sistemas de la Informacion\ProyectoOlympo
```

2. Hacer doble clic en `index.html`.

El navegador mostrara una direccion local parecida a:

```text
file:///C:/Users/Anthony/Desktop/FIS/4%20Semestre/Sistemas%20de%20la%20Informacion/ProyectoOlympo/index.html
```

### Opcion B: usar localhost con Python

Esta opcion reproduce mejor la forma habitual de trabajar con una pagina web local.

1. Abrir PowerShell.

2. Ingresar a la carpeta del proyecto:

```powershell
cd "C:\Users\Anthony\Desktop\FIS\4 Semestre\Sistemas de la Informacion\ProyectoOlympo"
```

3. Iniciar un servidor local:

```powershell
py -m http.server 8000
```

Si el comando `py` no esta disponible, intentar:

```powershell
python -m http.server 8000
```

4. Abrir el navegador e ingresar:

```text
http://localhost:8000
```

5. Para detener el servidor, regresar a PowerShell y presionar:

```text
Ctrl + C
```

Un servidor local solo permite visualizar el proyecto desde el equipo mientras el comando permanezca activo. No publica la pagina en internet.

## 7. Como realizar modificaciones comunes

### Cambiar textos

Abrir `index.html`, localizar el texto visible y editarlo. Por ejemplo, los nombres de paquetes y servicios se encuentran directamente en este archivo.

### Cambiar precios

Actualizar los precios en dos lugares para que la informacion visible y el calculo coincidan:

1. En `index.html`, modificar el precio mostrado en la tarjeta y en la opcion del formulario.
2. En `script.js`, modificar la propiedad `price` del plan correspondiente.

### Cambiar el numero de WhatsApp

Actualizar todas las apariciones del numero en:

- `index.html`
- `script.js`

El formato del enlace debe conservar el codigo del pais sin espacios ni simbolos:

```text
https://wa.me/593959634548
```

### Cambiar fotografias

Existen dos alternativas:

1. Reemplazar una imagen manteniendo exactamente el mismo nombre del archivo.
2. Usar un nombre nuevo y actualizar su referencia en `index.html`.

Ejemplo:

```html
<img src="nueva-fotografia.jpg" alt="Descripcion de la fotografia" />
```

### Cambiar colores

Editar las variables ubicadas al inicio de `styles.css`. Esto evita modificar manualmente cada seccion.

### Agregar una seccion

1. Crear una nueva etiqueta `<section>` dentro de `<main>` en `index.html`.
2. Asignar un identificador si se desea enlazarla desde el menu.
3. Agregar sus estilos en `styles.css`.
4. Agregar JavaScript solamente si la nueva seccion necesita interactividad.

## 8. Consideraciones importantes

- La cotizacion mostrada es referencial y funciona en el navegador. No guarda informacion.
- El prototipo no tiene panel administrativo, autenticacion, base de datos ni backend.
- El boton de WhatsApp necesita conexion a internet para abrir el servicio.
- Las tipografias externas se cargan desde Google Fonts. Sin internet, el navegador utilizara tipografias alternativas.
- Las fotografias y los tres archivos principales deben conservar rutas correctas.
- Para publicar el sitio en internet se requeriria contratar o configurar un servicio de alojamiento web. El prototipo actual esta preparado para ejecutarse localmente.

## 9. Solucion de problemas frecuentes

| Problema | Causa probable | Solucion |
| --- | --- | --- |
| Una imagen no aparece | El nombre o la ruta no coincide. | Revisar el atributo `src` en `index.html` y el nombre real del archivo. |
| Los colores y distribuciones no aparecen | No se cargo el CSS. | Confirmar que exista `styles.css` junto a `index.html` y que la referencia sea correcta. |
| El cotizador no actualiza el total | No se cargo JavaScript o existe un error en el archivo. | Confirmar que exista `script.js` y que se incluya al final de `index.html`. |
| El enlace de WhatsApp no abre | Falta internet o el numero tiene formato incorrecto. | Revisar la conexion y utilizar el formato internacional sin espacios. |
| `localhost:8000` no abre | El servidor local no esta activo. | Ejecutar nuevamente `py -m http.server 8000` desde la carpeta del proyecto. |
| El puerto `8000` ya esta ocupado | Otro programa esta usando el puerto. | Ejecutar `py -m http.server 8080` y abrir `http://localhost:8080`. |

## 10. Resumen

La pagina local de Olympo se realizo separando responsabilidades:

- `index.html` contiene la estructura.
- `styles.css` contiene el diseño.
- `script.js` contiene la interactividad.
- Las imagenes locales contienen el material visual.

Para revisar el resultado basta con abrir `index.html` o iniciar un servidor con Python y visitar `http://localhost:8000`.

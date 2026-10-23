# La Emuna — sitio web de la panadería

Este proyecto es la página web de **Panadería La Emuna**, en San Cristóbal, Táchira.
Está hecho solo con **HTML, CSS y JavaScript**, sin frameworks ni librerías.

La idea es que sea fácil de entender y de cambiar: si quieres editar un texto, una foto o un color, casi siempre basta con abrir el archivo y buscarlo.

---

## Cómo abrir el sitio

1. Abre la carpeta `emuna` en el explorador de archivos.
2. Da doble clic a `index.html` (o ábrelo con Live Server en VS Code / Cursor).
3. Para ver cambios de CSS o JS, a veces conviene recargar con **Ctrl + F5**.

---

## Archivos importantes

| Archivo | Para qué sirve |
|---------|----------------|
| `index.html` | Página de inicio (portada, carrusel, fachada, etc.) |
| `about.html` | Página Nosotros (misión y visión) |
| `product.html` | Página de productos (fichas que se voltean) |
| `contact.html` | Página de contacto (formulario + mapa) |
| `style.css` | Todos los estilos (colores, tamaños, diseño) |
| `script.js` | Lo que se mueve o reacciona al clic |
| `img/` | Fotos, logo y el video de la portada |

Las 4 páginas comparten el mismo menú, el mismo pie y el mismo `style.css` / `script.js`.

---

## Cómo está armado el sitio

### Menú
- Arriba está el logo y los enlaces: Inicio, Nosotros, Productos, Contacto.
- En el celular aparece un botón de 3 rayas. Al tocarlo, `script.js` abre o cierra el menú.

### Inicio (`index.html`)
1. **Portada** con un video de fondo (`img/portada-fondo.mp4`), un velo oscuro y el título.
2. **Carrusel** con fotos de productos. Se mueve con flechas, con puntos o solo cada 3 segundos.
3. Secciones con texto e imágenes (mano de obra, enrolladitos, fachada).
4. **Pie de página** con logo, horario, redes y un mapa pequeño.

### Nosotros (`about.html`)
- Foto del panadero a un lado.
- Texto de la panadería, misión y visión al otro.

### Productos (`product.html`)
- Productos agrupados (Panadería, Antojitos, etc.).
- Cada producto es una **ficha**: al hacer clic se voltea y muestra una descripción corta.

### Contacto (`contact.html`)
- Íconos de Instagram, correo y WhatsApp.
- Formulario (nombre, teléfono, mensaje). Al enviar, se abre WhatsApp con ese texto.
- Datos de la tienda y un mapa grande de Google Maps.

---

## Qué hace `script.js` (en simple)

1. **Menú:** abre / cierra en el celular.
2. **Formulario:** junta lo que escribiste y abre WhatsApp.
3. **Carrusel:** mueve las fotos, marca los puntos y avanza solo.
4. **Fichas:** al hacer clic, pone o quita la clase `volteada`.
5. **Video:** baja un poco la velocidad de la portada para que se vea más suave.

No usa librerías. Son cosas básicas: `querySelector`, `addEventListener`, `classList` y `scrollTo`.

---

## Cómo cambiar cosas comunes

### Cambiar un texto
Abre el `.html` correspondiente, busca el párrafo o título y edítalo.

### Cambiar una foto
1. Pon la imagen nueva en la carpeta `img/`.
2. En el HTML, cambia el `src` de esa `<img>` (por ejemplo `src="img/mi-foto.jpg"`).

### Agregar un producto
En `product.html`, copia un bloque `<article class="ficha">...</article>` y cambia:
- la foto (`src`)
- el nombre (`h3`)
- la descripción del dorso (`p`)

### Cambiar colores
En `style.css`, arriba están las variables en `:root` (`--marron`, `--dorado`, `--crema`, etc.).
Si cambias ahí, se actualiza en casi todo el sitio.

### Cambiar el número de WhatsApp
Busca `wa.me/` en los HTML y en `script.js`, y pon el número nuevo (con código de país, sin espacios).

---

## Colores y tipografía

- **Marrón / burdeos:** textos fuertes y pie de página.
- **Dorado:** detalles y títulos destacados.
- **Crema:** fondos suaves.
- **Fraunces:** títulos (si no hay internet, usa Georgia).
- **Outfit:** textos normales (si no hay internet, usa Segoe UI).

---

## Notas

- El sitio es estático: no hay base de datos ni servidor propio.
- El formulario no guarda datos en ningún lado; solo abre WhatsApp.
- Algunas imágenes están en `.webp` para que pesen menos y carguen más rápido.
- El video de la portada debe estar en `img/portada-fondo.mp4`.

Si algo no se ve bien después de editar, revisa que no falte una etiqueta en el HTML (por ejemplo un `</p>` o un `</div>`).

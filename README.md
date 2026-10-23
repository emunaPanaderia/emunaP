# La Emuna — sitio web de la panadería

Página web de **Panadería La Emuna** (San Cristóbal, Táchira).
Hecha solo con **HTML, CSS y JavaScript**, sin frameworks ni librerías.

---

## Cómo abrir el sitio

1. Abre la carpeta `emuna`.
2. Da doble clic a `index.html` (o ábrelo con Live Server en VS Code / Cursor).
3. Si no ves un cambio reciente, recarga con **Ctrl + F5**.

---

## Archivos del proyecto

| Archivo | Para qué sirve |
|---------|----------------|
| `index.html` | Inicio: portada, carrusel, enrolladitos, pan de jamón, fachada |
| `about.html` | Nosotros (misión y visión) |
| `product.html` | Productos (fichas que se voltean) |
| `contact.html` | Contacto (formulario + mapa) |
| `style.css` | Estilos de las 4 páginas |
| `script.js` | Menú, carrusel, fichas, WhatsApp, video, animaciones |
| `img/` | Fotos WebP, logo y favicon |
| `videos/` | Video de la portada |

No hay Python ni carpetas temporales: solo lo que usa el sitio.

---

## Qué hay en `img/`

### `img/`
- **Logo / ícono:** `logo.webp`, `favicon.ico`.
- **Inicio:** `mano_obra.webp`, `enrolladitos.webp`, `PandeJamon.webp`, `fachada.webp`.
- **Nosotros:** `model1.webp`.
- **Carrusel y productos:** panes, enrollados, rellenos, bolitas, peguetas, brownie, galletas, turrón (todos en `.webp`).

### `videos/`
- **Portada:** `portada-fondo.mp4`.

---

## Cómo está armado

### Menú
Logo + enlaces (Inicio, Nosotros, Productos, Contacto). En celular hay un botón de 3 rayas.

### Inicio (`index.html`)
1. Portada con video, título y frase.
2. Carrusel de productos (flechas, puntos o auto cada 3 s).
3. Sección de mano de obra.
4. **Enrolladitos** y **pan de jamón**: foto sin fondo sobre dos círculos dorados (sin animación).
5. Fachada del local + pie con mapa.

### Nosotros (`about.html`)
Foto del panadero, texto, misión y visión.

### Productos (`product.html`)
Fichas por grupo. Al hacer clic se voltean y muestran una descripción.

### Contacto (`contact.html`)
Redes, formulario (abre WhatsApp) y mapa de Google.

---

## Qué hace `script.js`

1. Abre / cierra el menú en celular.
2. Envía el formulario a WhatsApp.
3. Mueve el carrusel.
4. Voltea las fichas de productos.
5. Baja un poco la velocidad del video de portada.
6. Animaciones al hacer scroll (solo en escritorio, desde 801px).

---

## Cambios frecuentes

### Texto
Edita el `.html` correspondiente.

### Foto
1. Pon el archivo nuevo en `img/` (mejor `.webp`).
2. Cambia el `src` de la `<img>` en el HTML.

### Producto nuevo
En `product.html`, copia un `<article class="ficha">...</article>` y cambia foto, nombre y descripción.

### Colores
En `style.css`, variables de `:root` (`--marron`, `--dorado`, `--crema`, etc.).

### WhatsApp
Busca `wa.me/` en los HTML y en `script.js`.

---

## Colores y tipografía

- **Marrón:** textos fuertes y pie.
- **Dorado:** detalles y círculos de fondo.
- **Crema:** fondos de sección.
- **Fraunces:** títulos · **Outfit:** textos (con respaldo del sistema si no hay internet).

---

## Notas

- Sitio estático: sin base de datos ni servidor propio.
- El formulario no guarda datos; solo abre WhatsApp.
- Las imágenes van en `.webp` para pesar menos.
- El video de portada debe estar en `videos/portada-fondo.mp4`.

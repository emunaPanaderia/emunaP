/* =========================================
   La Emuna — script.js
   JavaScript simple, sin librerías.
   Sirve para las 4 páginas del sitio.
   =========================================

   Qué hace este archivo:
   1. Abre y cierra el menú en el celular
   2. Envía el formulario de contacto a WhatsApp
   3. Mueve el carrusel de productos (inicio)
   4. Voltea las fichas de productos al hacer clic
   5. Baja un poco la velocidad del video de la portada
*/

/* ---------- 1. Menú del celular ----------
   Al tocar el botón de las 3 rayas, se abre o se cierra el menú. */

var botonMenu = document.querySelector(".menu-boton");
var nav = document.querySelector(".nav");

if (botonMenu && nav) {
    botonMenu.addEventListener("click", function () {
        nav.classList.toggle("abierto");
        botonMenu.classList.toggle("abierto");

        /* Cambia el texto del botón para accesibilidad */
        if (nav.classList.contains("abierto")) {
            botonMenu.setAttribute("aria-expanded", "true");
            botonMenu.setAttribute("aria-label", "Cerrar menú");
        } else {
            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");
        }
    });

    /* Si tocas un enlace del menú, se cierra solo */
    var enlaces = nav.querySelectorAll("a");
    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener("click", function () {
            nav.classList.remove("abierto");
            botonMenu.classList.remove("abierto");
            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");
        });
    }
}

/* ---------- 2. Formulario → WhatsApp ----------
   No hay servidor. Al enviar, se abre WhatsApp
   con el nombre, teléfono y mensaje escritos. */

var formulario = document.getElementById("formulario");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault(); /* Evita que la página se recargue */

        var nombre = document.getElementById("nombre").value;
        var telefono = document.getElementById("telefono").value;
        var mensaje = document.getElementById("detalle").value;

        var texto =
            "Hola, les escribo desde la página.\n" +
            "Nombre: " + nombre + "\n" +
            "Teléfono: " + telefono + "\n" +
            "Mensaje: " + mensaje;

        var enlace =
            "https://wa.me/+573001059833?text=" +
            encodeURIComponent(texto);

        window.open(enlace, "_blank");
    });
}

/* ---------- 3. Carrusel de productos ----------
   Solo aparece en el inicio.
   Las flechas mueven una tarjeta.
   Cada 3 segundos avanza solo.
   Los puntos indican en qué parte vas. */

var carrusel = document.querySelector(".carrusel");

if (carrusel) {
    /* Cuánto hay que mover: ancho de una tarjeta + el espacio entre ellas */
    function pasoCarrusel() {
        var tarjeta = carrusel.querySelector(".carrusel-item");
        var estilos = window.getComputedStyle(carrusel);
        var espacio = parseFloat(estilos.columnGap);
        if (isNaN(espacio)) {
            espacio = 0;
        }
        return tarjeta.offsetWidth + espacio;
    }

    /* Mueve el carrusel a la izquierda (-1) o a la derecha (1) */
    function moverCarrusel(direccion) {
        var paso = pasoCarrusel();
        var alFinal =
            carrusel.scrollLeft + carrusel.clientWidth >=
            carrusel.scrollWidth - 4;
        var alInicio = carrusel.scrollLeft <= 4;

        if (direccion > 0 && alFinal) {
            /* Si ya está al final, vuelve al principio */
            carrusel.scrollTo({ left: 0, behavior: "smooth" });
        } else if (direccion < 0 && alInicio) {
            /* Si está al inicio y va hacia atrás, va al final */
            carrusel.scrollTo({
                left: carrusel.scrollWidth,
                behavior: "smooth"
            });
        } else {
            carrusel.scrollBy({
                left: direccion * paso,
                behavior: "smooth"
            });
        }
    }

    /* Flechas izquierda y derecha */
    var flechas = document.querySelectorAll(".carrusel-flecha");
    for (var f = 0; f < flechas.length; f++) {
        flechas[f].addEventListener("click", function () {
            var dir = Number(this.getAttribute("data-dir"));
            moverCarrusel(dir);
        });
    }

    /* ---------- Puntos guía ---------- */
    var cajaPuntos = document.querySelector(".carrusel-puntos");

    function marcarPunto() {
        if (!cajaPuntos) {
            return;
        }
        var actual = Math.round(carrusel.scrollLeft / pasoCarrusel());
        var puntos = cajaPuntos.querySelectorAll(".carrusel-punto");
        for (var p = 0; p < puntos.length; p++) {
            if (p === actual) {
                puntos[p].classList.add("activo");
            } else {
                puntos[p].classList.remove("activo");
            }
        }
    }

    function crearPuntos() {
        if (!cajaPuntos) {
            return;
        }
        var paso = pasoCarrusel();
        var cantidad =
            Math.round(
                (carrusel.scrollWidth - carrusel.clientWidth) / paso
            ) + 1;

        cajaPuntos.innerHTML = "";

        for (var i = 0; i < cantidad; i++) {
            var punto = document.createElement("button");
            punto.type = "button";
            punto.className = "carrusel-punto";
            punto.setAttribute("aria-label", "Ir al producto " + (i + 1));

            /* Guardamos el número en un atributo para usarlo al hacer clic */
            punto.setAttribute("data-indice", String(i));

            punto.addEventListener("click", function () {
                var indice = Number(this.getAttribute("data-indice"));
                carrusel.scrollTo({
                    left: indice * pasoCarrusel(),
                    behavior: "smooth"
                });
            });

            cajaPuntos.appendChild(punto);
        }
        marcarPunto();
    }

    crearPuntos();
    carrusel.addEventListener("scroll", marcarPunto);
    window.addEventListener("resize", crearPuntos);

    /* Avanza solo cada 3 segundos. Se pausa si el mouse está encima. */
    var enPausa = false;
    var zona = carrusel.closest(".contenedor");

    if (zona) {
        zona.addEventListener("mouseenter", function () {
            enPausa = true;
        });
        zona.addEventListener("mouseleave", function () {
            enPausa = false;
        });
    }

    setInterval(function () {
        if (!enPausa && !document.hidden) {
            moverCarrusel(1);
        }
    }, 3000);
}

/* ---------- 4. Fichas que se voltean ----------
   En Productos, al hacer clic la tarjeta gira y muestra el texto de atrás. */

var fichas = document.querySelectorAll(".ficha");

for (var j = 0; j < fichas.length; j++) {
    fichas[j].addEventListener("click", function () {
        this.classList.toggle("volteada");
    });
}

/* ---------- 5. Video de la portada ----------
   Solo en el inicio. Baja un poco la velocidad para que se vea más suave. */

var videoPortada = document.querySelector(".bg-video");

if (videoPortada) {
    videoPortada.playbackRate = 0.75;
}

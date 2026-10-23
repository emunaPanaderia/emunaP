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
   6. Animaciones al bajar (solo en escritorio)
*/

/* En celular (800px o menos) no usamos animaciones de movimiento. */
function esEscritorio() {
    return window.matchMedia("(min-width: 801px)").matches;
}

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

    /* En escritorio las tarjetas se achican un poco mientras se mueven. */
    function animarMovimiento() {
        if (!esEscritorio()) {
            return;
        }
        carrusel.classList.add("moviendo");
        setTimeout(function () {
            carrusel.classList.remove("moviendo");
        }, 450);
    }

    /* Mueve el carrusel a la izquierda (-1) o a la derecha (1) */
    function moverCarrusel(direccion) {
        var paso = pasoCarrusel();
        var alFinal =
            carrusel.scrollLeft + carrusel.clientWidth >=
            carrusel.scrollWidth - 4;
        var alInicio = carrusel.scrollLeft <= 4;

        animarMovimiento();

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
                animarMovimiento();
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

/* ---------- 6. Animaciones al bajar ----------
   Solo en escritorio. Anima secciones, textos, fotos y fichas
   cuando aparecen al bajar. En celular no se anima nada. */

if (esEscritorio()) {
    var piezas = [];
    var yaAgregado = [];
    var tipos = ["sube", "crece", "nace", "baja", "izq", "der", "gira"];

    function yaEsta(nodo) {
        for (var i = 0; i < yaAgregado.length; i++) {
            if (yaAgregado[i] === nodo) {
                return true;
            }
        }
        return false;
    }

    function agregarPiezas(selector, tipoFijo) {
        var nodos = document.querySelectorAll(selector);
        for (var i = 0; i < nodos.length; i++) {
            var nodo = nodos[i];
            /* No animamos menú, pie ni el botón flotante de WhatsApp */
            if (nodo.closest(".menu") || nodo.closest(".pie") || nodo.closest(".whatsapp")) {
                continue;
            }
            if (yaEsta(nodo)) {
                continue;
            }
            var tipo = tipoFijo || tipos[i % tipos.length];
            piezas.push({ nodo: nodo, tipo: tipo });
            yaAgregado.push(nodo);
        }
    }

    /* Fotos e imágenes de las secciones */
    agregarPiezas(".panadero, .foto-local, .foto-enrolladitos", "crece");
    agregarPiezas("main img, .seccion img, .vitrina img, .pagina img", "crece");

    /* Textos y títulos de cada sección */
    agregarPiezas(".titulo-seccion, .pagina h1, .vitrina h1", "baja");
    agregarPiezas(".seccion h2, .grupo h2", "baja");
    agregarPiezas(".seccion .etiqueta, .grupo .bajada", "baja");
    agregarPiezas(".seccion p, .grupo p, .pagina p", "sube");
    agregarPiezas(".seccion h3, .pagina h3", "nace");

    /* Columnas, formularios y mapas */
    agregarPiezas(".dos-columnas > div", "der");
    agregarPiezas(".formulario", "izq");
    agregarPiezas(".datos", "der");
    agregarPiezas(".mapa, .mapa-grande", "crece");
    agregarPiezas(".redes-contacto", "sube");
    agregarPiezas(".boton", "nace");

    /* Carrusel y fichas de productos */
    agregarPiezas(".carrusel-marco, .carrusel", "sube");
    agregarPiezas(".carrusel-item", "sube");
    agregarPiezas(".ficha", "sube");
    agregarPiezas(".grupo", "sube");

    if (piezas.length > 0) {
        document.documentElement.classList.add("con-scroll");

        var observador = new IntersectionObserver(function (entradas) {
            for (var e = 0; e < entradas.length; e++) {
                if (entradas[e].isIntersecting) {
                    entradas[e].target.classList.add("visto");
                    observador.unobserve(entradas[e].target);
                }
            }
        }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

        for (var p = 0; p < piezas.length; p++) {
            var pieza = piezas[p];
            pieza.nodo.classList.add("entra", "m-" + pieza.tipo);

            /* En rejillas, cada pieza entra un poco después de la anterior */
            var grupo = pieza.nodo.parentElement;
            if (grupo && (grupo.classList.contains("fichas") || grupo.classList.contains("carrusel"))) {
                var orden = 0;
                var hijos = grupo.children;
                for (var h = 0; h < hijos.length; h++) {
                    if (hijos[h] === pieza.nodo) {
                        orden = h;
                        break;
                    }
                }
                pieza.nodo.style.animationDelay = ((orden % 4) * 0.12) + "s";
            }

            observador.observe(pieza.nodo);
        }
    }
}

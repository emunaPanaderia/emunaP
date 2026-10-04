/* La Emuna — script.js
   JavaScript puro, sin librerías.
   1. Menú en celular
   2. Mensaje por WhatsApp
   3. Animaciones distintas al bajar
   4. Fotos de la portada
   5. Carrusel de productos
   6. Fichas de productos que se voltean */

/* ---------- 1. Menú ---------- */

const botonMenu = document.querySelector(".menu-boton");
const nav = document.querySelector(".nav");

if (botonMenu && nav) {
    botonMenu.addEventListener("click", () => {
        const abierto = nav.classList.toggle("abierto");
        botonMenu.classList.toggle("abierto", abierto);
        botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
        botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });

    /* Al tocar un enlace, el menú se cierra. */
    nav.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", () => {
            nav.classList.remove("abierto");
            botonMenu.classList.remove("abierto");
            botonMenu.setAttribute("aria-expanded", "false");
            botonMenu.setAttribute("aria-label", "Abrir menú");
        });
    });
}

/* ---------- 2. Mensaje ----------
   No hay servidor: el formulario abre WhatsApp con el texto escrito. */

const formulario = document.querySelector("#formulario");

if (formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const datos = new FormData(formulario);
        const texto = [
            "Hola, les escribo desde la página.",
            "Nombre: " + datos.get("nombre"),
            "Teléfono: " + datos.get("telefono"),
            "Mensaje: " + datos.get("detalle")
        ].join("\n");
        const enlace = "https://wa.me/582760000000?text=" + encodeURIComponent(texto);
        window.open(enlace, "_blank", "noopener");
    });
}

/* ---------- 3. Al bajar ----------
   Cada bloque usa un movimiento distinto. Si no hay JS, el contenido se ve igual. */

const piezas = [];

document.querySelectorAll(".cat").forEach((tarjeta, i) => {
    piezas.push([tarjeta, ["sube", "crece", "nace", "baja"][i % 4]]);
});

document.querySelectorAll(".foto-redonda, .panadero, .foto-local").forEach((foto) => piezas.push([foto, "crece"]));
document.querySelectorAll(".dos-columnas > div").forEach((bloque) => piezas.push([bloque, "der"]));

document.querySelectorAll(".tarjeta").forEach((tarjeta, i) => {
    piezas.push([tarjeta, ["sube", "gira", "nace"][i % 3]]);
});

document.querySelectorAll(".ficha").forEach((ficha) => piezas.push([ficha, "sube"]));

document.querySelectorAll(".formulario").forEach((formularioPedido) => piezas.push([formularioPedido, "izq"]));
document.querySelectorAll(".datos").forEach((datos) => piezas.push([datos, "der"]));
document.querySelectorAll(".mapa-grande, .carrusel").forEach((bloque) => piezas.push([bloque, "sube"]));
document.querySelectorAll(".titulo-seccion").forEach((titulo) => piezas.push([titulo, "baja"]));

if (piezas.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("con-scroll");

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visto");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

    piezas.forEach(([nodo, tipo]) => {
        nodo.classList.add("entra", "m-" + tipo);
        const grupo = nodo.parentElement;
        if (grupo && (grupo.classList.contains("tarjetas") || grupo.classList.contains("categorias"))) {
            const orden = [...grupo.children].indexOf(nodo);
            nodo.style.animationDelay = (orden * 0.14) + "s";
        }
        /* En la cuadrícula de productos el retraso se repite por fila, para no esperar tanto. */
        if (grupo && grupo.classList.contains("fichas")) {
            const orden = [...grupo.children].indexOf(nodo);
            nodo.style.animationDelay = ((orden % 4) * 0.1) + "s";
        }
        observador.observe(nodo);
    });
}

/* ---------- 4. Portada ----------
   Cada 5 segundos pasa a la foto siguiente. Si el usuario pidió menos
   movimiento, se queda la primera. */

const fotosPortada = document.querySelectorAll(".hero-foto");

if (fotosPortada.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let actual = 0;
    setInterval(() => {
        fotosPortada[actual].classList.remove("activa");
        actual = (actual + 1) % fotosPortada.length;
        fotosPortada[actual].classList.add("activa");
    }, 5000);
}

/* ---------- 5. Carrusel ----------
   Las flechas avanzan una tarjeta. Al llegar al final vuelve al principio.
   Gira solo cada 3 segundos, salvo con el ratón o el foco encima. */

const carrusel = document.querySelector(".carrusel");

if (carrusel) {
    const pasoCarrusel = () => {
        const tarjeta = carrusel.querySelector(".carrusel-item");
        return tarjeta.offsetWidth + parseFloat(getComputedStyle(carrusel).columnGap);
    };

    /* Desliza hasta "destino" en 450 ms: arranca suave, acelera y frena suave.
       Mientras se mueve se apaga el imán (scroll-snap) para que no tironee,
       y las tarjetas se encogen un poco (clase "moviendo" en el CSS). */
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animacion = 0;

    const irA = (destino) => {
        const maximo = carrusel.scrollWidth - carrusel.clientWidth;
        destino = Math.max(0, Math.min(destino, maximo));

        if (sinMovimiento) {
            carrusel.scrollLeft = destino;
            return;
        }

        cancelAnimationFrame(animacion);
        const desde = carrusel.scrollLeft;
        const duracion = 450;
        const inicio = performance.now();
        carrusel.style.scrollSnapType = "none";
        carrusel.classList.add("moviendo");

        const paso = (ahora) => {
            const t = Math.min((ahora - inicio) / duracion, 1);
            const curva = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            carrusel.scrollLeft = desde + (destino - desde) * curva;
            if (t < 1) {
                animacion = requestAnimationFrame(paso);
            } else {
                carrusel.style.scrollSnapType = "";
                carrusel.classList.remove("moviendo");
            }
        };
        animacion = requestAnimationFrame(paso);
    };

    const moverCarrusel = (direccion) => {
        const alFinal = carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth - 4;
        const alInicio = carrusel.scrollLeft <= 4;

        if (direccion > 0 && alFinal) {
            irA(0);
        } else if (direccion < 0 && alInicio) {
            irA(carrusel.scrollWidth);
        } else {
            const actual = Math.round(carrusel.scrollLeft / pasoCarrusel());
            irA((actual + direccion) * pasoCarrusel());
        }
    };

    document.querySelectorAll(".carrusel-flecha").forEach((flecha) => {
        flecha.addEventListener("click", () => moverCarrusel(Number(flecha.dataset.dir)));
    });

    /* Un punto por cada posición a la que se puede llegar (cambia con el ancho de pantalla). */
    const puntos = document.querySelector(".carrusel-puntos");

    const marcarPunto = () => {
        const actual = Math.round(carrusel.scrollLeft / pasoCarrusel());
        puntos.querySelectorAll(".carrusel-punto").forEach((punto, i) => {
            punto.classList.toggle("activo", i === actual);
            if (i === actual) {
                punto.setAttribute("aria-current", "true");
            } else {
                punto.removeAttribute("aria-current");
            }
        });
    };

    const crearPuntos = () => {
        const cantidad = Math.round((carrusel.scrollWidth - carrusel.clientWidth) / pasoCarrusel()) + 1;
        puntos.innerHTML = "";
        for (let i = 0; i < cantidad; i++) {
            const punto = document.createElement("button");
            punto.type = "button";
            punto.className = "carrusel-punto";
            punto.setAttribute("aria-label", "Ir al producto " + (i + 1));
            punto.addEventListener("click", () => {
                irA(i * pasoCarrusel());
            });
            puntos.appendChild(punto);
        }
        marcarPunto();
    };

    if (puntos) {
        crearPuntos();
        carrusel.addEventListener("scroll", marcarPunto, { passive: true });
        window.addEventListener("resize", crearPuntos);
    }

    if (!sinMovimiento) {
        let enPausa = false;
        const zona = carrusel.closest(".contenedor");

        zona.addEventListener("pointerenter", () => { enPausa = true; });
        zona.addEventListener("pointerleave", () => { enPausa = false; });
        zona.addEventListener("focusin", () => { enPausa = true; });
        zona.addEventListener("focusout", () => { enPausa = false; });

        setInterval(() => {
            if (!enPausa && !document.hidden) {
                moverCarrusel(1);
            }
        }, 3000);
    }
}

/* ---------- 6. Fichas ----------
   Con el ratón se voltean solas (CSS). Con un clic, un toque o Enter quedan volteadas. */
document.querySelectorAll(".ficha").forEach((ficha) => {
    ficha.addEventListener("click", () => ficha.classList.toggle("volteada"));
    ficha.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            ficha.classList.toggle("volteada");
        }
    });
});

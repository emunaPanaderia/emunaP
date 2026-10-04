/* La Emuna — script.js
   JavaScript puro, sin librerías.
   1. Menú en celular
   2. Volteo de productos en el celular
   3. Pedido por WhatsApp
   4. Lista del tipo de pedido
   5. Animaciones distintas al bajar
   6. Fotos de la portada
   7. Carrusel de productos */

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

/* ---------- 2. Productos ----------
   En el celular no hay mouse: un toque voltea la tarjeta. */
document.querySelectorAll(".producto").forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
        if (window.matchMedia("(hover: none)").matches) {
            tarjeta.classList.toggle("volteado");
        }
    });
});

/* ---------- 3. Pedido ----------
   No hay servidor: el formulario abre WhatsApp con el texto del encargo. */

const formulario = document.querySelector("#formulario");

if (formulario) {
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const datos = new FormData(formulario);
        const texto = [
            "Hola, quiero encargar con tiempo.",
            "Nombre: " + datos.get("nombre"),
            "Teléfono: " + datos.get("telefono"),
            "Pedido: " + datos.get("tipo"),
            "Fecha: " + datos.get("fecha"),
            "Detalle: " + datos.get("detalle")
        ].join("\n");
        const enlace = "https://wa.me/582760000000?text=" + encodeURIComponent(texto);
        window.open(enlace, "_blank", "noopener");
    });
}

/* ---------- 4. Tipo de pedido ----------
   Abre una lista en crema y dorado, sin el menú azul del navegador. */

const elige = document.querySelector(".elige");

if (elige) {
    const boton = elige.querySelector(".elige-boton");
    const lista = elige.querySelector(".elige-lista");
    const valor = elige.querySelector(".elige-valor");
    const campo = elige.querySelector("input[name='tipo']");

    const cerrar = () => {
        lista.hidden = true;
        elige.classList.remove("abierto");
        boton.setAttribute("aria-expanded", "false");
    };

    boton.addEventListener("click", () => {
        const abrir = lista.hidden;
        lista.hidden = !abrir;
        elige.classList.toggle("abierto", abrir);
        boton.setAttribute("aria-expanded", abrir ? "true" : "false");
    });

    lista.querySelectorAll("[role='option']").forEach((opcion) => {
        opcion.addEventListener("click", () => {
            campo.value = opcion.dataset.valor;
            valor.textContent = opcion.textContent;
            lista.querySelectorAll("[role='option']").forEach((otra) => {
                otra.removeAttribute("aria-selected");
            });
            opcion.setAttribute("aria-selected", "true");
            cerrar();
        });
    });

    document.addEventListener("click", (evento) => {
        if (!elige.contains(evento.target)) {
            cerrar();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") {
            cerrar();
        }
    });
}

/* ---------- 5. Al bajar ----------
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

document.querySelectorAll(".producto").forEach((producto, i) => {
    piezas.push([producto, ["baja", "crece", "izq", "der", "gira", "nace", "sube"][i % 7]]);
});

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
        if (grupo && (grupo.classList.contains("tarjetas") || grupo.classList.contains("rejilla") || grupo.classList.contains("categorias"))) {
            const orden = [...grupo.children].indexOf(nodo);
            nodo.style.animationDelay = (orden * 0.14) + "s";
        }
        observador.observe(nodo);
    });
}

/* ---------- 6. Portada ----------
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

/* ---------- 7. Carrusel ----------
   Las flechas avanzan una tarjeta. Al llegar al final vuelve al principio.
   Gira solo cada 3 segundos, salvo con el ratón o el foco encima. */

const carrusel = document.querySelector(".carrusel");

if (carrusel) {
    const pasoCarrusel = () => {
        const tarjeta = carrusel.querySelector(".carrusel-item");
        return tarjeta.offsetWidth + parseFloat(getComputedStyle(carrusel).columnGap);
    };

    const moverCarrusel = (direccion) => {
        const alFinal = carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth - 4;
        const alInicio = carrusel.scrollLeft <= 4;

        if (direccion > 0 && alFinal) {
            carrusel.scrollTo({ left: 0, behavior: "smooth" });
        } else if (direccion < 0 && alInicio) {
            carrusel.scrollTo({ left: carrusel.scrollWidth, behavior: "smooth" });
        } else {
            carrusel.scrollBy({ left: direccion * pasoCarrusel(), behavior: "smooth" });
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
                carrusel.scrollTo({ left: i * pasoCarrusel(), behavior: "smooth" });
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

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

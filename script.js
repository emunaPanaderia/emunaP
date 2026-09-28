/* La Emuna — script.js
   JavaScript puro, sin librerías.
   1. Menú en celular
   2. Volteo de productos en el celular
   3. Pedido por WhatsApp
   4. Lista del tipo de pedido
   5. Animaciones distintas al bajar */

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

document.querySelectorAll(".cat").forEach((bloque, i) => {
    const pares = [
        ["izq", "der"],
        ["crece", "sube"],
        ["gira", "baja"],
        ["nace", "izq"]
    ];
    const par = pares[i % pares.length];
    const foto = bloque.querySelector("img");
    const texto = bloque.querySelector("div");
    if (foto) piezas.push([foto, par[0]]);
    if (texto) piezas.push([texto, par[1]]);
});

document.querySelectorAll(".foto-redonda").forEach((foto) => piezas.push([foto, "crece"]));
document.querySelectorAll(".dos-columnas > div").forEach((bloque) => piezas.push([bloque, "der"]));

document.querySelectorAll(".tarjeta").forEach((tarjeta, i) => {
    piezas.push([tarjeta, ["sube", "gira", "nace"][i % 3]]);
});

document.querySelectorAll(".producto").forEach((producto, i) => {
    piezas.push([producto, ["baja", "crece", "izq", "der", "gira", "nace", "sube"][i % 7]]);
});

document.querySelectorAll(".hilo li").forEach((paso, i) => {
    piezas.push([paso, ["izq", "crece", "der"][i % 3]]);
});

document.querySelectorAll(".hilo-cierre").forEach((cierre) => piezas.push([cierre, "nace"]));
document.querySelectorAll(".formulario").forEach((formularioPedido) => piezas.push([formularioPedido, "izq"]));
document.querySelectorAll(".datos").forEach((datos) => piezas.push([datos, "der"]));
document.querySelectorAll(".mapa-grande").forEach((mapa) => piezas.push([mapa, "sube"]));
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
        if (grupo && (grupo.classList.contains("tarjetas") || grupo.classList.contains("rejilla") || grupo.classList.contains("hilo"))) {
            const orden = [...grupo.children].indexOf(nodo);
            nodo.style.animationDelay = (orden * 0.14) + "s";
        }
        observador.observe(nodo);
    });
}

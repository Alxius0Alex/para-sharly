/* =========================================
   CONFIGURACIÓN
========================================= */

/*
   IMPORTANTE:
   JavaScript cuenta los meses desde 0.

   Enero = 0
   Febrero = 1
   Marzo = 2
   Abril = 3
   Mayo = 4
   Junio = 5
   Julio = 6
   Agosto = 7
   Septiembre = 8
   Octubre = 9
   Noviembre = 10
   Diciembre = 11

   EJEMPLO:
   15 de agosto de 2025:
   new Date(2025, 7, 15, 0, 0, 0)
*/

// ⬇️ CAMBIA ESTA FECHA POR LA FECHA REAL
const fechaInicio = new Date(2024, 5, 25, 0, 0, 0);


/* =========================================
   ELEMENTOS DE LA PÁGINA
========================================= */

const btnAbrir = document.getElementById("btnAbrir");
const inicio = document.getElementById("inicio");
const contenido = document.getElementById("contenido");

const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");

const sobreCarta = document.getElementById("sobre");
const botonCarta = document.getElementById("btnCarta");

const btnMensaje = document.getElementById("btnMensaje");
const mensaje = document.getElementById("mensaje");

const btnSorpresa = document.getElementById("btnSorpresa");
const sorpresaTexto = document.getElementById("sorpresaTexto");


/* =========================================
   VERIFICAR FECHA
========================================= */

if (isNaN(fechaInicio.getTime())) {

    console.error("La fecha de inicio no es válida.");

}


/* =========================================
   ENTRAR A LA PÁGINA
========================================= */

if (btnAbrir) {

    btnAbrir.addEventListener("click", async () => {

        /*
           Reiniciar la canción desde el comienzo.
        */

        if (musica) {

            musica.currentTime = 0;

            try {

                await musica.play();

                if (btnMusica) {
                    btnMusica.textContent = "⏸";
                }

                const reproductor =
                    document.querySelector(".reproductor");

                if (reproductor) {
                    reproductor.classList.add("reproduciendo");
                }

            } catch (error) {

                console.log(
                    "El navegador bloqueó la reproducción automática."
                );

            }

        }


        /*
           Ocultar pantalla inicial.
        */

        if (inicio) {

            inicio.style.opacity = "0";

            setTimeout(() => {

                inicio.style.display = "none";

                if (contenido) {
                    contenido.classList.remove("oculto");
                }

                crearCorazones();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 800);

        }

    });

}


/* =========================================
   REPRODUCTOR DE MÚSICA
========================================= */

if (btnMusica && musica) {

    btnMusica.addEventListener("click", async () => {

        if (musica.paused) {

            try {

                await musica.play();

                btnMusica.textContent = "⏸";

                const reproductor =
                    document.querySelector(".reproductor");

                if (reproductor) {
                    reproductor.classList.add("reproduciendo");
                }

            } catch (error) {

                console.log(
                    "No se pudo reproducir la música."
                );

            }

        } else {

            musica.pause();

            btnMusica.textContent = "▶";

            const reproductor =
                document.querySelector(".reproductor");

            if (reproductor) {
                reproductor.classList.remove("reproduciendo");
            }

        }

    });


    musica.addEventListener("play", () => {

        btnMusica.textContent = "⏸";

        const reproductor =
            document.querySelector(".reproductor");

        if (reproductor) {
            reproductor.classList.add("reproduciendo");
        }

    });


    musica.addEventListener("pause", () => {

        btnMusica.textContent = "▶";

        const reproductor =
            document.querySelector(".reproductor");

        if (reproductor) {
            reproductor.classList.remove("reproduciendo");
        }

    });

}


/* =========================================
   CONTADOR DE TIEMPO
========================================= */

function actualizarContador() {

    const ahora = new Date();

    const diferencia =
        ahora.getTime() - fechaInicio.getTime();


    /*
       Si la fecha no es válida,
       mostrar ceros en lugar de NaN.
    */

    if (
        isNaN(fechaInicio.getTime()) ||
        isNaN(diferencia) ||
        diferencia < 0
    ) {

        document.getElementById("dias").textContent = "0";

        document.getElementById("horas").textContent = "00";

        document.getElementById("minutos").textContent = "00";

        document.getElementById("segundos").textContent = "00";

        return;
    }


    /*
       Convertir la diferencia
       de milisegundos a segundos.
    */

    const segundosTotales =
        Math.floor(diferencia / 1000);


    /*
       DÍAS
    */

    const dias =
        Math.floor(
            segundosTotales / 86400
        );


    /*
       HORAS
    */

    const horas =
        Math.floor(
            (segundosTotales % 86400) / 3600
        );


    /*
       MINUTOS
    */

    const minutos =
        Math.floor(
            (segundosTotales % 3600) / 60
        );


    /*
       SEGUNDOS
    */

    const segundos =
        segundosTotales % 60;


    /*
       Mostrar resultados.
    */

    document.getElementById("dias").textContent =
        dias;


    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");


    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");


    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");

}


/*
   Ejecutar inmediatamente.
*/

actualizarContador();


/*
   Actualizar cada segundo.
*/

setInterval(
    actualizarContador,
    1000
);


/* =========================================
   CARTA
========================================= */

if (botonCarta && sobreCarta) {

    botonCarta.addEventListener("click", () => {

        sobreCarta.classList.toggle("abierto");


        if (
            sobreCarta.classList.contains("abierto")
        ) {

            botonCarta.textContent =
                "💌 Cerrar carta";

        } else {

            botonCarta.textContent =
                "💌 Abrir carta";

        }

    });

}


/* =========================================
   MENSAJES ALEATORIOS
========================================= */

const mensajes = [

    "Hay recuerdos que simplemente merecen quedarse para siempre. ❤️",

    "A veces un pequeño detalle puede convertirse en un gran recuerdo. ✨",

    "Que nunca falten motivos para sonreír. ❤️",

    "Los momentos simples también pueden ser los más especiales.",

    "Algunas personas hacen que determinados días sean inolvidables. 🌷",

    "Siempre habrá un nuevo recuerdo esperando ser creado. ✨",

    "Una historia se construye con pequeños momentos. ❤️",

    "Cada recuerdo puede convertirse en una pequeña parte de una gran historia. 💕"

];


if (btnMensaje && mensaje) {

    btnMensaje.addEventListener("click", () => {

        const posicion =
            Math.floor(
                Math.random() *
                mensajes.length
            );


        mensaje.style.opacity = "0";


        setTimeout(() => {

            mensaje.textContent =
                mensajes[posicion];

            mensaje.style.opacity = "1";

        }, 200);

    });

}


/* =========================================
   SORPRESA
========================================= */

if (btnSorpresa && sorpresaTexto) {

    btnSorpresa.addEventListener("click", () => {

        sorpresaTexto.classList.remove("oculto");

        btnSorpresa.style.display = "none";

        crearCorazones();


        setTimeout(() => {

            sorpresaTexto.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 200);

    });

}


/* =========================================
   CREAR CORAZONES FLOTANTES
========================================= */

function crearCorazones() {

    const contenedor =
        document.getElementById("corazones");


    if (!contenedor) {
        return;
    }


    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            const corazon =
                document.createElement("div");


            corazon.className =
                "corazon-flotante";


            const corazonesDisponibles = [
                "❤️",
                "💗",
                "💖",
                "💕",
                "💓"
            ];


            corazon.textContent =
                corazonesDisponibles[
                    Math.floor(
                        Math.random() *
                        corazonesDisponibles.length
                    )
                ];


            corazon.style.left =
                Math.random() * 100 + "%";


            corazon.style.fontSize =
                (12 + Math.random() * 20) + "px";


            corazon.style.animationDuration =
                (4 + Math.random() * 4) + "s";


            contenedor.appendChild(corazon);


            setTimeout(() => {

                corazon.remove();

            }, 9000);

        }, i * 250);

    }

}


/* =========================================
   CORAZÓN AL TOCAR LA PANTALLA
========================================= */

document.addEventListener("click", (evento) => {

    /*
       No crear corazones adicionales
       cuando se presionan botones o enlaces.
    */

    if (
        evento.target.tagName === "BUTTON" ||
        evento.target.tagName === "A"
    ) {

        return;

    }


    const contenedor =
        document.getElementById("corazones");


    if (!contenedor) {
        return;
    }


    const corazon =
        document.createElement("div");


    corazon.className =
        "corazon-flotante";


    corazon.textContent =
        "❤️";


    corazon.style.left =
        evento.clientX + "px";


    corazon.style.bottom =
        (
            window.innerHeight -
            evento.clientY
        ) + "px";


    corazon.style.fontSize =
        "20px";


    contenedor.appendChild(corazon);


    setTimeout(() => {

        corazon.remove();

    }, 5000);

});


/* =========================================
   CORAZONES AUTOMÁTICOS
========================================= */

setInterval(() => {

    if (
        contenido &&
        !contenido.classList.contains("oculto")
    ) {

        crearCorazones();

    }

}, 15000);
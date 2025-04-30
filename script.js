 class Pregunta { // Clase que define las preguntas del cuestionario
    constructor(pregunta, respuestaCorrecta, posiblesRespuestas, puntos) {
        this.pregunta = pregunta;
        this.respuestaCorrecta = respuestaCorrecta;
        this.posiblesRespuestas = posiblesRespuestas;
        this.puntos = puntos;
    }
    compararRespuesta(respuestaUsuario) {
        return this.respuestaCorrecta === respuestaUsuario;
    }
}
// ─ Alta (2 pts c/u) ─────────────────────────────
const pregunta2 = new Pregunta(
  "¿Que es HTML?",
  "Lenguaje de Marcado de Hipertexto",
  [
    "Lenguaje de Marcado de Programas",
    "Lenguaje de Marcado de Hipertexto",
    "El lenguaje que usan los navegadores para solicitar cosas a servidores remotos"
  ],
  2
);

const pregunta5 = new Pregunta(
  "¿Cuál es la constante que aproxima 3,14159…?",
  "π (pi)",
  ["e", "φ", "π (pi)", "i"],
  2
);

// ─ Media (1 pt c/u) ─────────────────────────────
const pregunta1 = new Pregunta(
  "¿Cual es la capital de Inglaterra?",
  "Londres",
  ["Madrid", "Oslo", "Londres"],
  1
);

const pregunta3 = new Pregunta(
  "¿Cual de estos numeros es irracional?",
  "e",
  ["e", "2/3", "10"],
  1
);

const pregunta8 = new Pregunta(
  "¿Cómo se llama la sucesión 1, 1, 2, 3, 5, 8, …?",
  "Fibonacci",
  ["Aritmética", "Geométrica", "Harmónica", "Fibonacci"],
  1
);

const pregunta9 = new Pregunta(
  "¿Cuál es la base numérica más utilizada en informática?",
  "Binario",
  ["Decimal", "Binario", "Hexadecimal", "Octal"],
  1
);

// ─ Baja (0.5 pt c/u) ────────────────────────────
const pregunta4 = new Pregunta(
  "¿Que es Programar?",
  "Darle instrucciones al ordenador de manera logica usando herramientas como lenguajes de programacion",
  [
    "Lo que no hace una pizarra",
    "Una cosa rara de informaticos",
    "Darle instrucciones al ordenador de manera logica usando herramientas como lenguajes de programacion"
  ],
  0.5
);

const pregunta7 = new Pregunta(
  "¿Qué parte del ordenador se llama memoria de acceso aleatorio?",
  "RAM",
  ["RAM", "CPU", "GPU", "SSD"],
  0.5
);

const pregunta10 = new Pregunta(
  "¿Qué navegador web es desarrollado por Google?",
  "Chrome",
  ["Edge", "Safari", "Firefox", "Chrome"],
  0.5
);

// ─ Bonus (0.5 pt) ───────────────────────────────
const preguntaCSS = new Pregunta(
  "¿Que es CSS?",
  "Satanas encarnado y una forma de estilizar aplicaciones y webs",
  [
    "Satanas encarnado",
    "Una forma de estilizar aplicaciones y webs",
    "Una forma de estilizar el ordenador",
    "Satanas encarnado y una forma de estilizar aplicaciones y webs"
  ],
  0.5
);

// ─ Array final ──────────────────────────────────
let preguntas = [
  pregunta1,  // 1 pt
  pregunta2,  // 2 pt
  pregunta3,  // 1 pt
  pregunta4,  // 0.5 pt
  pregunta5,  // 2 pt
  pregunta7,  // 0.5 pt
  pregunta8,  // 1 pt
  pregunta9,  // 1 pt
  pregunta10, // 0.5 pt
  preguntaCSS // 0.5 pt  (bonus)
];

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generarMensajeFinal(puntos) {
  if (puntos > 8) {
    return "Tienes unos conocimientos sobresalientes"
  } else if (puntos >= 7) {
    return "Tienes unos conocimientos notables"
  } else if (puntos > 5) {
    return "Tienes unos conocimientos aprobatorios"
  } else if (puntos == 5) {
    return "Tienes unos conocimientos suficientes"
  } else {
    return "Has suspendido"
  }
}


function animarImagen() {
  imgFeedback.style.display = "block"
  anime.timeline({ autoplay: true }) // Establezco un conjunto de animaciones que se llevaran a cabo
    .add({
      targets: imgFeedback,
      opacity: [0, 0.5, 1],
      scale: [1, 1.5],
      duration: 900,
      easing: 'easeOutCubic'
    }) // Animacion de aparicion, muestra la aparicion del elemento
    .add({
      duration: 200    // solo tiempo, sin cambiar propiedades para que el elemento este ahi un ratito corto que al menos permita verlo
    })
    .add({
      targets: imgFeedback,
      scale: [1.5, 1],
      opacity: [1, 0.5, 0],
      duration: 600,
      easing: 'easeOutExpo'
    }); // Desaparicion del elemento
}

function mostrarPregunta() {
  imgFeedback.style.display = "none" // Al comienzo eliminamos el elemento para que no interfiera cuando hagamos click en las preguntas
  if (i >= preguntas.length) {
    pregunta.textContent = generarMensajeFinal(puntos); // Generacion del mensaje final usando los puntos que se hayan obtenido
    opciones.innerHTML = '<button id="irInicio"><i class="fa-solid fa-house"></i> Pantalla de Inicio</button><br><button id="reset"><i class="fa-solid fa-repeat"></i> Volver a jugar</button>' // generamos el boton de reset para poder volver a empezar el juego si así lo necesitamos
      document.getElementById("irInicio").addEventListener("click",function() {
	  document.getElementById("pantalla-incial").style.display = "block"
	  document.getElementById('pantalla-juego').style.display = "none"
    })
    document.getElementById("reset").addEventListener("click", function () { // Hacemos el reset
      i = 0 // Seteamos i a 0 otra vez
      puntos = 0 // Colocamos la puntuacion a 0
      preguntas = shuffleArray(preguntas) // Rebarajamos el Array
      mostrarPregunta() // Volvemos a ejecutar esta funcion para empezar otra vez
    })
  }
  let p = preguntas[i]
  pregunta.textContent = p.pregunta;
  opciones.innerHTML = anadirPosiblesRespuestas(p.posiblesRespuestas)
  puntosCon.innerHTML = "Puntos: " + puntos
  let selrespuesta = document.getElementById("selrespuesta");
  selrespuesta.addEventListener("change", function () {
    let respuestaUsuario = this.value;
    if (p.compararRespuesta(respuestaUsuario)) {
      puntos += p.puntos;
      puntosCon.innerHTML = "Puntos: " + puntos;
      imgFeedback.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSIyNDBweCIgaGVpZ2h0PSIyNDBweCI+PHBhdGggZmlsbD0iIzRjYWY1MCIgZD0iTTQ0LDI0YzAsMTEuMDQ1LTguOTU1LDIwLTIwLDIwUzQsMzUuMDQ1LDQsMjRTMTIuOTU1LDQsMjQsNFM0NCwxMi45NTUsNDQsMjR6Ii8+PHBhdGggZmlsbD0iI2NjZmY5MCIgZD0iTTM0LjYwMiwxNC42MDJMMjEsMjguMTk5bC01LjYwMi01LjU5OGwtMi43OTcsMi43OTdMMjEsMzMuODAxbDE2LjM5OC0xNi40MDJMMzQuNjAyLDE0LjYwMnoiLz48L3N2Zz4="
    } else {
      imgFeedback.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSIyNDBweCIgaGVpZ2h0PSIyNDBweCI+PHBhdGggZmlsbD0iI2Y0NDMzNiIgZD0iTTQ0LDI0YzAsMTEuMDQ1LTguOTU1LDIwLTIwLDIwUzQsMzUuMDQ1LDQsMjRTMTIuOTU1LDQsMjQsNFM0NCwxMi45NTUsNDQsMjR6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI5LjY1NiwxNS41MTZsMi44MjgsMi44MjhsLTE0LjE0LDE0LjE0bC0yLjgyOC0yLjgyOEwyOS42NTYsMTUuNTE2eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zMi40ODQsMjkuNjU2bC0yLjgyOCwyLjgyOGwtMTQuMTQtMTQuMTRsMi44MjgtMi44MjhMMzIuNDg0LDI5LjY1NnoiLz48L3N2Zz4="
    }
    animarImagen()
    setTimeout(() => {
      i++;
      mostrarPregunta(); // Ejecutamos mostrarPregunta 
    }, 1700); // Espera 1.7 segundos antes de pasar, pensando ponerlo a 1.5
  })
}

function anadirPosiblesRespuestas(posiblesRespuestas) {
  posiblesRespuestas = shuffleArray(posiblesRespuestas) // Barajamos las respuestas para que no esten siempre en el mismo orden
  let finalRespuesta = '<select name="opcion_respuesta" id="selrespuesta">'
  finalRespuesta += '<option disabled selected value=""> Elige una opción</option>';
  for (let respuesta of posiblesRespuestas) {
    finalRespuesta += `<option value="${respuesta}">${respuesta}</option>`
  }
  finalRespuesta = finalRespuesta + "</select>"
  return finalRespuesta
}

let imgFeedback = document.getElementById("feedback-img"); // La imagen que indica si hemos acertado o no
let pregunta = document.getElementById("pregunta")
let opciones = document.getElementById("opciones")
let puntos; // Puntos
let i; // Variable que representa el indice de la lista sobre la que vamos a hacer
let puntosCon = document.getElementById("puntos")

document.getElementById("start").addEventListener("click",function() {
  document.getElementById("pantalla-incial").style.display = "none"
  document.getElementById('pantalla-juego').style.display = "flex"
  preguntas = shuffleArray(preguntas) // Usando la funcion shuffleArray para organizar el Array de forma aleatoria y que las preguntas sean esas
  puntos = 0 // Los puntos en el juego
  i = 0
  mostrarPregunta()
})

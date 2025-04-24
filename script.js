class Pregunta {
  constructor(pregunta, respuestaCorrecta, posiblesRespuestas, puntos) {
    this.pregunta = pregunta
    this.respuestaCorrecta = respuestaCorrecta
    this.posiblesRespuestas = posiblesRespuestas
    this.puntos = puntos
  }
  compararRespuesta(respuestaUsuario) {
    return this.respuestaCorrecta == respuestaUsuario
  }
}
// ─ Alta (2 pts c/u) ─────────────────────────────
const pregunta2 = new Pregunta(
  "¿Que es HTML?",
  2,
  [
    "Lenguaje de Marcado de Programas",
    "Lenguaje de Marcado de Hipertexto",
    "El lenguaje que usan los navegadores para solicitar cosas a servidores remotos"
  ],
  2
);

const pregunta5 = new Pregunta(
  "¿Cuál es la constante que aproxima 3,14159…?",
  3,
  ["e", "φ", "π (pi)", "i"],
  2
);

// ─ Media (1 pt c/u) ─────────────────────────────
const pregunta1 = new Pregunta(
  "¿Cual es la capital de Inglaterra?",
  3,
  ["Madrid", "Oslo", "Londres"],
  1
);

const pregunta3 = new Pregunta(
  "¿Cual de estos numeros es irracional?",
  1,
  ["e", "2/3", "10"],
  1
);

const pregunta8 = new Pregunta(
  "¿Cómo se llama la sucesión 1, 1, 2, 3, 5, 8, …?",
  4,
  ["Aritmética", "Geométrica", "Harmónica", "Fibonacci"],
  1
);

const pregunta9 = new Pregunta(
  "¿Cuál es la base numérica más utilizada en informática?",
  2,
  ["Decimal", "Binario", "Hexadecimal", "Octal"],
  1
);

// ─ Baja (0.5 pt c/u) ────────────────────────────
const pregunta4 = new Pregunta(
  "¿Que es Programar?",
  3,
  [
    "Lo que no hace una pizarra",
    "Una cosa rara de informaticos",
    "Darle instrucciones al ordenador de manera logica usando herramientas como lenguajes de programacion"
  ],
  0.5
);

const pregunta7 = new Pregunta(
  "¿Qué parte del ordenador se llama memoria de acceso aleatorio?",
  1,
  ["RAM", "CPU", "GPU", "SSD"],
  0.5
);

const pregunta10 = new Pregunta(
  "¿Qué navegador web es desarrollado por Google?",
  4,
  ["Edge", "Safari", "Firefox", "Chrome"],
  0.5
);

// ─ Bonus (0.5 pt) ───────────────────────────────
const preguntaCSS = new Pregunta(
  "¿Que es CSS?",
  4,
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
preguntas = shuffleArray(preguntas)
console.log(preguntas)
let puntos = 0
let imgFeedback = document.getElementById("feedback-img");

let pregunta = document.getElementById("pregunta")
let opciones = document.getElementById("opciones")

let puntosCon = document.getElementById("puntos")
puntosCon.innerHTML = "Puntos: " + puntos;

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
let i = 0;

function animarImagen() {
  anime.set(imgFeedback, { scale: 1, opacity: 1 });
  anime.timeline({ autoplay: true })
    .add({
      targets: imgFeedback,
      scale: [1, 1.5],
      duration: 900,
      easing: 'easeOutCubic'
    })
    .add({
      duration: 200    // solo tiempo, sin cambiar propiedades
    })
    .add({
      targets: imgFeedback,
      scale: [1.5, 1],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutExpo'
    });

}
function mostrarPregunta() {
  imgFeedback.style.opacity = 0
  if (i >= preguntas.length) {
    pregunta.textContent = generarMensajeFinal(puntos);
    opciones.innerHTML = '<input type="button" value=" Resetear" id="reset"></input>'
    document.getElementById("reset").addEventListener("click", function () {
      i = 0
      puntos = 0
      preguntas = shuffleArray(preguntas)
      mostrarPregunta()
    })
    return;
  }
  let p = preguntas[i]
  pregunta.textContent = p.pregunta;
  opciones.innerHTML = anadirPosiblesRespuestas(p.posiblesRespuestas)
  puntosCon.innerHTML = "Puntos: " + puntos
  let selrespuesta = document.getElementById("selrespuesta");
  selrespuesta.addEventListener("change", function () {
    let respuestaUsuario = parseInt(this.value);
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
      mostrarPregunta();
    }, 1700); // Espera 1.5 segundos antes de pasar
  });
}

function anadirPosiblesRespuestas(posiblesRespuestas) {
  let finalRespuesta = '<select name="opcion_respuesta" id="selrespuesta">'
  finalRespuesta += '<option disabled selected value="">Elige una opción</option>';
  for (let i = 0; i < posiblesRespuestas.length; i++) {
    finalRespuesta = finalRespuesta + `<option value="${i + 1}">${posiblesRespuestas[i]}</option>`
  }
  finalRespuesta = finalRespuesta + "</select>"
  return finalRespuesta
}
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

mostrarPregunta()

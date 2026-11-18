const preguntas = [
  {
    titulo: "¿Qué fracción representa 0.75?",
    enunciado: ["Convierte el número decimal a una fracción irreducible.", "Recuerda que 0.75 = 75/100."],
  },
  {
    titulo: "¿Cuál es el resultado de 1/2 + 1/4?",
    enunciado: ["Suma las fracciones usando un denominador común.", "Observa que 1/2 = 2/4."],
  },
  {
    titulo: "¿Qué decimal equivale a 3/5?",
    enunciado: ["Divide el numerador entre el denominador.", "Expresa el resultado con dos cifras decimales."],
  },
  {
    titulo: "¿Qué fracción del depósito queda finalmente llena?",
    enunciado: ["Un depósito contiene 3/5 de su capacidad.", "Se extrae 0.25 del volumen total y después se vierten 150 litros, equivalentes a 1/10 de la capacidad."],
  },
  {
    titulo: "¿Cuál es el resultado de 2/3 − 1/6?",
    enunciado: ["Busca el mínimo común múltiplo de los denominadores.", "Después resta los numeradores equivalentes."],
  },
  {
    titulo: "¿Qué fracción es mayor: 4/7 o 3/5?",
    enunciado: ["Compara mediante productos cruzados.", "Multiplica cada numerador por el denominador contrario."],
  },
  {
    titulo: "¿Cuál es el resultado de 3/4 × 2/5?",
    enunciado: ["Multiplica numeradores entre sí y denominadores entre sí.", "Simplifica la fracción obtenida."],
  },
  {
    titulo: "¿Qué fracción generatriz representa 0.333…?",
    enunciado: ["Es un decimal periódico puro.", "Usa el período como numerador y nueves como denominador."],
  },
  {
    titulo: "¿Cuál es el resultado de 5/6 ÷ 2/3?",
    enunciado: ["Conserva la primera fracción.", "Multiplica por el inverso de la segunda."],
  },
  {
    titulo: "¿Qué fracción del total representa 0.2?",
    enunciado: ["Escribe el decimal como décimos.", "Comprueba si la fracción se puede simplificar."],
  },
];

const respuestasGuardadas = new Set([1, 2, 3]);
let preguntaActual = 4;

const $ = (selector) => document.querySelector(selector);
const botonesPregunta = [...document.querySelectorAll("[data-question]")];

function actualizarProgreso() {
  const respondidas = respuestasGuardadas.size;
  $(".panel-titulo strong").textContent = `${respondidas}/10`;
  $(".progreso-barra span").style.width = `${respondidas * 10}%`;
  $(".progreso-barra").setAttribute("aria-label", `${respondidas * 10}% completado`);
}

function cargarPregunta(numero) {
  preguntaActual = numero;
  const pregunta = preguntas[numero - 1];
  $("#pregunta-contador").textContent = `Pregunta ${numero} de 10`;
  $("#pregunta-titulo").textContent = pregunta.titulo;
  $("#enunciado").innerHTML = pregunta.enunciado
    .map((texto) => `<p>${texto}</p>`)
    .join("");

  botonesPregunta.forEach((boton) => {
    const esActual = Number(boton.dataset.question) === numero;
    boton.classList.toggle("actual", esActual);
    boton.classList.toggle("hecha", respuestasGuardadas.has(Number(boton.dataset.question)));
    boton.toggleAttribute("aria-current", esActual);
  });

  document.querySelectorAll('input[name="respuesta"]').forEach((input) => {
    input.checked = false;
  });
  $("#notas").value = "";
  actualizarProgreso();
}

function guardarYContinuar() {
  respuestasGuardadas.add(preguntaActual);
  const siguiente = Math.min(preguntaActual + 1, preguntas.length);
  cargarPregunta(siguiente);
}

botonesPregunta.forEach((boton) => {
  boton.addEventListener("click", () => cargarPregunta(Number(boton.dataset.question)));
});

$("#anterior").addEventListener("click", () => {
  cargarPregunta(Math.max(1, preguntaActual - 1));
});

$("#siguiente").addEventListener("click", guardarYContinuar);

document.querySelectorAll('input[name="respuesta"]').forEach((input) => {
  input.addEventListener("change", () => {
    respuestasGuardadas.add(preguntaActual);
    actualizarProgreso();
    botonesPregunta.forEach((boton) => {
      if (Number(boton.dataset.question) === preguntaActual) {
        boton.classList.add("hecha");
      }
    });
  });
});

actualizarProgreso();

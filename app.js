// ==========================================
// 1. ARRAY DE OBJETOS (8 Sensores IoT) - Requisito Obligatorio
// ==========================================
const sensores = [
  { id: 1, nombre: "Sensor de lluvia", tipo: "ambiental", piso: 1, estado: "activo", valor: 72, unidad: "%" },
  { id: 2, nombre: "Sensor de humedad", tipo: "ambiental", piso: 1, estado: "activo", valor: 65, unidad: "%" },
  { id: 3, nombre: "Panel solar", tipo: "energia", piso: 2, estado: "activo", valor: 850, unidad: "W" },
  { id: 4, nombre: "Medidor de agua", tipo: "agua", piso: 2, estado: "activo", valor: 120, unidad: "L" },
  { id: 5, nombre: "Sensor de movimiento", tipo: "seguridad", piso: 3, estado: "activo", valor: 1, unidad: "det." },
  { id: 6, nombre: "Cámara de seguridad", tipo: "seguridad", piso: 3, estado: "activo", valor: 98, unidad: "%" },
  { id: 7, nombre: "Alarma", tipo: "seguridad", piso: 4, estado: "inactivo", valor: 0, unidad: "ev." },
  { id: 8, nombre: "Bomba de agua", tipo: "agua", piso: 4, estado: "activo", valor: 45, unidad: "%" }
];

// ==========================================
// 2. MOSTRAR SENSORES DINÁMICAMENTE (Ciclos DOM)
// ==========================================
const listaSensores = document.querySelector("#listaSensores");

function mostrarSensores(lista) {
  if (!listaSensores) return;
  listaSensores.innerHTML = "";
  
  lista.forEach(function(sensor) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("sensor-card");
    tarjeta.innerHTML = `
      <div class="sensor-top">
        <span class="sensor-icon">${sensor.unidad}</span>
        <span class="sensor-state">${sensor.estado}</span>
      </div>
      <h3>${sensor.nombre}</h3>
      <strong class="sensor-value">${sensor.valor} <small>${sensor.unidad}</small></strong>
      <small>Piso: ${sensor.piso} · Tipo: ${sensor.tipo}</small>
    `;
    listaSensores.appendChild(tarjeta);
  });
}

// Cargar todos los sensores al inicio
mostrarSensores(sensores);

// ==========================================
// 3. SELECCIÓN DE PISOS & EFECTO POP-UP 3D (Event Delegation)
// ==========================================
const controlesPisos = document.querySelector("#controles-pisos");

function activarPopUp(numeroPiso) {
  document.querySelectorAll(".piso").forEach(function(el) {
    el.classList.remove("expandido");
    if (Number(el.dataset.piso) === numeroPiso) {
      el.classList.add("expandido");
    }
  });
}

if (controlesPisos) {
  controlesPisos.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      const pisoSeleccionado = Number(event.target.dataset.piso);
      
      // Filtrar sensores con array.filter
      const sensoresFiltrados = sensores.filter(s => s.piso === pisoSeleccionado);
      mostrarSensores(sensoresFiltrados);
      
      // Aplicar 3D
      activarPopUp(pisoSeleccionado);
      mostrarEstado(`Piso ${pisoSeleccionado} seleccionado`);
    }
  });
}

// ==========================================
// 4. VALIDACIÓN DE FORMULARIO (Integrante 1)
// ==========================================
const formulario = document.querySelector("#formCholet");
const mensajeFormulario = document.querySelector("#mensajeFormulario");

if (formulario) {
  formulario.addEventListener("submit", function(event) {
    event.preventDefault();
    const nombre = document.querySelector("#nombre").value.trim();
    const email = document.querySelector("#email").value.trim();
    const nombreCholet = document.querySelector("#nombreCholet").value.trim();
    const descripcion = document.querySelector("#descripcion").value.trim();

    if (nombre.length < 3) {
      mensajeFormulario.textContent = "El nombre debe tener al menos 3 caracteres.";
      return;
    }
    if (!email.includes("@")) {
      mensajeFormulario.textContent = "Ingrese un correo válido.";
      return;
    }
    if (nombreCholet.length < 3) {
      mensajeFormulario.textContent = "El nombre del cholet es demasiado corto.";
      return;
    }
    if (descripcion.length < 10) {
      mensajeFormulario.textContent = "La descripción debe tener al menos 10 caracteres.";
      return;
    }

    mensajeFormulario.textContent = "¡Cholet registrado correctamente!";
  });
}

function mostrarEstado(mensaje) {
  const estado = document.querySelector("#estadoSistema");
  if (estado) estado.textContent = mensaje;
}

// ==========================================
// 5. CONTROL MULTIMEDIA (Integrante 3)
// ==========================================
// PASO 1: Obtener las referencias a los elementos <video> y <audio>
// del DOM para poder llamar a sus métodos nativos (play, pause, muted).
const video = document.querySelector("#videoCholet");
const audio = document.querySelector("#audioCholet");

// PASO 2: Video - boton REPRODUCIR
// El metodo play() inicia la reproduccion del video (retorna una
// promesa; se encadena .catch para evitar errores en consola si falla).
document.querySelector("#btnPlayVideo")?.addEventListener("click", () => {
  video?.play().catch(() => {});
});

// PASO 3: Video - boton PAUSAR
// El metodo pause() detiene la reproduccion conservando el fotograma actual.
document.querySelector("#btnPauseVideo")?.addEventListener("click", () => {
  video?.pause();
});

// PASO 4: Video - boton SILENCIAR / REACTIVAR SONIDO
// la propiedad muted alterna entre true/false para silenciar el video.
// Se comprueba video?.muted antes para actualizar correctamente el valor.
document.querySelector("#btnMuteVideo")?.addEventListener("click", () => {
  if (video) video.muted = !video.muted;
});

// PASO 5: Audio - boton REPRODUCIR
// play() tambien inicia el audio de fondo (multimedia/ambiente.mp3).
document.querySelector("#btnPlayAudio")?.addEventListener("click", () => {
  audio?.play().catch(() => {});
});

// PASO 6: Audio - boton PAUSAR
// pause() detiene el audio manteniendo su posicion actual.
document.querySelector("#btnPauseAudio")?.addEventListener("click", () => {
  audio?.pause();
});

// PASO 7: Audio - boton SILENCIAR / REACTIVAR SONIDO
// muted alterna el sonido del audio de la misma forma que el video.
document.querySelector("#btnMuteAudio")?.addEventListener("click", () => {
  if (audio) audio.muted = !audio.muted;
});

// ==========================================
// 5.1 GALERIA DE IMAGENES (CARRUSEL) - Integrante 3
// ==========================================
// PASO 8: Guardar las 5 imagenes de los cholets en un array para
// poder recorrerlas con un indice que cambia al pulsar los botones.
const imagenesCholets = [
  "multimedia/imagen 1.jpeg",
  "multimedia/imagen 2.jpeg",
  "multimedia/imagen 3.jpeg",
  "multimedia/imagen 4.jpeg",
  "multimedia/imagen 5.jpeg"
];

// PASO 9: indiceActual indica cual imagen (0..4) se esta mostrando.
let indiceActual = 0;
const imagenCholet = document.querySelector("#imagenCholet");
const pieImagen = document.querySelector("#pieImagen");

// PASO 10: Funcion que actualiza el atributo src de la <img> y el
// pie de foto (figcaption) segun el indiceActual seleccionado.
function actualizarGaleria() {
  if (!imagenCholet) return;
  imagenCholet.src = imagenesCholets[indiceActual];
  imagenCholet.alt = `Cholet ${indiceActual + 1} de ${imagenesCholets.length}`;
  if (pieImagen) pieImagen.textContent = `Cholet ${indiceActual + 1} de ${imagenesCholets.length}`;
}

// PASO 11: Boton SIGUIENTE -> incrementa el indice; con el operador
// modulo (%) vuelve a la imagen 0 cuando llega al final (carrusel infinito).
document.querySelector("#btnNextImg")?.addEventListener("click", () => {
  indiceActual = (indiceActual + 1) % imagenesCholets.length;
  actualizarGaleria();
});

// PASO 12: Boton ANTERIOR -> decrementa el indice; si baja de 0,
// la suma de longitud y el modulo hacen que salte a la ultima imagen.
document.querySelector("#btnPrevImg")?.addEventListener("click", () => {
  indiceActual = (indiceActual - 1 + imagenesCholets.length) % imagenesCholets.length;
  actualizarGaleria();
});

// PASO 13: Inicializar el carrusel mostrando la primera imagen al cargar.
actualizarGaleria();

// ==========================================
// 6. SIMULACIÓN & TEMPORIZADORES (setInterval / setTimeout)
// ==========================================
let intervaloSimulacion = null;
let segundos = 0;

function actualizarEstadoSensor(sensor) {
  sensor.estado = sensor.valor > 90 ? "alerta" : "activo";
}

function simularEventosIoT() {
  const indice = Math.floor(Math.random() * sensores.length);
  const sensor = sensores[indice];
  sensor.valor = Math.floor(Math.random() * 101);
  
  actualizarEstadoSensor(sensor);
  mostrarSensores(sensores);

  if (sensor.estado === "alerta") {
    // Requisito setTimeout
    setTimeout(() => {
      mostrarEstado(`⚠️ Alerta: ${sensor.nombre} en estado crítico!`);
    }, 1000);
  }
}

document.querySelector("#btnIniciarSimulacion")?.addEventListener("click", () => {
  if (intervaloSimulacion !== null) return;
  mostrarEstado("Simulación en vivo activada...");
  
  intervaloSimulacion = setInterval(() => {
    segundos++;
    const segContainer = document.querySelector("#segundos");
    if (segContainer) segContainer.textContent = `${segundos}s`;
    
    simularEventosIoT();
  }, 2000);
});

document.querySelector("#btnDetenerSimulacion")?.addEventListener("click", () => {
  // Requisito clearInterval
  clearInterval(intervaloSimulacion);
  intervaloSimulacion = null;
  mostrarEstado("Simulación pausada.");
});
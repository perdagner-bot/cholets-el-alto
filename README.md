# Data-Cholets

> Simulador de **construcción inteligente** para explorar la relación entre la arquitectura andina (cholets), los **sensores IoT** y la **experiencia multimedia**.

## Descripción del proyecto

Data-Cholets es una aplicación web frontend desarrollada como prototipo académico. Permite al usuario:

- Registrar la identidad de su propio cholet (nombre, correo, pisos y descripción).
- Visualizar un **edificio inteligente** de 4 pisos con efecto *pop-up 3D* al seleccionar cada nivel.
- Consultar lecturas de **8 sensores IoT** organizados por piso (lluvia, humedad, energía, agua, seguridad).
- Controlar un **centro multimedia** con reproductor de video, reproductor de audio y una galería de cholets.
- Ejecutar una **simulación IoT** que genera valores aleatorios en tiempo real y dispara alertas.

## Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Semántica del sitio (`section`, `nav`, `figure`, reproductores `<video>` y `<audio>`) |
| **CSS3** | Sistema visual con variables, grid, transiciones y animaciones 3D |
| **JavaScript puro** | Manipulación del DOM (`querySelector`, `createElement`), eventos `addEventListener`, temporizadores y lógica de simulación |

Sin frameworks ni librerías externas: solo HTML, CSS y JS vanilla.

## Estructura de carpetas

```text
data-cholets/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── multimedia/
│   ├── cholet.mp4
│   ├── ambiente.mp3
│   ├── imagen 1.jpeg
│   ├── imagen 2.jpeg
│   ├── imagen 3.jpeg
│   ├── imagen 4.jpeg
│   └── imagen 5.jpeg
└── README.md
```

## Sensores IoT (8)

| # | Sensor | Tipo | Piso |
|---|--------|------|------|
| 1 | Sensor de lluvia | ambiental | 1 |
| 2 | Sensor de humedad | ambiental | 1 |
| 3 | Panel solar | energía | 2 |
| 4 | Medidor de agua | agua | 2 |
| 5 | Sensor de movimiento | seguridad | 3 |
| 6 | Cámara de seguridad | seguridad | 3 |
| 7 | Alarma | seguridad | 4 |
| 8 | Bomba de agua | agua | 4 |

## Instrucciones de uso — Sección Multimedia

El apartado **Centro Multimedia** ofrece tres experiencias controladas íntegramente desde `js/app.js` mediante `addEventListener`.

### Reproductor de video (`cholet.mp4`)
- **Reproducir** → ejecuta el método `play()` del elemento `<video id="videoCholet">`.
- **Pausar** → ejecuta el método `pause()`.
- **Silenciar** → alterna la propiedad `muted` del video.

### Reproductor de audio (`ambiente.mp3`)
- **Reproducir** → ejecuta el método `play()` del elemento `<audio id="audioCholet">`.
- **Pausar** → ejecuta el método `pause()`.
- **Silenciar** → alterna la propiedad `muted`.

### Galería de cholets (carrusel)
- Utiliza un array con las 5 imágenes (`imagen 1.jpeg` a `imagen 5.jpeg`).
- El botón **Siguiente** avanza con el operador módulo (carrusel infinito).
- El botón **Anterior** retrocede con módulo negativo para no salirse del rango.
- El pie de foto muestra la posición actual (`Cholet X de 5`).

## Puesta en marcha

1. Abre la carpeta `data-cholets` completa en Visual Studio Code.
2. Coloca el video en `multimedia/cholet.mp4` y el audio en `multimedia/ambiente.mp3` (archivos reales, no placeholders).
3. Recarga la página: `index.html` funciona con doble clic o mejor con Live Server para evitar restricciones del navegador (CORS/media autoplay).
4. Explora el formulario de registro, selecciona pisos con efecto 3D, filtra los sensores y pulsa **Iniciar Simulación**.

> **Nota:** navegadores modernos pueden bloquear la reproducción de audio/video sin interacción del usuario; por eso los botones son el medio manual de control.
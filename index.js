const btnSubir = document.querySelector(".btn-subir");
const titulo = document.querySelector(".campo-titulo");
const texto = document.querySelector(".campo-texto");
const pendientes = document.querySelector(".pendientes");
const proceso = document.querySelector(".proceso");
const terminado = document.querySelector(".terminado");
const btnTemporizador = document.querySelector(".btn-temporizador");
const btnRestablecer = document.querySelector(".btn-restablecer");
const tiempo = document.querySelector(".tiempo");
const artTemporizador = document.querySelector(".artTemporizdor");
const artOmitir = document.querySelector(".artOmitir");
const toast = document.querySelector(".toast");
const toastBody = document.querySelector(".toast-body");
const descanso = document.querySelector(".descanso");
const btnOmitir = document.querySelector(".btn-omitir");
const checkPomodoros = document.querySelector(".check-pomodoros");
const checkDescansos = document.querySelector(".check-descansos");

let tareas;
let tiempoPomodoro = 10000;
let descansoPomodoro = 7000;
let pomodoro = true;
let estado = true;

const notify = (message) => {
  toast.classList.toggle("hide");
  toast.classList.toggle("show");
  toastBody.textContent = message;
};

const tareaFormato = ({ titulo, texto, estado, fecha }, index) => {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return `<div class="card m-2 box ${estado === "Terminado" ? "disable" : ""}">
                <div class="card-body">
                  <h5 class="card-title">${titulo}</h5>
                  <p class="card-text">${texto}</p>
                  ${
                    fecha
                      ? new Date(fecha).toLocaleDateString("en-US", options)
                      : ""
                  }
                  <button class="btn-primary colocar"><i class="bi bi-arrow-up-circle"></i></button>
                  <div class="dropdown">
                      <button data-id=${index}
                        class="btn btn-secondary dropdown-toggle btn-estado "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ${estado}
                      </button>
                      <ul class="dropdown-menu">
                        <li><button class="dropdown-item">Pendiente</button></li>
                        <li><button class="dropdown-item">En proceso</button></li>
                        <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal">Terminado</button></li>
                      </ul>
                  </div>
                </div>
              </div>`;
};

const pomodoroCompletado = () => {
  if (document.querySelector(".borrablePomodoro"))
    checkPomodoros.removeChild(document.querySelector(".borrablePomodoro"));

  let iconos = checkPomodoros.childElementCount;
  if (iconos < 3) {
    const icono = document.createElement("i");
    icono.setAttribute("class", "bi bi-check-circle-fill checked");

    checkPomodoros.appendChild(icono);

    callarPajaros();
  }
};

const descansoCompletado = () => {
  if (document.querySelector(".borrableDescanso"))
    checkDescansos.removeChild(document.querySelector(".borrableDescanso"));
  let iconos = checkDescansos.childElementCount;
  if (iconos < 3) {
    const icono = document.createElement("i");
    icono.setAttribute("class", "bi bi-check-circle checked");
    checkDescansos.appendChild(icono);
    callarPajaros();
  }
};

btnOmitir.addEventListener("click", () => {
  let omitirTiempo = document.querySelector(".omitirDescanso");
  omitirTiempo.addEventListener("click", () => {
    descansoPomodoro = 0;
    artOmitir.classList.add("hidden");
    if (btnTemporizador.textContent == "Reanudar Temporizador") {
      actualizarTiempo();
    }
  });
});

btnRestablecer.addEventListener("click", () => {
  let restablecerTiempoBtn = document.querySelector(".restablecerTiempo");
  restablecerTiempoBtn.addEventListener("click", () => {
    if (btnTemporizador.textContent == "Pausar Temporizador") {
      btnTemporizador.textContent = "Restablecido (Reanudar)";
      actualizarTiempo();
    }
    if (pomodoro) {
      tiempoPomodoro = 10000;
      tiempo.textContent = millisToMinutsAndSeconds(tiempoPomodoro);
    } else {
      descansoPomodoro = 7000;
      descanso.textContent = millisToMinutsAndSeconds(descansoPomodoro);
    }
  });
});

const acomodar = () => {
  pendientes.innerHTML = "";
  proceso.innerHTML = "";
  terminado.innerHTML = "";
  tareas.map((tarea, index) => {
    if (tarea.estado === "Pendiente") {
      pendientes.innerHTML += tareaFormato(tarea, index);
    } else if (tarea.estado === "En proceso") {
      proceso.innerHTML += tareaFormato(tarea, index);
    } else {
      terminado.innerHTML += tareaFormato(tarea, index);
    }
  });
  if (proceso.textContent) {
    artTemporizador.classList.remove("hidden");
  } else {
    artTemporizador.classList.add("hidden");
  }
};

function millisToMinutsAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function sonarPajaros() {
  var sonido = document.createElement("iframe");
  sonido.setAttribute("src", "campana_13.mp3");
  sonido.setAttribute("class", "hidden");
  document.body.appendChild(sonido);
}

function callarPajaros() {
  var iframe = document.getElementsByTagName("iframe");
  iframe[0].parentNode.removeChild(iframe[0]);
}

function actualizarTiempo() {
  tiempo.textContent = millisToMinutsAndSeconds(tiempoPomodoro);
  descanso.textContent = millisToMinutsAndSeconds(descansoPomodoro);
  if (btnTemporizador.textContent == "Pausar Temporizador") {
    btnTemporizador.textContent = "Reanudar Temporizador";
    estado = false;
  } else if (btnTemporizador.textContent == "Restablecido (Reanudar)") {
    btnTemporizador.textContent = "Reanudar Temporizador";
    estado = false;
  } else {
    btnTemporizador.textContent = "Pausar Temporizador";
    estado = true;
  }

  let temporizador = setInterval(() => {
    if (pomodoro) {
      if (tiempoPomodoro == 0) {
        notify("Se terminó el tiempo");
        pomodoro = false;
        artOmitir.classList.remove("hidden");
        descansoPomodoro = 7000;
        pomodoroCompletado();
      } else if (tiempoPomodoro == 5000) {
        sonarPajaros();
        tiempoPomodoro -= 1000;
      } else if (!estado) {
        clearInterval(temporizador);
        alert("El temporizador se ha pausado");
      } else {
        tiempoPomodoro -= 1000;
      }
      tiempo.textContent = millisToMinutsAndSeconds(tiempoPomodoro);
      console.log("pomodoro:", tiempoPomodoro);
    } else if (pomodoro == false) {
      if (descansoPomodoro == 0) {
        notify("Se terminó el descanso");
        pomodoro = true;
        artOmitir.classList.add("hidden");
        tiempoPomodoro = 10000;
        descansoCompletado();
      } else if (descansoPomodoro == 5000) {
        sonarPajaros();
        descansoPomodoro -= 1000;
      } else if (!estado) {
        clearInterval(temporizador);
        alert("El temporizador se ha pausado");
      } else {
        descansoPomodoro -= 1000;
      }
      descanso.textContent = millisToMinutsAndSeconds(descansoPomodoro);
      console.log("descanso:", descanso);
    }
  }, 1000);
}

btnTemporizador.addEventListener("click", () => {
  actualizarTiempo();
});

btnSubir.addEventListener("click", () => {
  let repetido = false;
  const contenido = {
    titulo: titulo.value,
    texto: texto.value,
    estado: "Pendiente",
  };
  if (contenido.titulo && contenido.estado && contenido.texto) {
    tareas.filter((tarea) => {
      if (
        tarea.titulo === contenido.titulo ||
        tarea.texto === contenido.texto
      ) {
        repetido = true;
      }
    });
    if (repetido) {
      notify("Tarea con característica repetida");
    } else {
      subir(contenido);
    }
  } else {
    notify("Faltaron campos por rellenar");
  }
});

const terminar = () => {
  let terminarTareaBtn = document.querySelector(".terminarTarea");
  terminarTareaBtn.addEventListener("click", () => {
    for (let i = 0; i < tareas.length; i++) {
      let titulo = JSON.parse(localStorage.getItem("terminando")).titulo;
      if (titulo === tareas[i].titulo) tareas[i].estado = "Terminado";
    }
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrar();
  });
};

const dropdownBtnsSetup = () => {
  const btnsDropdown = document.querySelectorAll(".dropdown-item");
  btnsDropdown.forEach((btn) => {
    let estado = btn.parentElement.parentElement.previousElementSibling;

    btn.addEventListener("click", () => {
      if (
        estado.textContent.includes("En proceso") &&
        btn.textContent.includes("Pendiente")
      )
        notify(
          'La tarea "En progreso" se ha movido a "Pendientes" exitosamente'
        );

      estado.textContent = btn.textContent;
      tareas = tareas.map((tarea, index) => {
        if (estado.dataset.id == index) {
          if (estado.textContent == "Terminado") {
            tarea.fecha = new Date();
            localStorage.setItem("terminando", JSON.stringify(tarea));
            terminar();
          } else {
            tarea.estado = estado.textContent;
          }
        }
        return tarea;
      });
      localStorage.setItem("tareas", JSON.stringify(tareas));
      mostrar();
    });
  });
};

const flechaBtnSetup = () => {
  const flechasBtns = document.querySelectorAll(".colocar");
  flechasBtns.forEach((flecha) => {
    flecha.addEventListener("click", (e) => {
      let idTarea = e.currentTarget.nextElementSibling.children[0].dataset.id;
      let tareaRef = tareas[idTarea];
      tareas = tareas.filter((tarea, index) => {
        if (index != idTarea) {
          return tarea;
        }
      });
      tareas.unshift(tareaRef);
      mostrar();
    });
  });
};

const colorearBotones = () => {
  const btnsEstado = document.querySelectorAll(".btn-estado");
  if (btnsEstado) {
    btnsEstado.forEach((estado) => {
      if (estado.textContent.includes("Pendiente")) {
        estado.style.backgroundColor = "red";
      } else if (estado.textContent.includes("En proceso")) {
        estado.style.backgroundColor = "orange";
      } else {
        estado.style.backgroundColor = "green";
      }
    });
  }
};

const mostrar = () => {
  acomodar();
  flechaBtnSetup();
  dropdownBtnsSetup();
  colorearBotones();
};

const subir = (contenido) => {
  tareas.push(contenido);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  notify("Se registro la tarea correctamente");
  mostrar();
};

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tareas")) {
    tareas = JSON.parse(localStorage.getItem("tareas"));
    mostrar();
  } else {
    tareas = [];
  }
});

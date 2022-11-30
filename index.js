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
let idTarea;
let tiempoPomodoro = 10000;
let descansoPomodoro = 7000;
const DESCANSO = 7000;
const POMODORO = 10000;
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
    hour: "numeric",
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
                  ${
                    estado != "Terminado"
                      ? `<div class="lista-botones"><button class="btn-danger borrar" data-bs-toggle="modal" data-bs-target="#modalBorrar"><i class="bi bi-trash-fill"></i></button><button class="btn-primary colocar"><i class="bi bi-arrow-up-circle"></i></button><button data-id=${index} class="btn-info editar" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="bi bi-pencil"></i></button></div>`
                      : ""
                  }
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
                        <li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#terminarModal">Terminado</button></li>
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
    icono.setAttribute(
      "class",
      "bi bi-check-circle-fill borrablePomodoro checked"
    );

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
    icono.setAttribute("class", "bi bi-check-circle borrableDescanso checked");
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
    let borrablePomodoro = document.querySelectorAll(".borrablePomodoro");
    let borrableDescanso = document.querySelectorAll(".borrableDescanso");
    borrablePomodoro.forEach((borrable) => {
      if (borrable.classList.contains("checked")) {
        borrable.classList.remove("checked");
        console.log(borrable);
      }
    });
    borrableDescanso.forEach((borrable) => {
      if (borrable.classList.contains("checked")) {
        borrable.classList.remove("checked");
      }
    });
    pomodoro = true;
    artOmitir.classList.add("hidden");
    tiempoPomodoro = 10000;
  });
});

const acomodar = () => {
  pendientes.innerHTML = "";
  proceso.innerHTML = "";
  terminado.innerHTML = "";
  tareas.map((tarea, index) => {
    if (tarea.estado.includes("Pendiente")) {
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
        let checkDescansos = document.querySelectorAll(".borrablePomodoro");
        if (checkDescansos[1].classList.contains("checked")) {
          descansoPomodoro = 3 * DESCANSO;
        } else {
          descansoPomodoro = DESCANSO;
        }
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
        tiempoPomodoro = POMODORO;
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
      console.log("descanso:", descansoPomodoro);
    }
  }, 1000);
}

btnTemporizador.addEventListener("click", () => {
  actualizarTiempo();
});

const tareaRepetida = (contenido) => {
  hasMatch = Boolean(
    tareas.find((tarea) => {
      return (
        tarea.titulo === contenido.titulo || tarea.texto === contenido.texto
      );
    })
  );
  return hasMatch;
};

btnSubir.addEventListener("click", () => {
  const contenido = {
    titulo: titulo.value,
    texto: texto.value,
    estado: "Pendiente",
  };
  if (contenido.titulo && contenido.estado && contenido.texto) {
    if (tareaRepetida(contenido)) {
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
  let titulo = JSON.parse(localStorage.getItem("modificando")).titulo;
  terminarTareaBtn.addEventListener("click", () => {
    for (let i = 0; i < tareas.length; i++) {
      if (titulo === tareas[i].titulo) {
        tareas[i].estado = "Terminado";
        tareas[i].fecha = new Date();
        let tareaNueva = { ...tareas[i] };
        tareas.splice(i, 1);
        tareas.unshift(tareaNueva);
      }
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
            localStorage.setItem("modificando", JSON.stringify(tarea));
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
      let idTarea =
        e.currentTarget.parentElement.nextElementSibling.children[0].dataset.id;
      let tareaRef = tareas[idTarea];
      tareas = tareas.filter((tarea, index) => {
        if (index != idTarea) {
          return tarea;
        }
      });
      tareas.unshift(tareaRef);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      mostrar();
    });
  });
};

const borrarBtnSetup = () => {
  const borrarBtns = document.querySelectorAll(".borrar");
  borrarBtns.forEach((borrar) => {
    borrar.addEventListener("click", (e) => {
      let idTarea =
        e.currentTarget.parentElement.nextElementSibling.children[0].dataset.id;
      let borrarTarea = document.querySelector(".borrarTarea");
      borrarTarea.addEventListener("click", () => {
        tareas.splice(idTarea, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        mostrar();
      });
    });
  });
};

const handleEditBtnClick = (e) => {
  // Cambiar tarea a modificar
  idTarea = e.currentTarget.dataset.id;
};

const getNewTarea = () => {
  let titulo = document.querySelector(".tituloTarea").value;
  let texto = document.querySelector(".descripcionTarea").value;
  let estado = tareas[idTarea].estado;

  return { titulo, texto, estado };
};

const editarTareaModalSetup = () => {
  let editarTarea = document.querySelector(".editarTarea");
  editarTarea.addEventListener("click", () => {
    const nuevaTarea = getNewTarea();

    if (tareaRepetida(nuevaTarea)) {
      notify("Tarea con característica repetida");
    } else {
      console.log(nuevaTarea, idTarea);
      tareas[idTarea] = { ...nuevaTarea };
      localStorage.setItem("tareas", JSON.stringify(tareas));
      mostrar();
    }
  });
};

const editarBtnSetup = () => {
  const editarBtns = document.querySelectorAll(".editar");
  // Agregar edit handle a cada tarea
  editarBtns.forEach((editar) => {
    editar.addEventListener("click", handleEditBtnClick);
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
  editarBtnSetup();
  dropdownBtnsSetup();
  borrarBtnSetup();
  colorearBotones();
};

const subir = (contenido) => {
  tareas.push(contenido);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  notify("Se registro la tarea correctamente");
  mostrar();
};

// Handler para modal submit
editarTareaModalSetup();

window.addEventListener("DOMContentLoaded", () => {
  verificarToken();
  if (localStorage.getItem("tareas")) {
    tareas = JSON.parse(localStorage.getItem("tareas"));
    mostrar();
  } else {
    tareas = [];
  }
});

const verificarToken = async () => {
  const token = localStorage.getItem("tokenLogin")
    ? JSON.parse(localStorage.getItem("tokenLogin"))
    : null;
  const tokenAdmin = localStorage.getItem("tokenAdmin")
    ? JSON.parse(localStorage.getItem("tokenAdmin"))
    : null;
  if (!token && !tokenAdmin) location.href = "login.html";
  if (token) await fetchValidToken(token);
  else if (tokenAdmin) await fetchValidTokenAdmin(tokenAdmin);
};

const fetchValidToken = async (token) => {
  try {
    console.log("entrando a validtoken");
    const response = await fetch(`http://localhost:3000/auth`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const result = await response.json();
    if (!result.access) location.href = "login.html";
  } catch (error) {
    location.href = "login.html";
  }
};
const fetchValidTokenAdmin = async (token) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/admin`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const result = await response.json();
    if (!result.access) location.href = "loginAdmin.html";
  } catch (error) {
    location.href = "loginAdmin.html";
  }
};

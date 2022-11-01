const btnSubir = document.querySelector(".btn-subir");
const titulo = document.querySelector(".campo-titulo");
const texto = document.querySelector(".campo-texto");
const pendientes = document.querySelector(".pendientes");
const proceso = document.querySelector(".proceso");
const terminado = document.querySelector(".terminado");
const btnTemporizador = document.querySelector(".btn-temporizador");
const tiempo = document.querySelector(".tiempo");
const artTemporizador = document.querySelector(".artTemporizdor");

let tareas;
let tiempoPomodoro = 1500000;
let estado = true;

const acomodar = () => {
  tareas.map((tarea, index) => {
    if (tarea.estado === "Pendiente") {
      pendientes.innerHTML += `<div class="card">
                <div class="card-body">
                  <h5 class="card-title">${tarea.titulo}</h5>
                  <p class="card-text">${tarea.texto}</p>
                  <div class="dropdown">
                      <button data-id=${index}
                        class="btn btn-secondary dropdown-toggle btn-estado "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ${tarea.estado}
                      </button>
                      <ul class="dropdown-menu">
                        <li><button class="dropdown-item">Pendiente</button></li>
                        <li><button class="dropdown-item">En proceso</button></li>
                        <li><button class="dropdown-item">Terminado</button></li>
                      </ul>
                  </div>
                </div>
              </div>`;
    } else if (tarea.estado === "En proceso") {
      proceso.innerHTML += `<div class="card">
                <div class="card-body">
                  <h5 class="card-title">${tarea.titulo}</h5>
                  <p class="card-text">${tarea.texto}</p>
                  <div class="dropdown">
                      <button data-id=${index}
                        class="btn btn-secondary dropdown-toggle btn-estado "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ${tarea.estado}
                      </button>
                      <ul class="dropdown-menu">
                        <li><button class="dropdown-item">Pendiente</button></li>
                        <li><button class="dropdown-item">En proceso</button></li>
                        <li><button class="dropdown-item">Terminado</button></li>
                      </ul>
                  </div>
                </div>
              </div>`;
    } else {
      terminado.innerHTML += `<div class="card">
                <div class="card-body">
                  <h5 class="card-title">${tarea.titulo}</h5>
                  <p class="card-text">${tarea.texto}</p>
                  <div class="dropdown">
                      <button data-id=${index}
                        class="btn btn-secondary dropdown-toggle btn-estado "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        ${tarea.estado}
                      </button>
                      <ul class="dropdown-menu">
                        <li><button class="dropdown-item">Pendiente</button></li>
                        <li><button class="dropdown-item">En proceso</button></li>
                        <li><button class="dropdown-item">Terminado</button></li>
                      </ul>
                  </div>
                </div>
              </div>`;
    }
    if (proceso.innerHTML && artTemporizador.classList.contains("hidden")) {
      artTemporizador.classList.remove("hidden");
    } else {
      artTemporizador.classList.add("hidden");
    }
  });
};

function millisToMinutsAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function actualizarTiempo() {
  if (btnTemporizador.textContent == "Pausar Temporizador") {
    btnTemporizador.textContent = "Reanudar Temporizador";
    estado = false;
  } else {
    btnTemporizador.textContent = "Pausar Temporizador";
    estado = true;
  }

  let temporizador = setInterval(() => {
    if (tiempoPomodoro == 0) {
      alert("Se terminó el tiempo");
    } else if (!estado) {
      clearInterval(temporizador);
      alert("El temporizador se ha pausado");
    } else {
      tiempoPomodoro -= 1000;
      tiempo.textContent = millisToMinutsAndSeconds(tiempoPomodoro);
    }
  }, 1000);
}

btnTemporizador.addEventListener("click", actualizarTiempo);

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
      alert("Tarea con característica repetida");
    } else {
      subir(contenido);
    }
  } else {
    alert("Faltaron campos por rellenar");
  }
});

const formateoBotones = () => {
  const btnsDropdown = document.querySelectorAll(".dropdown-item");
  btnsDropdown.forEach((btn) => {
    let estado = btn.parentElement.parentElement.previousElementSibling;
    btn.addEventListener("click", () => {
      estado.textContent = btn.textContent;
      if (btn.textContent === "Pendiente") {
        estado.style.backgroundColor = "red";
      } else if (btn.textContent === "En proceso") {
        estado.style.backgroundColor = "orange";
      } else {
        estado.style.backgroundColor = "green";
        alert("Se ha terminado la tarea");
      }
      tareas = tareas.map((tarea, index) => {
        if (estado.dataset.id == index) {
          tarea.estado = estado.textContent;
        }
        return tarea;
      });
      localStorage.setItem("tareas", JSON.stringify(tareas));
      location.reload();
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
  formateoBotones();
  colorearBotones();
};

const subir = (contenido) => {
  tareas.push(contenido);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  alert("Se registro la tarea correctamente");
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

const btnSubir = document.querySelector(".btn-subir");
const btnMostrar = document.querySelector(".btn-mostrar");
const nombre = document.querySelector(".campo-nombre");
const texto = document.querySelector(".campo-texto");
const resultados = document.querySelector(".resultados");
const btnTemporizador = document.querySelector(".btn-temporizador");
const tiempo = document.querySelector(".tiempo");

let tareas;
let temporizdor = 1500000;

btnTemporizador.addEventListener("click", () => {
  btnTemporizador.textContent = "Pausar Temporizador";
  setTimeout(() => {}, 1000);
});

btnSubir.addEventListener("click", () => {
  let repetido = false;
  const contenido = {
    nombre: nombre.value,
    texto: texto.value,
    estado: "Pendiente",
  };
  if (contenido.nombre && contenido.estado && contenido.texto) {
    tareas.filter((tarea) => {
      if (
        tarea.nombre === contenido.nombre ||
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
  resultados.innerHTML = tareas
    .map((tarea, index) => {
      return `<div>
        <h2 style="background-color: rgb(0, 51, 255); color: white">
          ${tarea.nombre}
        </h2>
        <h3 style="background-color: rgb(0, 136, 255); color: white">
          ${tarea.texto}
        </h3>
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
      </div>`;
    })
    .join("");
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

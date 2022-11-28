let admin;
let clients = [];

const addFormListener = () => {
  const itemForm = document.querySelector(".form_items");
  itemForm.onsubmit = async (e) => {
    console.log("Submiteado");
    e.preventDefault();
    const usuario = document.querySelector(".usuario").value;
    const pass = document.querySelector(".pass").value;
    await fetch("http://localhost:3000/client", {
      method: "POST",
      body: JSON.stringify({
        userName: usuario,
        password: pass,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    itemForm.reset();
  };
};

const consultarApiItems = () => {
  console.log("imprimir");
  //Aqui debe hacer la peticion a la API
  fetch("http://localhost:3000/client", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      clients = data;
      console.log(clients);
    });
};

const logearCliente = async () => {
  const usuario = document.querySelector(".usuario").value;
  const pass = document.querySelector(".pass").value;
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      //Aqui va el admin tuyo
      userName: usuario,
      password: pass,
    }),
  });
  const { token } = await res.json();
  console.log(token);
  if (typeof token === "string") {
    localStorage.setItem("tokenLogin", JSON.stringify(token));
    location.href = "index.html";
  } else {
    console.log("Token Inválido (No String)");
  }
};

document.querySelector(".ImpUs").addEventListener("click", consultarApiItems);

document.querySelector(".btnIngresar").addEventListener("click", logearCliente);

window.onload = () => {
  addFormListener();
};

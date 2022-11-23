import encriptar from "./encrypt.js";

let admin;
let clients = [];

const obtenerCredencialesAdmin = async () => {
  await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      //Aqui va el admin tuyo
      usuario: "admin",
      password: "1234",
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      admin = json;
    });
};
/*
const consultarApiItems = () => {
  //Aqui debe hacer la peticion a la API
  fetch("http://localhost:3000/client", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      clients = data;
      //llenarContenedorClients(items);
    });
};
*/

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
        /*authorization: `Bearer ${admin.token}`,*/
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

document.querySelector(".ImpUs").addEventListener("click", consultarApiItems);

window.onload = () => {
  //obtenerCredencialesAdmin();
  addFormListener();
};

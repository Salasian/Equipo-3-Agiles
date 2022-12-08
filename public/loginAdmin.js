const logearAdmin = async () => {
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
  if (typeof token === "string") {
    localStorage.setItem("tokenAdmin", JSON.stringify(token));
    location.href = "index.html";
  } else {
    console.log("Token Inválido (No String)");
  }
};

document.querySelector(".btnIngresar").addEventListener("click", logearAdmin);

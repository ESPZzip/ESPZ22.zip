let users = JSON.parse(localStorage.getItem("users")) || {};

// Registro
function register() {
  let name = document.getElementById("regName").value.trim();
  let pass = document.getElementById("regPass").value.trim();

  if (!name || !pass) return alert("Completa todos los campos");
  if (users[name]) return alert("Ese usuario ya existe");

  let id = "u" + Math.floor(Math.random() * 100000);

  users[name] = { password: pass, id: id, friends: [] };
  localStorage.setItem("users", JSON.stringify(users));

  alert("Cuenta creada, ahora inicia sesión");
}

// Login
function login() {
  let name = document.getElementById("logName").value.trim();
  let pass = document.getElementById("logPass").value.trim();

  if (users[name] && users[name].password === pass) {
    sessionStorage.setItem("currentUser", JSON.stringify({ name, id: users[name].id }));
    window.location.href = "home.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// Cargar usuario logueado
window.onload = function () {
  let user = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "index.html"; // Si no hay sesión, volver al login
    return;
  }

  document.getElementById("username").textContent = user.name;
  document.getElementById("robux").textContent = "💰 0"; // Por ahora fijo

  loadFriends(user);
};

// Cerrar sesión
function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Navegación entre páginas internas
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page + "Page").classList.add("active");
}

// Ir al perfil del usuario logueado
function goProfile() {
  let user = JSON.parse(sessionStorage.getItem("currentUser"));
  if (user) {
    window.location.href = `profile.html#user=${user.id}`;
  }
}

// Mostrar amigos en home
function loadFriends(user) {
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let list = document.getElementById("friendsList");
  if (!list) return;

  list.innerHTML = "";
  if (user.friends.length === 0) {
    list.innerHTML = "<li>No tienes amigos todavía.</li>";
    return;
  }

  user.friends.forEach(fid => {
    let friendName = Object.keys(users).find(u => users[u].id === fid);
    if (friendName) {
      let li = document.createElement("li");
      li.textContent = friendName;
      list.appendChild(li);
    }
  });
}

// ---------- PERFIL ----------
function loadProfile() {
  let userData = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!userData) {
    window.location.href = "index.html";
    return;
  }
  document.getElementById("currentUser").textContent = userData.name;

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let profileId = window.location.hash.split("=")[1];

  let profileUser = null;
  for (let u in users) {
    if (users[u].id === profileId) {
      profileUser = { name: u, ...users[u] };
      break;
    }
  }

  if (!profileUser) {
    document.querySelector(".content").innerHTML = "<h2>Usuario no encontrado</h2>";
    return;
  }

  document.getElementById("profileName").textContent = "Perfil de " + profileUser.name;
  document.getElementById("profileId").textContent = profileUser.id;

  if (profileUser.id === userData.id) {
    document.getElementById("addFriendBtn").style.display = "none";
  }

  let list = document.getElementById("friendsList");
  list.innerHTML = "";
  profileUser.friends.forEach(fid => {
    let friendName = Object.keys(users).find(u => users[u].id === fid);
    if (friendName) {
      let li = document.createElement("li");
      li.textContent = friendName;
      list.appendChild(li);
    }
  });

  sessionStorage.setItem("viewingProfile", JSON.stringify(profileUser));
}

function addFriend() {
  let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let profileUser = JSON.parse(sessionStorage.getItem("viewingProfile"));

  if (!users[currentUser.name].friends.includes(profileUser.id)) {
    users[currentUser.name].friends.push(profileUser.id);
    users[profileUser.name].friends.push(currentUser.id);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Ahora eres amigo de " + profileUser.name);
    loadProfile();
  } else {
    alert("Ya eres amigo de " + profileUser.name);
  }
}

function goHome() {
  window.location.href = "home.html";
}

if (window.location.pathname.endsWith("profile.html")) {
  window.onload = loadProfile;
}

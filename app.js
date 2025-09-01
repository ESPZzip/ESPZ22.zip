// Obtener usuarios guardados
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

// Guardar usuarios
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Agregar amigo
function addFriend(targetId) {
  let users = getUsers();
  let session = JSON.parse(localStorage.getItem("session"));

  if (!session) {
    alert("Debes iniciar sesión.");
    return;
  }

  if (session.id === targetId) {
    alert("No puedes agregarte a ti mismo 😅");
    return;
  }

  if (!session.friends.includes(targetId)) {
    session.friends.push(targetId);

    // Actualizar en la lista de usuarios
    users = users.map(u => {
      if (u.id === session.id) return session;
      return u;
    });

    saveUsers(users);
    localStorage.setItem("session", JSON.stringify(session));

    alert("Amigo agregado ✅");
    renderFriendsList();
  } else {
    alert("Ya es tu amigo.");
  }
}

// Mostrar amigos en el perfil
function renderFriendsList() {
  const session = JSON.parse(localStorage.getItem("session"));
  const users = getUsers();
  const container = document.getElementById("friendsList");

  if (!container) return;

  container.innerHTML = "";
  if (session.friends.length === 0) {
    container.innerHTML = "<p>No tienes amigos aún 😢</p>";
    return;
  }

  session.friends.forEach(fid => {
    const friend = users.find(u => u.id === fid);
    if (friend) {
      const li = document.createElement("li");
      li.textContent = friend.username;
      container.appendChild(li);
    }
  });
}

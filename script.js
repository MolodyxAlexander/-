
let currentUser = localStorage.getItem("currentUser");
let users = JSON.parse(localStorage.getItem("users")) || {};

function showSection(section) {
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("mainSection").classList.add("hidden");
  if (section === "main") {
    document.getElementById("mainSection").classList.remove("hidden");
  }
}

function saveUserData() {
  users[currentUser] = {
    ...users[currentUser],
    tasks,
    points,
    avatar
  };
  localStorage.setItem("users", JSON.stringify(users));
}

function loadUserData() {
  const userData = users[currentUser] || { tasks: [], points: 0, avatar: "avatar1.png" };
  tasks = userData.tasks;
  points = userData.points;
  avatar = userData.avatar;
}

function register() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (users[u]) {
    showMessage("Пользователь уже существует!");
  } else {
    users[u] = { password: p, tasks: [], points: 0, avatar: "avatar1.png" };
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Успешно зарегистрировано!");
  }
}

function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (users[u] && users[u].password === p) {
    currentUser = u;
    localStorage.setItem("currentUser", currentUser);
    loadUserData();
    showMessage("");
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("mainSection").classList.remove("hidden");
    document.getElementById("userDisplay").textContent = currentUser;
    document.getElementById("points").textContent = points;
    updateRank();
    renderTasks();
    changeAvatar(avatar);
  } else {
    showMessage("Неверные данные");
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  location.reload();
}

function showMessage(msg) {
  document.getElementById("authMessage").textContent = msg;
}

let points = 0;
let tasks = [];
let avatar = "avatar1.png";

const taskList = document.getElementById("task-list");
const avatarImage = document.getElementById("avatar");
const avatarSelector = document.getElementById("avatar-selector");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) li.classList.add("completed");
    li.onclick = function () {
      if (!task.completed) {
        task.completed = true;
        li.classList.add("completed");
        updatePoints(10);
        saveUserData();
      }
    };
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveUserData();
      renderTasks();
    };
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") return;
  tasks.push({ text: text, completed: false });
  input.value = "";
  saveUserData();
  renderTasks();
}

function updatePoints(value) {
  points += value;
  document.getElementById("points").textContent = points;
  updateRank();
  saveUserData();
}

function updateRank() {
  const rankElement = document.getElementById("rank");
  if (points >= 100) rankElement.textContent = "Мастер";
  else if (points >= 50) rankElement.textContent = "Продвинутый";
  else if (points >= 20) rankElement.textContent = "Опытный";
  else rankElement.textContent = "Новичок";
}

function changeAvatar(choice = null) {
  avatar = choice || avatarSelector.value;
  avatarImage.src = "img/" + avatar;
  saveUserData();
}

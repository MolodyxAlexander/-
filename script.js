let user = null;
let points = 0;
let level = 1;

function login() {
  const name = document.getElementById("username").value.trim();
  if (!name) return;

  user = name;
  document.getElementById("user-display").textContent = name;
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("main-section").style.display = "block";

  loadAvatar();
  loadStats();
  showTab('home');
}

function logout() {
  user = null;
  points = 0;
  level = 1;
  document.getElementById("main-section").style.display = "none";
  document.getElementById("auth-section").style.display = "block";
}

function showTab(tab) {
  document.getElementById("home-tab").style.display = tab === "home" ? "block" : "none";
  document.getElementById("profile-tab").style.display = tab === "profile" ? "block" : "none";
}

document.getElementById("avatar-upload").addEventListener("change", function(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("avatar").src = e.target.result;
    localStorage.setItem(user + "_avatar", e.target.result);
  };
  reader.readAsDataURL(event.target.files[0]);
});

function removeAvatar() {
  localStorage.removeItem(user + "_avatar");
  document.getElementById("avatar").src = "img/default.png";
}

function loadAvatar() {
  const saved = localStorage.getItem(user + "_avatar");
  if (saved) {
    document.getElementById("avatar").src = saved;
  }
}

function loadStats() {
  points = parseInt(localStorage.getItem(user + "_points")) || 0;
  updateLevel();
}

function saveStats() {
  localStorage.setItem(user + "_points", points);
}

function addTask() {
  const taskText = document.getElementById("task-input").value.trim();
  const selectedDay = document.getElementById("day-select").value;

  if (!taskText) return;

  const li = document.createElement("li");
  li.textContent = taskText + " ";

  li.onclick = function () {
    if (!li.classList.contains("completed")) {
      li.classList.add("completed");
      updatePoints(10);
    }
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "Удалить";
  delBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(delBtn);
  document.getElementById(selectedDay).appendChild(li);
  document.getElementById("task-input").value = "";
}

function updatePoints(value) {
  points += value;
  updateLevel();
  saveStats();
}

function updateLevel() {
  level = Math.floor(points / 50) + 1;
  document.getElementById("points").textContent = points;
  document.getElementById("level").textContent = level;
  updateRank();
}

function updateRank() {
  const rankEl = document.getElementById("rank");
  if (level >= 10) rankEl.textContent = "Легенда";
  else if (level >= 7) rankEl.textContent = "Мастер";
  else if (level >= 4) rankEl.textContent = "Опытный";
  else rankEl.textContent = "Новичок";
}

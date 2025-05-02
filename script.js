let xp = 0;
let level = 1;
let xpNeeded = 100;
let tasks = [];

const xpDisplay = document.getElementById('xp');
const levelDisplay = document.getElementById('level');
const xpBar = document.getElementById('xpBar');
const xpNeededDisplay = document.getElementById('xpNeeded');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const avatarImg = document.getElementById('avatarImg');

function updateAvatar() {
  let avatarLevel = 1;
  if (level >= 10) avatarLevel = 4;
  else if (level >= 5) avatarLevel = 3;
  else if (level >= 3) avatarLevel = 2;
  avatarImg.src = `img/lv${avatarLevel}.png`;
}

function updateDisplay() {
  xpDisplay.textContent = xp;
  levelDisplay.textContent = level;
  xpNeededDisplay.textContent = xpNeeded;
  xpBar.style.width = (xp / xpNeeded * 100) + '%';
}

function gainXP(amount) {
  xp += amount;
  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.3);
    alert("Поздравляем! Новый уровень: " + level);
  }
  updateDisplay();
  updateAvatar();
  saveData();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    const btn = document.createElement('button');
    btn.textContent = '✔';
    btn.onclick = () => {
      if (!task.completed) {
        tasks[index].completed = true;
        gainXP(25);
        renderTasks();
        saveData();
      }
    };

    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

function saveData() {
  localStorage.setItem('xp', xp);
  localStorage.setItem('level', level);
  localStorage.setItem('xpNeeded', xpNeeded);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadData() {
  xp = parseInt(localStorage.getItem('xp')) || 0;
  level = parseInt(localStorage.getItem('level')) || 1;
  xpNeeded = parseInt(localStorage.getItem('xpNeeded')) || 100;
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  updateDisplay();
  updateAvatar();
  renderTasks();
}

taskForm.onsubmit = (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  renderTasks();
  saveData();
};

loadData();

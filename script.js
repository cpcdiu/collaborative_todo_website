const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

function getTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    return tasks;
  }
  return [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const value = inputBox.value.trim();
  if (value === "") {
    alert("Please enter a task!");
    return;
  }

  const tasks = getTasksFromStorage();
  const newTask = {
    id: Date.now(), //generate new id every time
    content: value,
  };
  tasks.push(newTask);
  saveTasksToStorage(tasks);
  inputBox.value = "";
  showTasks();
}

function deleteTask(id) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToStorage(tasks);
  showTasks();
}

function editTask(id) {
  const tasks = getTasksFromStorage();
  const task = tasks.find((t) => t.id === id);
  document.getElementById(`edit-${id}`).classList.add("hidden");
  document.getElementById(`save-${id}`).classList.remove("hidden");

  document.getElementById(`text-${id}`).classList.add("hidden");

  let editArea = document.getElementById(`area-${id}`);
  editArea.classList.remove("hidden");
  editArea.value = task.content;

  //   const newContent = prompt("Edit your task:", task.content);

  //   if (newContent !== null && newContent.trim() !== "") {
  //     task.content = newContent.trim();
  //     saveTasksToStorage(tasks);
  //     showTasks();
  //   }
}

function saveTask(id) {
  let editArea = document.getElementById(`area-${id}`);

  let newValue = editArea.value;
  if (newValue.trim() === "") {
    alert("Task cannot be empty.");
    return;
  }
  const tasks = getTasksFromStorage();

  tasks.forEach((task) => {
    if (task.id === id) {
      task.content = newValue;
    }
  });

  document.getElementById(`edit-${id}`).classList.remove("hidden");
  document.getElementById(`save-${id}`).classList.add("hidden");
  saveTasksToStorage(tasks);
  showTasks();
}

function showTasks() {
  const tasks = getTasksFromStorage();
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    taskList.innerHTML += `
        <div class="border p-3 w-full rounded-md">
          <p id="text-${task.id}" class="text-red-500 text-2xl font-bold text-wrap">
            ${task.content}
          </p>
          <textarea id="area-${task.id}" class=" p-2 pt-1 w-full rounded-md hidden"></textarea>
          <div class="mt-2">
          <button
              id='save-${task.id}'
              onclick="saveTask(${task.id})"
              class="w-[60px] h-[30px] rounded bg-blue-200 hidden">
              Save
            </button>
            <button id='edit-${task.id}' onclick="editTask(${task.id})" class="w-[60px] h-[30px] rounded bg-blue-200">
              Edit
            </button>
            <button onclick="deleteTask(${task.id})" class="w-[60px] h-[30px] rounded bg-blue-200">
              Delete
            </button>
          </div>
        </div>
        `;
  });
}

// Load tasks on page load
showTasks();

const inputBox = document.getElementById('input-box');
const taskList = document.getElementById('task-list');
let count = 0;
function addTask(){
    if (inputBox.value === "") {
        alert("Please enter a task!");
    }
    else {
        const task = document.createElement('div');
        count++;
        task.innerHTML = `
        <div id="${count}" class="w-[500px] h-[100px] border border-gray-400 rounded p-3 mt-4 flex items-center justify-between">
                <p class="text-Red-500 text-2xl font-bold">${inputBox.value}</p>
                 <button onclick="deleteData(${count})" class="w-[80px] h-[50px] rounded p-3 bg-blue-200">Delete</button>
        </div>`

        taskList.appendChild(task);
        saveData(count, task.innerHTML);
    }
    inputBox.value = "";
}



function saveData(id, task) {
    localStorage.setItem(id, task);
}
function showTask() {
    taskList.innerHTML = ''; // Clear existing tasks
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get actual key
        const value = localStorage.getItem(key);
        if (value) {
            taskList.innerHTML += value;
        }
    }
}

// localStorage.clear();
showTask();

function deleteData(id) {
    localStorage.removeItem(id);
    showTask();
}   

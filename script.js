
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Introduceți o sarcină!');
        return;
    }
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Șterge</button>
    `;
    taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
    
    if (e.target.tagName === 'SPAN') {
        e.target.parentElement.classList.toggle('completed');
    }
});
    taskList.appendChild(li);
    taskInput.value = '';
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-list li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Șterge</button>
        `;
        if (task.completed) li.classList.add('completed');
        taskList.appendChild(li);
    });
}

window.addEventListener('load', loadTasks);

taskList.addEventListener('click', saveTasks);
addTaskBtn.addEventListener('click', () => {
    setTimeout(saveTasks, 100);
});
}
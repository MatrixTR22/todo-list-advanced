const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const categoryInput = document.getElementById('category');
const priorityInput = document.getElementById('priority');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        if (filter === 'pending' && todo.completed) return;
        if (filter === 'completed' && !todo.completed) return;

        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${todo.task} [${todo.category} - ${todo.priority}]</span>
            <div>
                <button onclick="toggleComplete(${index})">✔️</button>
                <button onclick="deleteTodo(${index})">❌</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}

function addTodo(task, category, priority) {
    todos.push({ task, category, priority, completed: false });
    saveTodos();
    renderTodos();
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(taskInput.value, categoryInput.value, priorityInput.value);
    taskInput.value = '';
});

// Filtre butonları
document.getElementById('show-all').addEventListener('click', () => renderTodos('all'));
document.getElementById('show-pending').addEventListener('click', () => renderTodos('pending'));
document.getElementById('show-completed').addEventListener('click', () => renderTodos('completed'));

// İlk render
renderTodos();

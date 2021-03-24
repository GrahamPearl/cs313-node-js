// See: https://www.youtube.com/watch?v=Ttf3CEsEwMQ

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

todoButton.addEventListener("click", addTodo);

function addTodo(event) {
    event.preventDefault();
    addItemToToList(todoInput.value);
    saveLocalTodos(todoInput.value);

    todoInput.value = "";
}

function addItemToToList(itemToAdd) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const todoItem = document.createElement('li');
    todoItem.classList.add("todo-item");
    todoItem.innerText = itemToAdd;

    const buttonCheck = document.createElement('button');
    buttonCheck.classList.add("checked-btn");
    buttonCheck.innerText = '<i class="fa fa-check"></i>';

    const buttonTrash = document.createElement('button');
    buttonTrash.classList.add("trashed-btn");

    buttonTrash.innerText = '<i class="fa fa-trash"></i>';

    todoDiv.appendChild(todoItem);
    todoDiv.appendChild(buttonCheck);
    todoDiv.appendChild(buttonTrash);
    todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
    const item = e.target;
    if (item.clasList[0] === 'trashed-btn') {
        const todo = item.parentElement();
        todo.remove();
    }

    if (item.clasList[0] === 'checked-btn') {
        const todo = item.parentElement();
        item.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
        }
    });
}

function loadLocalTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        addItemToToList(todo);
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
}
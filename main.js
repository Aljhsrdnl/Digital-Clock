



//Selectors
var inputToDo = document.getElementById("input_to_do");
var addButton = document.getElementById("add_button");
var todoList = document.querySelector(".todo-list");
var checkBtn = document.querySelector(".complete-btn");
var filterOption = document.querySelector(".filter-todo"); 

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
document.getElementById("add_button").addEventListener("click", addList);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addList (event) {
    event.preventDefault();
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");
    
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = inputToDo.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add to do to local storage
    saveLocalTodos(inputToDo.value);

    //Check Mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete Mark button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //APPEND to list
    todoList.appendChild(todoDiv);

    //SET inputToDo value to nothing
    inputToDo.value = "";
} 

function deleteCheck (e) {
    const item = e.target;
    //DELETE
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove()
        });
    }
    else if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todoDiv) {
        switch(e.target.value) {
            case "all":
                todoDiv.style.display = "flex";
                break;
            case "completed":
                if (todoDiv.classList.contains('completed')) {
                    todoDiv.style.display = "flex";
                } 
                else {
                    todoDiv.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todoDiv.classList.contains("completed")) {
                    todoDiv.style.display = "flex";
                }
                else {
                    todoDiv.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //CHECK -- to avoid duplications
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos () {
    //CHECK -- to avoid duplications
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");
    
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check Mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete Mark button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //APPEND to list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    var textContent = todo.children[0].innerText;
    todos.splice(todos.indexOf(textContent), 1);
    
    localStorage.setItem("todos", JSON.stringify(todos));
}
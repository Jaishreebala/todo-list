// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");


// event listeners
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos)

// functions

function addToDo(event) {
    // prevent default
    event.preventDefault();
    // TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('item');
    todoDiv.appendChild(newTodo);
    // Add TODO to localstorage
    saveLocalTodos(todoInput.value);
    // checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'> </i>";
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'> </i>";
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton)
    // append todoDiv to ul
    todoList.appendChild(todoDiv);
    // clear todo input value
    todoInput.value = "";
}

function deleteOrCheck(e) {
    const item = e.target;
    // delete to do list
    if (item.classList[0] === 'delete-button') {
        // todoList.remove(); : removes all of them
        // remove the parent element:
        const todoClicked = item.parentElement;
        // falling animation
        todoClicked.classList.add("fall");
        todoClicked.addEventListener('transitionend', function () {
            todoClicked.remove();
        })
        deleteLocalTodos(todoClicked);
    }
    // completed task
    if (item.classList[0] === 'complete-button') {
        const todoClicked = item.parentElement;
        todoClicked.classList.toggle('completed');
        // getCompletedTodos(todoClicked);
    }

}

function filterTodo() {
    const todos = document.querySelectorAll(".todo");
    for (var i = 0; i < todos.length; i++) {
        switch (filterOption.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "complete":
                if (todos[i].classList.contains('completed')) {
                    todos[i].style.display = "flex";
                }
                else {
                    todos[i].style.display = "none";
                }
                break;
            case "incomplete":
                if (!todos[i].classList.contains('completed')) {
                    todos[i].style.display = "flex";
                }
                else {
                    todos[i].style.display = "none";
                }
                break;
        }
    }
    // const todos = todoList.childElements;
    // todos.forEach(function (todo) {
    //     console.log(todo)
    //     switch (e.target.value) {
    //         case "all":
    //             todo.style.display = "flex";
    //             break;
    //         case "complete":
    //             if (todo.classList.contains('completed')) {
    //                 todo.style.display = "flex";
    //             }
    //             else {
    //                 todo.style.display = "none";
    //             }
    //             break;
    //     }
    // })

}

function saveLocalTodos(todo) {
    // CHECK IF TODO LIST ALREADY HAS ITEMS
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteLocalTodos(todo) {
    // CHECK IF TODO LIST ALREADY HAS ITEMS
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const indexTodo = todo.children[0].innerText;

    todos.splice(todos.indexOf(indexTodo), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// function getCompletedTodos(todo) {
//     let completedIndex;
//     if (localStorage.getItem('completedIndex') === null) {
//         completedIndex = [];
//     }
//     else {
//         completedIndex = JSON.parse(localStorage.getItem('completedIndex'));
//     }
//     const todos = document.querySelectorAll(".todo");
//     for (var i = 0; i < todos.length; i++) {
//         if (todos[i].classList.contains('completed')) {
//             console.log(todos[i]);
//             console.log(todo);
//             if (todos[i] === todo)
//                 completedIndex.push(i);
//         }
//         console.log(completedIndex)
//     }
//     localStorage.setItem('completedIndex', completedIndex);
// }

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        // TODO DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('item');
        todoDiv.appendChild(newTodo);
        // checkmark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'> </i>";
        completedButton.classList.add("complete-button");
        todoDiv.appendChild(completedButton);
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-trash'> </i>";
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton)
        // append todoDiv to ul
        todoList.appendChild(todoDiv);
    })

}
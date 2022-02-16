const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos= JSON.parse(localStorage.getItem('todos'))||[];
render();

let maxId=Math.max.apply(Math, todos.map(function(o) { return o.id; }));
let id=maxId>0?maxId:0;


class Todo{
  constructor() {
    this.text = this.getText();
    this.checked=false;
    this.id = id++;
  }

  getText(){
    return prompt("Enter task text:")
  }
}

function newTodo() {
  //get text
  const todo = new Todo();
  todos.push(todo);
  render();
  //createTodoHtml
  //update counts
}

function deleteTodo(id){
  todos = todos.filter(todo => todo.id!==id)
  render();
}

function render(){
  console.log("todos:", todos)
  list.innerHTML='';
  todos.map(todo=>createTodoLi(todo)).forEach(todo=>list.appendChild(todo));
//  console.log(todos.map(todo=>createTodoLi(todo)))
  itemCountSpan.textContent=todos.length;
  uncheckedCountSpan.textContent=todos.filter(todo=>!todo.checked).length

  localStorage.setItem('todos', JSON.stringify(todos))
}

function createTodoLi(todo){
  //create li
  const li = document.createElement('li');

  li.innerHTML = `
       <input type="checkbox" onchange="changeTodo(${todo.id})" ${todo.checked? "checked" : ""}>
       <button onClick = "deleteTodo(${todo.id})">delete</button>
       <span>${todo.text}</span>
       `;
  return li;
}

function changeTodo(id){
  todos=todos.map(todo=>todo.id===id? {...todo, checked:!todo.checked} : todo)
  // for(let i=0;i<todos.length;++i){
  //   if(todos[i].id===id){
  //     todos[i].checked=!todos[i].checked;
  //     break;
  //   }
  // }
  uncheckedCountSpan.textContent=todos.filter(todo=>!todo.checked).length
}

/*
<li>
  <input type="checkbox">
  <button>delete</button>
  <span>Text</span>
*/
let userInput=document.getElementById("userInputTask");
let addButton=document.getElementById("addButton")
let taskContainer=document.getElementById("taskcontainer")

let todos
addButton.addEventListener('click', async function() {
    const newTodo={
        uniqueId:uuid.v4(),
        taskName:userInput.value,
        isChecked:false,
    }


    try{
        const url="http://localhost:3000/todos";
        const options={
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(newTodo),
        }
        const response= await fetch(url,options);
        console.log(response)
        if(response.ok){
            alert("Task Added Successfully....")
            createAndAppendTodo(newTodo)
            userInput.value='';
        }else{
            console.log("response is not okay")
            alert("Error, Task not added")
        }


    }catch(error){
        console.log("catch error")
        console.error("Error",error);
    }
    
});

async function onDeleteTodo(todo, todoId){
    const url=`http://localhost:3000/todos/${todo._id}`

    const options={
        method:"DELETE",
    }
    const response = await fetch(url,options);
    if(response.ok){
        alert("Deleted Successfully")
        const todoEle=document.getElementById(todoId)
        taskContainer.removeChild(todoEle)

    }else{
        alert("Error while deleting the todo item.")
    }
}

async function onTodoStatusChange(checkboxId, labelId,todoId, todo){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    const url=`http://localhost:3000/todos/${todo.uniqueId}`;
    todo.isChecked=!todo.isChecked
    const options={
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(todo),

    }
    const response = await fetch(url, options)
    try{
        if(response.ok){
            
            console.log("checked")
        }else{
            console.log("response is not okay")
        }
    }catch(error){
        console.log("error while changing status")
    }
};
function createAndAppendTodo(todo) {
    let todoId = todo.uniqueId
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId;
  
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    taskContainer.appendChild(todoElement);
  
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked=todo.isChecked;

    inputElement.onclick = function() {
      onTodoStatusChange(checkboxId, labelId,todoId,todo);
    };
  
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);
  
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
  
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.taskName;
    if(todo.isChecked===true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
  
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
  
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  
    deleteIcon.onclick = function () {
      onDeleteTodo(todo,todoId);
    };
  
    deleteIconContainer.appendChild(deleteIcon);
  }
async function FetchTodos(){
    const url="http://localhost:3000/todos";
    const options = {
        method:"GET",
    }
    const response = await fetch(url,options)
    try{
        if(response.ok){
            const todoData= await response.json()
            console.log("Display todo function called..........")
            for(let todo=0;todo<todoData.length;todo++){
                createAndAppendTodo(todoData[todo])
            }

        }else{
            console.log("getting todos error")
        }
    }catch(error){
        console.log(error)
    };
    
    
    
}

FetchTodos()
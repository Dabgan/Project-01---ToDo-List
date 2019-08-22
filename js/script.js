
document.addEventListener('DOMContentLoaded', function(){

    const addForm = document.querySelector('.todo-form');
    const textField = document.querySelector('.text-field');
    const addButton = document.querySelector('.todo-form button');
    const todoList = document.querySelector('.todo-list ul');
    const deleteButtons = document.getElementsByClassName('delete-button');
    const clearButton = document.querySelector('#clear');

    // turning off default submit for form
    addForm.addEventListener('submit', function(e){
        e.preventDefault();
    })

    // function that creates and add new list elements
    function createNewItem(){
        const newListItem = document.createElement('li');
        const newDeleteButton = document.createElement('div');
        newListItem.classList.add('todo-item');
        newDeleteButton.classList.add('delete-button');
        newDeleteButton.innerText = 'x';
        newListItem.innerText = textField.value;

        todoList.appendChild(newListItem);
        newListItem.appendChild(newDeleteButton);
        console.log(deleteButtons.length);
    };

    // function that adds self destruction functionality to list elements
    function selfDestruction(){
        deleteButtons[deleteButtons.length-1].addEventListener('click', function(){
            this.parentElement.parentElement.removeChild(this.parentElement);
        });
    };
 
    // Button which adds new elements to the list
    addButton.addEventListener('click', function(){
        createNewItem();  
        selfDestruction();
    });
    
    // Button which clears the whole list
    clearButton.addEventListener('click', function(){
        while(todoList.firstElementChild){
            todoList.removeChild(todoList.firstElementChild);
        }
    });
    

});
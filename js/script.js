
document.addEventListener('DOMContentLoaded', function(){

    const addForm = document.querySelector('.todo-form');
    const textField = document.querySelector('.text-field');
    const addButton = document.querySelector('.todo-form button');
    const todoList = document.querySelector('.todo-list ul');
    const deleteButtons = document.getElementsByClassName('delete-button');

    addForm.addEventListener('submit', function(e){
        e.preventDefault();
    })

    function createNewItem(){
        const newListItem = document.createElement('li');
        const newDeleteButton = document.createElement('div');
        newListItem.classList.add('todo-item');
        newDeleteButton.classList.add('delete-button');
        newDeleteButton.innerText = 'x';
        newListItem.innerText = '123';

        todoList.appendChild(newListItem);
        newListItem.appendChild(newDeleteButton);
        console.log(deleteButtons.length);
    };

    function selfDestruction(){
        deleteButtons[deleteButtons.length-1].addEventListener('click', function(){
            this.parentElement.parentElement.removeChild(this.parentElement);
        });
    };

    addButton.addEventListener('click', function(){
        createNewItem();  
        selfDestruction();
    });

    deleteButtons[deleteButtons.length-1].addEventListener('click', function(){
        alert(this);
    });
    
    

});
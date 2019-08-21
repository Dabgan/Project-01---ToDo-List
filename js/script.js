
document.addEventListener('DOMContentLoaded', function(){

    const addForm = document.querySelector('.todo-form');
    const textField = document.querySelector('.text-field');
    const addButton = document.querySelector('.todo-form button');
    const todoList = document.querySelector('.todo-list ul');


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

    };

    addButton.addEventListener('click', function(){

        createNewItem();
    });


});
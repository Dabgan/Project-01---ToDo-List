
document.addEventListener('DOMContentLoaded', function(){

    const addForm = document.querySelector('.todo-form');
    const textField = document.querySelector('.text-field');
    const addButton = document.querySelector('.todo-form button');
    const todoList = document.querySelector('.todo-list ul');
    const deleteButtons = document.getElementsByClassName('delete-button');
    const clearButton = document.querySelector('#clear');
    const search = document.querySelector('#search');

    // turning off default submit for form
    addForm.addEventListener('submit', function(e){
        e.preventDefault();
    })

    // function that creates and add new list elements
    function createNewItem(){
        const newListItem = document.createElement('li');
        const newDeleteButton = document.createElement('div');
        const itemPosition = document.createElement('span');
        const itemText = document.createElement('span');
        const itemContainer = document.createElement('div');
        
        newListItem.classList.add('todo-item');
        newDeleteButton.classList.add('delete-button');
        itemPosition.classList.add('item-position');
        itemText.classList.add('item-text');
        itemContainer.classList.add('item-container');
        newDeleteButton.innerText = 'x';

        todoList.appendChild(newListItem);
        newListItem.appendChild(itemContainer)
        itemContainer.appendChild(itemPosition);
        itemContainer.appendChild(itemText);
        newListItem.appendChild(newDeleteButton);
        

        if (textField.value == ''){
            newListItem.querySelector('.item-position').innerText = deleteButtons.length + '.';
            newListItem.querySelector('.item-text').innerText = textField.getAttribute('placeholder');
        } else {
            newListItem.querySelector('.item-position').innerText = deleteButtons.length + '.';
            newListItem.querySelector('.item-text').innerText = textField.value;
        }
        // clearing input at the end
        textField.value = '';
    };

    // function that adds self destruction functionality to list elements
    function selfDestruction(){
        deleteButtons[deleteButtons.length-1].addEventListener('click', function(){
            this.parentElement.parentElement.removeChild(this.parentElement);
            appendNumeration();
        });
    };

    // function that correctly append right number to list items
    function appendNumeration(){
        for (let i=0; i < todoList.children.length; i++){
            const itemPosition = todoList.children[i].querySelector('.item-position');
            itemPosition.innerText = i+1 + '.';;
        }
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

    // Input area which search through our list
    search.addEventListener('keyup', function(){
        
        for (const li of todoList.children){
            if (li.textContent.toLowerCase().indexOf(search.value.toLowerCase()) == -1){
                li.classList.add('disable');
            } else {
                li.classList.remove('disable');
            }
        };      

    })
});
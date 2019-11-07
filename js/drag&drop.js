
document.addEventListener('DOMContentLoaded', function(){

    const ul = document.querySelector('ul');

    // currently dragged item
    let draggedItem = null;

    // dragable item listeners - for item being dragged
    ul.addEventListener('dragstart', dragStart);
    ul.addEventListener('dragend', dragEnd);

    // dragable item listeners - for item that is being hovered / dropped on
    ul.addEventListener('dragenter', dragEnter)
    ul.addEventListener('dragover', dragOver)
    ul.addEventListener('dragleave', dragLeave)
    ul.addEventListener('drop', drop)

    // functions for items being dragged
    function dragStart(e){
        item = e.target;
        draggedItem = item;
        setTimeout(() => {
            item.classList.add('hidden')
            
    },0) 
    }

    function dragEnd(e){
        item = e.target;
        setTimeout(() => {
            item.classList.remove('hidden')
            draggedItem = null;
        },0)  
    }

    // functions for for item that is being hovered / dropped on
    function dragEnter(e) {
        item = e.target;
        e.preventDefault();
        if (item.classList.contains('todo-item')){
            item.classList.add('hovered');
        }
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragLeave(e) {
        item = e.target;
        e.preventDefault();
        if (item.classList.contains('todo-item')){
            item.classList.remove('hovered');
        }
    }

    function drop(e) {
        item = e.target;
        e.preventDefault();
        if (item.classList.contains('todo-item')){
            item.classList.remove('hovered');
            item.before(draggedItem);
        } else if (item.parentElement.classList.contains('todo-list')){
            ul.append(draggedItem);
        }
    }


   
})
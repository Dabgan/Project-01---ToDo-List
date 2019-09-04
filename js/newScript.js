
document.addEventListener('DOMContentLoaded', function(){

    // anchors
    const form = document.querySelector('form');
    const toDoForm = document.querySelector('.todo-form');
    const ul = document.querySelector('ul');
    const button = document.querySelector('#addButton');
    const textField = document.querySelector('.text-field');
    const clearButton = document.querySelector('#clear');
    const search = document.querySelector('#search');
    const displayDate = document.querySelector('.current-date');
    const infoButton = document.querySelector('#info');
    const infoText = document.querySelector('.information');
    
    const check = 'fa-check-circle';
    const uncheck = 'fa-circle';
    const lineThrough = 'lineThrough';
    

    // variables
    let list;
    let id;

    // add item to function
    const addToDo = function(toDo, id, done, trash){
      if(trash){ return; }
      const itemDone = done ? check : uncheck;
      const itemDoneBackground = done ? 'checked' : 'unchecked';
      const itemLineThrough = done ? lineThrough : '';
      const item = `
                    <li class='todo-item ${itemDoneBackground}'>
                      <i class="icon1 far ${itemDone}" data-job='complete' id="${id}"></i>
                      <p class="text ${itemLineThrough}" data-job='edit'>${toDo}</p>
                      <i class="icon1 fas fa-trash delete-button" data-job='delete' id="${id}"></i>
                    </li>
                    `;
      const position = 'beforeend';
      ul.insertAdjacentHTML(position, item);
    };

    // get item from local storage
    const data = localStorage.getItem('items');

    // check if data is not empty
    if (data){
      list = JSON.parse(data);
      id = list.length;
      loadList(list);
    } else {
      list = [];
      id = 0;
    }

    // load our list from localstorage
    function loadList(array){
      array.forEach(element => {
        addToDo(element.name, element.id, element.done, element.trash);
      });
    }

    // preventing the form from its initial submit event
    form.addEventListener('submit', function(e) {
      e.preventDefault();
    });

    toDoForm.addEventListener('submit', function(e) {
      e.preventDefault();
    });

    
    
    // add an item
    button.addEventListener('click', function(){
      const toDo = textField.value;
      if(toDo) {
        addToDo(toDo, id, false, false);
        list.push({
          name : toDo,
          id : id,
          done : false,
          trash : false
        });
        // add item to local storage
        localStorage.setItem('items', JSON.stringify(list));
        id++;
      } else {
        const emptyField = textField.getAttribute('placeholder');
        addToDo(emptyField, id, false, false);
        list.push({
          name : emptyField,
          id : id,
          done : false,
          trash : false
        });
        // add item to local storage
        localStorage.setItem('items', JSON.stringify(list));
        id++;
      }
      textField.value = '';
    });

    // complete toDo
    function completeToDo(el){
      el.classList.toggle(check);
      el.classList.toggle(uncheck);
      el.nextElementSibling.classList.toggle(lineThrough);
      list[el.id].done = list[el.id].done ? false : true;
      el.parentElement.classList.toggle('checked');
      el.parentElement.classList.toggle('unchecked');
    }

    // delete toDo
    function deleteToDo(el){
      el.parentElement.parentElement.removeChild(el.parentElement);
      list[el.id].trash = true;
    }

    // target items created dynamically
    ul.addEventListener('click', function(event){
      const clickedElement = event.target; // return clicked element
      const clickedElementJob = clickedElement.dataset.job;

      if (clickedElementJob == 'complete'){
          completeToDo(clickedElement);
      } else if (clickedElementJob == 'delete'){
          deleteToDo(clickedElement);
      }
        // add item to local storage
        localStorage.setItem('items', JSON.stringify(list));
    });

  
    // target items created dynamically and add editability to items
    ul.addEventListener('dblclick', (event) => {
      const clickedItem = event.target;
      const clickedElementJob = clickedItem.dataset.job;
      const value = clickedItem.textContent;
      if (clickedElementJob == 'edit'){
       clickedItem.outerHTML =  `<input class="text " data-job="edit" value='${value}'></input>`;
      }
    });

    // target items created dynamically and check if they are input fields, if so get the value when enter pressed
    ul.addEventListener('keypress', function pressEnter(event){
      if (event.keyCode == 13){
        saveChanges(event);
      }
      
    }, false);
    // target items created dynamically and check if they are input fields, if so get the value when loose focus
    ul.addEventListener('focusout', function looseFocus(event){
      saveChanges(event);
    });


    function saveChanges(event){
      const clickedItem = event.target;
      if (clickedItem.hasAttribute('value')){
          const newInput = document.querySelector('[value]');
          const newInputValue = document.querySelector('[value]').getAttribute('value');
          const listItem = list[clickedItem.previousElementSibling.id];
          if(!newInput.value == ''){
          clickedItem.outerHTML =  `<p class="text " data-job="edit">${newInput.value}</p>`;
            listItem.name = newInput.value;
          } else {
            clickedItem.outerHTML =  `<p class="text " data-job="edit">${newInputValue}</p>`;
          }
      }
      localStorage.setItem('items', JSON.stringify(list));
    };


    // Button which clears the whole list
    clearButton.addEventListener('click', function() {
      localStorage.clear();
      location.reload();
    });

    // Input area which search through our list
    search.addEventListener('keyup', function(){
      for (const li of ul.children){
          if (li.querySelector('p').textContent.toLowerCase().indexOf(search.value.toLowerCase()) == -1){
              li.classList.add('disable');
          } else {
              li.classList.remove('disable');
          }
      }
  });

    // function that adds leading zeros if they are required (to date, to hours etc.)
    function leadingZero(i){
      return (i<10) ? '0' + i : i;
    }

    // function that will add current date to app
    function addDate(){
      const currentDate = new Date();
      const days = ['Sunday','Monday','Tuesday','Thursday','Friday','Saturday'];
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      displayDate.textContent = `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${leadingZero(currentDate.getDate())}`
    }


    // shows div with information
    function displayInfo(item){
      item.addEventListener('mousedown', function(){
        infoText.classList.remove('disable');
      })
      item.addEventListener('mouseup', function(){
        infoText.classList.add('disable');
      })
    }
    displayInfo(infoButton);
    addDate();

});
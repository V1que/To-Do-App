
const clear = document.querySelector (".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK ="fa-check-circle";
const UNCHECK ="fa-circle";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, //= [],
 id ;//= 0;
//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not  empty ie if user has used the app before
if(data){
    LIST=JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
} else{
    //if data is empty meaning this is the first time the user is using our interface
LIST =[];
id = 0;
}
//load items to the user interface using a function that shows it to the user
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });

}
//clear the localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//show today's date
const options = {weekday : "long", day:"numeric", month:"short",year:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-GB", options);

//add to do function
function addToDo(toDo, id, done, trash){
    if(trash){return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item" ${id} >
    <i class="fa-regular fa-circle ${DONE} com" job="complete" id ="${id}"></i>
<p class="text ${LINE}">${toDo}</p>
<i class="fa-regular fa-trash-can de"  job="delete" id="${id}"></i>
</li>   
    `;
    
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
   
}


const addItem = document.getElementById("add-btn");
addItem.addEventListener("click",function(event) {
  
            const toDo = input.value;
     

        
//if the input isnt empty
if (toDo){
    addToDo(toDo, id, false, false);

    LIST.push({
        name: toDo,
        id :id,
        done : false,
        trash : false
    });
//add item from localstorage(this code MUST be added everwhere the LIST array is updated)
localStorage.setItem("TODO", JSON.stringify(LIST));
    id ++;
    input.value= "";
}
});
//complete to do

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    
    LIST[element.id].done=LIST[element.id].done ? false : true;
}
//update list array
//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash =true ;
}

//target the items created dynamically 
list.addEventListener("click", function(event){
    const element =event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item from localstorage(this code MUST be added everwhere the LIST array is updated)
localStorage.setItem("TODO", JSON.stringify(LIST));
});
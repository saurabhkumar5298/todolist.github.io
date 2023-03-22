let tasks =[];
//getting html elements based on their ID's
const tasklist = document.getElementById('task-list');
const addTaskInput = document.getElementById('input-task');
const taskCOunter = document.getElementById('task-counter');
const addbutton = document.getElementById('add-button');

//This function is used to add tasks to browser page
function addTaskToDOM(task){
    const li = document.createElement('li');

    /*Creating List element to whiich we add task name, 
    checkbox to know whether task is completed and delete option*/
    li.innerHTML=`
    <div>
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    </div>
    <i class="delete fa-solid fa-trash" data-id="${task.id}"></i>
    `;
    tasklist.append(li);
}

//This function calls the addTaskToDOM function by passing each tak details as argument
function renderList(){
    tasklist.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
    taskCOunter.innerHTML=tasks.length;
};
//This function will add each task to the tasks list
function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        return;
    }
}

//This function is used to delete task and it will be trggered when users clicks on delee button
function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id != Number(taskId);
    })
    tasks=newTasks;
    renderList();
}

//We can toggle the completed status of task using this function
function toggleTask(taskId){
    const toggleTasks= tasks.filter(function(task){
        return task.id==Number(taskId)
    });
    if(toggleTasks.length>0){
        const currentTask = toggleTasks[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        if(document.getElementById('uncompleted').style.color=='black'){
            renderUncompleteList();
        }
        else if(document.getElementById('completed').style.color=='black'){
            renderCompleteList();
        }
        return;
    }
}

/*This function will hide the add button when there is no content in input section 
and will dislay it only when there is some data*/
function typing(){
    if(addTaskInput.value!=""){
        addbutton.classList.replace('add-btn','add-button-active');
    }else{
        addbutton.classList.replace('add-button-active','add-btn');
    }
}


//This function will be triggered when user clicks on uncompleted in footer section and display alll uncompleted tasks
function renderUncompleteList(){
    tasklist.innerHTML='';
    const uncompleted_tasks = tasks.filter(function(task){
        return task.completed != true;
    })
    for(let i=0;i<uncompleted_tasks.length;i++){
        addTaskToDOM(uncompleted_tasks[i]);
    }
    taskCOunter.innerHTML=uncompleted_tasks.length;
}

//This function will be triggered when user clicks on completed in footer section and display alll completed tasks
function renderCompleteList(){
    tasklist.innerHTML='';
    const completed_tasks = tasks.filter(function(task){
        return task.completed == true;
    })
    for(let i=0;i<completed_tasks.length;i++){
        addTaskToDOM(completed_tasks[i]);
    }
    taskCOunter.innerHTML=completed_tasks.length;
}

//This function will mark all tasks as completed when user clicks on complete-all in header section
function completeAllTasks(){
    for(let i=0;i<tasks.length;i++){
        tasks[i].completed=true;
    }
    renderList();
}

//This function will delete all completed task and display on uncompleted tasks.
function clearCompletedTasks(){
    const uncompletedTasksList = tasks.filter(function(task){
        return task.completed !=true;
    })
    tasks=uncompletedTasksList;
    renderList();
}

//This function will update the task object withe task name given by user and also add unique ID.
function handleAddButton(){
    const text = addTaskInput.value;
    const task ={
        title : text,
        id : Date.now(),
        completed : false
    }
    addTaskInput.value="";
    addTask(task);
    typing();
}

//This function will evaluate on what element did user clicked and will call the respectve function to perform that event.
function handleClickListener(e){
    const target = e.target;
    if(target.className == 'delete fa-solid fa-trash'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className=='custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
    else if(target.id == 'uncompleted'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('uncompleted').style.color = 'black';
        renderUncompleteList();
        return;
    }
    else if(target.id == 'all'){
        document.getElementById('all').style.color = 'black';
        document.getElementById('completed').style.color = 'grey';
        document.getElementById('uncompleted').style.color = 'grey';
        renderList();
        return;
    }
    else if(target.id == 'completed'){
        document.getElementById('all').style.color = 'grey';
        document.getElementById('completed').style.color = 'black';
        document.getElementById('uncompleted').style.color = 'grey';
        renderCompleteList();
        return;
    }
    else if(target.id == 'complete-all'){
        completeAllTasks();
        return;
    }
    else if(target.id =='clear-complete'){
        clearCompletedTasks();
        return;
    }
}

addbutton.addEventListener('click',handleAddButton);
document.addEventListener('click',handleClickListener);

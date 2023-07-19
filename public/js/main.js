
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')


Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})


// markComplite



async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/list/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('/list/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// Constructor for del

class Del {
    constructor(selector, route) {
        const btns = document.querySelectorAll(selector);
        this.route = route
        Array.from(btns).forEach((el)=>{
            el.addEventListener('click', (event) => this.deleteTodo(event))
        })
        
    }

    async deleteTodo(){
        const todoId = event.target.parentNode.dataset.id
        try{ 
            const response = await fetch(`${this.route}`, {
                method: 'delete',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'todoIdFromJSFile': todoId
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()
        }catch(err){
            console.log(err)
        }
    }
    
}

const delList = new Del('.del','/list/deleteTodo')
const  deltest = new Del('.obrisi','/checklists/deleteChecklist')
const  delFolderdsds = new Del('.delFolder','/checklists/deleteFolder')


// reset checklists 



const rsChecklist = document.querySelector('#list-reset')

rsChecklist.addEventListener('click', function() {
    resetChecklist();
});

async function resetChecklist(){
    try{ 
       const checklistId = window.location.pathname.split('/')[2];
        const response = await fetch(`/list/${checklistId}/resetChecklist`, {
            method: 'PUT'
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch(err){
        console.log(err);
    }
}


// copy checklist



const copyChecklistButton = document.getElementById('copy-checklist');
const copyChecklistForm = document.getElementById('copy-checklist-form');
const overlay = document.getElementById('overlay');

copyChecklistButton.addEventListener('click', () => {
  copyChecklistForm.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

overlay.addEventListener('click', () => {
  copyChecklistForm.classList.add('hidden');
  overlay.classList.add('hidden');
});
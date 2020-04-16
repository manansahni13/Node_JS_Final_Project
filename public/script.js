let submit = document.getElementById('submit')

let selectedSortElement = document.querySelector('#sort')
let sortbtn = document.getElementById('sortbtn')

function dynamicsort(property,order) {
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1 * sort_order;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        // a and b are the same
        }else{
                return 0 * sort_order;
        }
    }
}
// sortbtn.onclick = 
async function sort(){
    const resp = await fetch('/todos', { method: 'GET' })
    const todos = await resp.json()
    const len = todos.length - 1;
    if(selectedSortElement.value === 'priority'){
        todos.sort(dynamicsort('priority',"asc"))
    }
    else if(selectedSortElement.value === 'status'){
     
    }else if(selectedSortElement === 'duedate'){

    }
   
    
    console.log(todos)
    console.log(typeof todos)
    console.log(todos[0].priority)
    // const keys = Object.keys(todos)
    // console.log(keys)
    // const values = Object.values(todos)
    // console.log(values)
    // const entries = Object.entries(todos)
    // console.log(entries)
    // let arr=[]
    // console.log(todos[0].title)
    // for(let [key,value] of Object.entries(todos)){
    //     console.log(key,value)
       
    //     arr.push(value.priority)
    // }

    // console.log(arr)
    todos.sort(dynamicsort('status',"desc"))
    console.log(todos)

}
submit.onclick = function () {
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const status = document.getElementById('status').value
  const duedate = document.getElementById('duedate').value
  const priority = document.getElementById('priority').value
  const note = document.getElementById('note').value

  addNewTodoJson(title, description, duedate, status, priority, note)
}


async function getTodos() {
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
  console.log(todos)

  for (const element in todos) {
    // console.log(`${element}: ${todos[element]}`);

    var ul = document.getElementById('tasklist')

    var li = document.createElement("li");
    li.setAttribute('id', todos[element].title);
    li.setAttribute('class', 'expandable')
    li.appendChild(document.createTextNode(todos[element].title));
    ul.appendChild(li);
  }

  return todos
}

async function addTodosList() {
  const resp = await fetch('/todos', { method: 'GET' })
  const todos = await resp.json()
  const len = todos.length - 1;
  console.log(len)
  var ul = document.getElementById('tasklist')

  var li = document.createElement("li");
  li.setAttribute('id', todos[len].title);
  li.appendChild(document.createTextNode(todos[len].title));
  ul.appendChild(li);
}

async function addNewTodoUrlEncoded(task, done, due) {
  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `task=${task}&done=${done}&due=2020-04-05`
  })
}

async function addNewTodoJson(title, description, duedate, status, priority, note) {

  const resp = await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description, duedate, status, priority, note })
  })

  addTodosList()

}

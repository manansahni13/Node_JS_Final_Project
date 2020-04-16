async function getSortedTodos(){
 
    const sort = document.getElementById('sortBy').value
    console.log(sort)
    const resp = await fetch('/todos/' + sort, { method: 'GET' })
    console.log(resp)
    const todos = await resp.json()
    console.log(todos)
    var ul = document.getElementById('menu')
    ul.innerHTML = ''
    for (const element in todos) {
        var li = document.createElement("li");
        li.setAttribute('id', todos[element].title);
        li.appendChild(document.createTextNode(todos[element].title));
        ul.appendChild(li);
    }
}
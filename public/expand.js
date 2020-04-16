var uniqueid;

async function todosLoader() {

    const sort = document.getElementById('sortBy').value
    // console.log(sort);

    const resp = await fetch('/todos/' + sort, { method: 'GET' })
    const todos = await resp.json()
    let temp = []

    for (const element in todos) {

        task = {
            id: todos[element].id,
            title: todos[element].title,
            sub: [{
                title: 'description: ' + todos[element].description,
                sub: null
            }, {
                title: 'status: ' + todos[element].status,
                sub: null

            }, {
                title: 'duedate: ' + todos[element].duedate,
                sub: null

            }, {
                title: 'priority: ' + todos[element].priority,
                sub: null

            }, {
                title: 'note: ' + todos[element].note,
                sub: null
            }]
        }
        temp.push(task)
    }
    // console.log(task)

    var JSON = { menu: temp }
    console.log(temp)

    $(function () {
        var ul = document.getElementById('menu')
        ul.innerHTML = ''
        function parseMenu(ul, menu) {

            for (var i = 0; i < menu.length; i++) {
                var li = $(ul).append(
                    '<li class=' + (menu[i].sub ? 'multi' : 'simple') + '>' + menu[i].title
                    + '</li>');

                if (menu[i].sub != null) {
                    let idforli = menu[i].id
                    var subul = $('<ul class="list"></ul>');
                    $(li).append(subul);

                    // console.log(idforli)
                   
                    var updateButton = $("<input type='button' value='Press me to update!' class='btn btn-danger update' id = 'updatebtn" + idforli + "' data-toggle='modal' data-target='#signup' style='margin-left:650px;'>")
                    // var updateButton = $("<input type='button' onclick= 'goto('#modal-body')' value='Press me to update!' class='btn btn-danger update' id = 'updatebtn" + idforli + "' data-toggle='modal' data-target='#signup' style='margin-left:650px;'>")
                    $(li).append(updateButton);

                    parseMenu($(subul), menu[i].sub);
                }
            }
        }

        var menu = $('#menu');
        parseMenu(menu, JSON.menu);
    });
};

$(document).on('click', '.list > li ', function () {
    $(this).next('ul').toggle(200);
    if (($(this).next('ul').length)) {
        $(this).toggleClass('multi-opened');
    }
})


$(document).on('click', '.update', function () {

    uniqueid = $(this).attr("id")
    console.log(uniqueid)

});


$(document).on('click', '#editDetails', async function () {
    console.log(uniqueid)
    let update_duedate = $("#update_duedate").val()
    console.log(update_duedate)
    let update_priority = $("#update_priority").val()
    
    let update_statusComplete = $('#update_complete').is(":checked")
    let update_status = update_statusComplete ? "1-complete" : "2-incomplete"

    const resp = await fetch('/todos/' + uniqueid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({ update_duedate, update_priority, update_status })
    })
})
$(window).load(
  async function () {
      const resp = await fetch('/todos', { method: 'GET' })
      const todos = await resp.json()
      console.log(todos)
      let temp = []

      for (const element in todos) {

          task = {
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
      // console.log(task.sub)
      

      var JSON = { menu: temp }
      console.log(JSON)


      $(function () {

          function parseMenu(ul, menu) {
              for (var i = 0; i < menu.length; i++) {
                  var li = $(ul).append(
                      '<li class=' + (menu[i].sub ? 'multi' : 'simple') + '>' + menu[i].title
                      + '</li>');
                  if (menu[i].sub != null) {
                      console.log("submenu")
                      console.log(menu[i].sub)
                      var subul = $('<ul class="list"></ul>');
                      $(li).append(subul);
                      parseMenu($(subul), menu[i].sub);
                  }
              }
          }

          var menu = $('#menu');
          parseMenu(menu, JSON.menu);
      });
  });//]]>​


$(document).on('click', '.list > li ', function () {
  $(this).next('ul').toggle(200);
  if (($(this).next('ul').length)) {
      $(this).toggleClass('multi-opened');
  }
})
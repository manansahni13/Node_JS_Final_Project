const { Router } = require('express')
const { Todos } = require('../db')

const route = Router()

route.get('/:orderby', async(req, res) => {
    // const sort = document.getElementById('sortby').value
    // console.log("#########")
    const sort = req.params.orderby;
    // console.log(sort)
    if(sort === "duedate" || sort === "status"){
    const todos = await Todos.findAll({
        order: [
            [sort, 'DESC']
        ]
    })
    res.send(todos)
  }else if(sort === "priority"){
    const todos = await Todos.findAll({
        order: [
            [sort, 'ASC']
        ]
    })
    res.send(todos)
  }
})

route.get('/', async (req, res) => {
    const todos = await Todos.findAll()
    res.send(todos)
  })

route.get('/:id',async (req,res)=>{
    if(isNaN(Number(req.params.id))){
        return res.status(400).send({
            error: 'Todo ID must be an integer'
        })
    }

    const todo = await Todos.findByPk(req.params.id)

    if(!todo){
        return res.status(404).send({
            error: " No Todo found with id = " + req.params.id
        })
    }
    res.send(todo)
})
route.get('/:id/notes',async(req,res)=>{
    if(isNaN(Number(req.params.id))){
        return res.status(400).send({
            error: 'Todo ID must be an integer'
        })
    }
    const todo = await Todos.findByPk(req.params.id)

    if(!todo){
        return res.status(404).send({
            error: " No Todo found with id = " + req.params.id
        })
    }
    // console.log(todo.notes)
    // console.log(typeof todo.notes)
    res.send(todo.notes)
})
route.post('/:id/notes',async(req,res) => {
    if(isNaN(Number(req.params.id))){
        return res.status(400).send({
            error: 'Todo ID must be an integer'
        })
    }
    const todo = await Todos.findByPk(req.params.id)

    // console.log(typeof todo.notes)
    const stringToAppend = ', ' + req.body.notes
    
    todo.notes += stringToAppend
    console.log(todo.notes)
    console.log('**********')
    console.log(typeof req.body.notes)
    await todo.save()
    res.status(201).send({success: 'New Notes Added', data: todo})
  
})
route.patch('/:id',async (req,res)=>{
    console.log("patch hit")
    if(isNaN(Number(req.params.id))){
        return res.status(400).send({
            error: 'Todo ID must be an integer'
        })
    }

    const todo = await Todos.findByPk(req.params.id)

    if(!todo){
        return res.status(404).send({
            error: " No Todo found with id = " + req.params.id
        })
    }

        if(todo.title !== req.body.title){
            todo.title = req.body.title
        }else if(todo.desciption !== req.body.description){
        todo.description = req.body.description}
        else if(  todo.duedate !== req.body.duedate){
        todo.duedate =  req.body.duedate}
        else if(todo.priority!== req.body.priority){
        todo.priority =  req.body.priority}
        else if(todo.status !== req.body.status){
        todo.status= req.body.status}
        else if(todo.note !== req.body.note){
        todo.note =req.body.note}
             //db save
             await todo.save()
    res.status(201).send({success:"Updated Successfully",data:todo})
})
route.post('/',async(req,res) => {
    if(typeof req.body.title !== 'string'){
        return res.status(400).send({error: 'Task name was not provided'})
    }
    if(req.body.status === 'completed'){
        req.body.status = 'completed'
    }else{
        req.body.status = 'incomplete'
    }

    const newTodo = await Todos.create({
        title: req.body.title,
        description: req.body.description,
        duedate: req.body.duedate,
        priority: req.body.priority,
        status: req.body.status,
        note:req.body.note,
    })

    res.status(201).send({success: 'New Task has been added', data: newTodo})
})



module.exports = route
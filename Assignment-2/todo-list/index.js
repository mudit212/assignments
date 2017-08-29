var express=require('express');
var bodyparser=require('body-parser');

var urlencoded=bodyparser.urlencoded({extended:false});

var todo_db=require('./seed');
var app=express();

console.log(todo_db);
app.listen(3010,'127.0.0.1');

app.use('/',express.static(__dirname+'/public'));


//Interaction we make with the server
//1.Get all Todo
//2.Add a todo
//3. Delete a todo
//4. Complete a todo


//Restfull api

app.use('/',urlencoded);

app.get('/api/todos',function(req,res)
{
    res.json(todo_db.todos);
});


app.get('/api/todos/active',function (req,res) {

    var active={};

    for(var status in todo_db.todos)
    {
        if(todo_db.todos[status].status==todo_db.StatusENUMS.ACTIVE)
        {
            active[status]=todo_db.todos[status];
        }
    }

    res.json(active);
});

app.get('/api/todos/delete',function (req,res) {

    var del={};

    for(var status in todo_db.todos)
    {
        if(todo_db.todos[status].status==todo_db.StatusENUMS.DELETED)
        {
            del[status]=todo_db.todos[status];
        }
    }

    res.json(del);

});

app.get('/api/todos/complete',function (req,res) {

    var complete={};

    for(var status in todo_db.todos)
    {
        if(todo_db.todos[status].status==todo_db.StatusENUMS.COMPLETE)
        {
            complete[status]=todo_db.todos[status];
        }
    }

    res.json(complete);

});

app.put('/api/todos/complete/:id',function(req,res){

    var id=req.params.id;
    var todo=todo_db.todos[id];

    todo.status=todo_db.StatusENUMS.COMPLETE;

    res.json(todo_db.todos);

});

app.put('/api/todos/active/:id',function(req,res){

    var id=req.params.id;
    var todo=todo_db.todos[id];

    todo.status=todo_db.StatusENUMS.ACTIVE;

    res.json(todo_db.todos);

});
app.get('/api/todos/active',function (req,res) {

    var active={};

    for(var status in todo_db.todos)
    {
        if(todo_db.todos[status].status==todo_db.StatusENUMS.ACTIVE)
        {
            active[status]=todo_db.todos[status];
        }
    }

    res.json(active);
});

app.delete('/api/todos/:id',function(req,res)
{
   var id=req.params.id;
   var obj=todo_db.todos[id];

   if(!obj){
       res.status(400).json({error:'ToDo does not exist'});
   }
   else
   {
       obj.status=todo_db.StatusENUMS.DELETED;
       res.json(todo_db.todos);
   }

});

app.post('/api/todos',function(req,res) {
    var todo = req.body.todo_title;

    if (!todo || todo == "" || todo.trim() == "") {
        res.status(400).json({error: 'ToDo title can\'t be empty'});
    }
    else {
        var new_todo = {
            title: req.body.todo_title,
            status: todo_db.StatusENUMS.ACTIVE
        };

        todo_db.todos[todo_db.next_todo_id++] = new_todo;
        res.send(todo_db.todos);
    }
});


app.put('/api/todos/:id',function(req,res)
{
    var id=req.params.id;
    var todo=todo_db.todos[id];

    if(!todo){
        res.status(400).json({error:'ToDo does not exist'});
    }
    else
    {
        var todo_title=req.body.todo_title;

        if (todo_title && (todo_title != null || todo_title.trim() != ""))
        {
            todo.title=todo_title;
        }

        var todo_status=req.body.todo_status;

        if(todo_status && (todo_status==todo_db.StatusENUMS.COMPLETE || todo_status==todo_db.StatusENUMS.ACTIVE))
        {
            todo.status=todo_status;
        }

        res.json(todo_db.todos);
    }

});


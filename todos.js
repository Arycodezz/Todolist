const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let arr = [{
    id: 1,
    text: "Here you can create your own todo :) Developer: Aryan Ranjan"
},
];
let count = 1;
app.get('/todos', (req, res) => {
    res.render('todos', { arr });
})
app.get('/todos/new', (req, res) => {
    res.render('Ctodos');
})
app.post('/todos', (req, res) => {
    const { text } = req.body;
    count++;
    arr.push({ id: count, text });
    res.redirect('/todos');
})
app.get("/todos/:id/edit", (req, res) => {
    const { id } = req.params;
    const todo = arr.find(a => a.id === parseInt(id));
    res.render('Etodos',{id: todo.id,txt: todo.text});
})
app.patch('/todos/:id',(req,res) => {
    const { id } = req.params;
    const todo = arr.find(a => a.id === parseInt(id));
    const newTodo = req.body.text;
    todo.text = newTodo;
    res.redirect('/todos');
})
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    arr = arr.filter(a => a.id !== parseInt(id));
    res.redirect('/todos');
})

app.listen(500, () => {
    console.log("We will see you at port 500");
})
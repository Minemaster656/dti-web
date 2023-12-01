// const http = require('http')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');
const { compileFunction } = require('vm')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))


// Парсер для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose');

// Подключение к MongoDB

const PORT = 3003
const HOST = 'localhost' //127.0.0.1

const HTML_PATH = __dirname+ '/templates/'


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/user/:name', (req, res) => {
    res.render(`user`, {name : req.params.name})
})
app.get('/projects', (req, res) => {
    res.render('projects')

})
app.get('/atk', (req, res) => {
    res.render('atk')
})
app.get('/atk/database', (req, res) => {
    res.render('atk_database')
})
app.get('/employee', (req, res) => {
    res.render('employee')
})
app.get('/fullstack', (req, res) => {
    res.render('test_fullstack')
})
app.get('/content', (req, res) => {
    res.render('content')
})
app.get('*', (req, res) => {
    res.status(404).render('error')
})

// Обработка отправки формы
app.post('/findCharacter', (req, res) => {
    const { inputText } = req.body;
    
    // Здесь ты можешь обработать данные, например, сделать какие-то вычисления
    
    // Возвращаем результат обработки в формате JSON
    res.json({ result: `Результат: ${inputText}` });
  });





app.listen(PORT, ()=>{
    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`)


})



// let server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    
//     if(req.url=='/')
//         fs.createReadStream('./templates/index.html').pipe(res)
//     else if (req.url=='/about')
//         fs.createReadStream('./templates/about.html').pipe(res)
//     else
//         fs.createReadStream('./templates/error.html').pipe(res)

// })



// server.listen(PORT, HOST, ()=>{

//     console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`)
// })


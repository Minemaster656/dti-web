// const http = require('http')
const fs = require('fs')
const express = require('express')
const { compileFunction } = require('vm')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))

const PORT = 443
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
app.get('*', (req, res) => {
    res.status(404).render('error')
})


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


// const http = require('http')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser');
const { compileFunction } = require('vm')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))



// Подключение к MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RTB_data', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  bodystats: String,
  abilities: String,
  weaknesses: String,
  character: String,
  inventory: String,
  bio: String,
  appearances: String,
  art: String,
  shortened: String,
  id: String,
  owner: Number

});
const Charc = mongoose.model('characters', userSchema);





// Парсер для обработки данных формы
app.use(bodyParser.urlencoded({ extended: true }));






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
    console.log(inputText)
    
    // let ch = Charc.findOne({ id: inputText }).then((char) => {
        
      
    //     // Создайте словарь (объект) с данными пользователя
    //     if (char)
    //         ch = {
    //             name: char.name,
    //             age: char.age,
    //             bodystats: char.bodystats,
    //             abilities: char.abilities,
    //             weaknesses: char.weaknesses,
    //             character: char.character,
    //             inventory: char.inventory,
    //             bio: char.bio,
    //             appearances: char.appearances,
    //             art: char.art,
    //             shortened: char.shortened,
    //             id: char.id,
    //             owner: char.owner
    //         };
    //         return ch;
        
        
      
    //     // console.log(ch);
    //   });
    let ch;

Charc.findOne({ id: inputText })
  .then((char) => {
    // Создайте словарь (объект) с данными персонажа
    ch = {
      name: char.name,
      age: char.age,
      bodystats: char.bodystats,
      abilities: char.abilities,
      weaknesses: char.weaknesses,
      character: char.character,
      inventory: char.inventory,
      bio: char.bio,
      appearances: char.appearances,
      art: char.art,
      shortened: char.shortened,
      id: char.id,
      owner: char.owner
    };

    console.log("Array: ");
    console.log(ch);

    if (ch==undefined){
        output= "Неверный ID. Объект: "+ch
        console.log("ch==undefined: " + ch==undefined)}
      
    else
        output = `${ch.name}, ${ch.age} лет. ID: ${ch.id}, владелец - <@${ch.owner}>\n
    \nКраткое содержание:\n${ch.shortened}
    \n\nБиография:\n${ch.bio}\n\n
    Телосложение, мир, рост, вес: ${ch.bodystats}\n\n
    Способности: \n${ch.abilities}\n\n
    Слабости: \n${ch.weaknesses}\n\n
    Характер: \n${ch.character}\n\n
    Внешность: \n${ch.appearances}\n\n
    
    `
    //<a href="${art}">Ссылка на арт<br></a>

    res.json({ result: `Результат: ${output}` });
//     const result = `Результат: ${output.replace(/\n/g, "<br>")}`;

// res.json({ result });
  })
  .catch((err) => {
    console.error(err);
  });
    
    
    
    // Здесь ты можешь обработать данные, например, сделать какие-то вычисления
    
    // Возвращаем результат обработки в формате JSON
    
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


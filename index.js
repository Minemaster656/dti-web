// const http = require('http')
const fs = require('fs')
require('dotenv').config();
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser');
const { compileFunction } = require('vm')
// const multer = require('multer'); // Для обработки загрузки файлов
// const sharp = require('sharp'); // Для обработки изображений
const path = require('path');
const { port } = require('./private-config.json');


const app = express()
app.set('view engine', 'ejs')
// const upload = multer({
//     dest: 'uploads/' // Папка, куда будут сохраняться загруженные файлы
//   });
app.use(express.static('public'))
var secretdata = fs.readFileSync('secretdata.txt').toString().split("\n");
// Подключение к MongoDB
const mongoose = require('mongoose');
console.log(`mongodb://${secretdata[0]}:${secretdata[1]}@glitchdev.ru:27017/RTB_data`)
mongoose.connect(`mongodb://${secretdata[0]}:${secretdata[1]}@glitchdev.ru:27017/RTB_data`, { useNewUrlParser: true, useUnifiedTopology: true });

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






const PORT = 3004
const HOST = 'localhost' //127.0.0.1

const HTML_PATH = __dirname+ '/templates/'
const router = new express.Router()



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/datahold/:doc', (req, res) => {
    const doc = req.params.doc;
    const filePath = path.join(__dirname, 'views', 'datahold', `${doc}.ejs`);
    console.log(filePath + " ");
    console.log("PATH");
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // Render error.ejs if the file or directory doesn't exist
        res.render('error');
        console.log("ERROR");
        console.log(err+" ");
      } else {
        // Render the file if it exists
        res.render(`datahold/${doc}`);
      }
    });
  });



app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/EULA', (req, res) => {
  res.render('EULA')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/user/:name/:xp', (req, res) => {
    res.render(`user`, {name : req.params.name, xp:req.params.xp})
})
app.get('/projects', (req, res) => {
    res.render('projects')

})
app.get('/atk', (req, res) => {
    res.render('atk')
})
app.get('/atk/register', (req, res) => {
    res.render('atk_register')
})
app.get('/atk/database', (req, res) => {
    res.render('atk_database')
})
app.get('/employee', (req, res) => {
    res.render('employee')
})
app.get('/test', (req, res) => {
    res.render('deco_test')
})
app.get('/content', (req, res) => {
    res.render('content')
})
app.get('/docs', (req, res) => {
    res.render('docs')
})
app.get('/docs/MnL', (req, res) => {
    res.render('doc_MnL')
})
app.get('/games/td', (req, res) => {
    res.render('browsertd')
    
})
app.get('/imager', (req, res) => {
    res.render('imageProcessing')})
app.get('*', (req, res) => {
    res.status(404).render('error')
})


//TODO: доделать
router.get('/auth/discord/login', async ctx =>{
  // const url = ''
  const url = 'https://discord.com/api/oauth2/authorize?client_id=1180837144915357716&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3004%2Fauth%2Fdiscord%2Fcallback&scope=identify';
  ctx.redirect(url);
})
router.get('/auth/discord/callback', async ctx=>{
  if (!ctx.query.code) throw new Error('Code not provided.')
  const {code}=ctx.query
  const params = new URLSearchParams({
    client_id:process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type:'authorization_code',
    code, redirect_uri:process.env.DISCORD_REDIRECT_URI
  })
  const headers = {
    'Content-Type':'application/x-www-form-urlencoded',
    'Accapt-Encoding': 'application/x-www-form-urlencoded'
  }
  const response = await axios.post('http://discord.com/api/oauth2/token', params, {headers})
  ctx.body =response.data;
})

  



// AJAX AJAX AJAX AJAX AJAX AJAX AJAX
// Обработка отправки формы
app.post('/findCharacter', (req, res) => {
    const { inputText } = req.body;
    // console.log(inputText)
    
    
    let ch;

Charc.findOne({ id: inputText })
  .then((char) => {
    // Создайте словарь (объект) с данными персонажа
    

    // console.log("Array: ");
    // console.log(ch);

    try {
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
        if (ch==undefined){
            output= "Неверный ID. Объект: "+ch
            // console.log("ch==undefined: " + ch==undefined)
        }
        
        
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
    } catch (error) {
        output = "Неверный ID."
    }
    
    //<a href="${art}">Ссылка на арт<br></a>

    res.json({ result: `${output}` });
//     const result = `Результат: ${output.replace(/\n/g, "<br>")}`;

// res.json({ result });
  })
  .catch((err) => {
    console.error(err);
  });
    
    
    
    // Здесь ты можешь обработать данные, например, сделать какие-то вычисления
    
    // Возвращаем результат обработки в формате JSON
    
  });







// API API API API API API API
app.get('/api/memes/any', (req, res) => {
    const folderPath = path.join(__dirname, '/public/api/memes/any/');
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }
  
      const randomIndex = Math.floor(Math.random() * files.length);
      const randomFile = files[randomIndex];
  
      res.sendFile(path.join(folderPath, randomFile));
    });
  });

app.listen(PORT, ()=>{
    console.log(`Сервер запущен по адресу http(s)://${HOST}:${PORT}`)


})

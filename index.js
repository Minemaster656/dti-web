const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const PORT = process.env.PORT || 3003

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'

})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

async function start(){
    try{
        await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server is already started')
        
        })
        

    }catch(e){
        console.log(e)
    }

}


start()
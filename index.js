const http = require('http')


let server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end('Micha <b>Clown</b>')

})

const PORT = 3000
const HOST = 'localhost' //127.0.0.1

server.listen(PORT, HOST, ()=>{

    console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`)
})


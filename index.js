const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

//converter dados do formulario em objeto javascript
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rotas

app.post('/criar', (req, res) => {
    const descricao = req.body.descricao
    const completa = 0

    const sql = `INSERT INTO tarefas (descricao, completa)
     VALUES ('${descricao}', '${completa}')`

     conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        } 
         res.redirect('/')
    })
})

app.get('/', (req, res) => {
    res.render('home')
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: 3306
})

conexao.connect((erro) =>{
    if (erro) {
       return console.log(erro) 
    }

    console.log("estou conectado ao MySQL")
    app.listen(3000, () =>{
        console.log("servidor rodando na porta 3000!")
    })
})
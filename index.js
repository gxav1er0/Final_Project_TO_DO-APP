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

app.get('/limpartarefas', (req, res) => {
    const sql = 'DELETE FROM tarefas'

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        } 
         res.redirect('/')
    }) 
})

app.post('/excluir', (req, res) => {
    const id = req.body.id;

    const sql = `
        DELETE FROM tarefas
        WHERE id = ${id}
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        } 
         res.redirect('/')
    })
})

app.post('/completar', (req, res) => {
    const id = req.body.id;

    const sql = `UPDATE tarefas
     SET completa = '1'
     WHERE id = ${id}
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        } 
         res.redirect('/')
    })
})

app.post('/descompletar', (req, res) => {
    const id = req.body.id;

    const sql = `UPDATE tarefas
     SET completa = '0'
     WHERE id = ${id}
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        } 
         res.redirect('/')
    }) 
})

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

app.get('/completas', (req, res) =>{
    const sql = ` SELECT * 
        FROM tarefas
        where completa = 1
    `

    conexao.query(sql, (erro, dado) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dado.map((dado) =>{
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: true
            }
        })

        const qtdTarefas = tarefas.length

        res.render('completas', { tarefas, qtdTarefas })
    })
})

app.get('/ativas', (req, res) => {
    const sql = ` SELECT * 
        FROM tarefas
        where completa = 0
    `

    conexao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado) =>{
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: false
            }
        })

        const qtdTarefas = tarefas.length

        res.render('ativas', { tarefas, qtdTarefas })

    })
})

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        const tarefas = dados.map((dado) =>{
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
        })

        const tarefasAtivas = tarefas.filter((tarefa) => {
            return tarefa.completa === false && tarefa
        })

        const qtdTarefasAtivas = tarefasAtivas.length 

        res.render('home', { tarefas, qtdTarefasAtivas })
    })
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
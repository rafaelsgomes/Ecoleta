const express = require("express")
const server = express()

// Bando ce dados
const db = require("./database/db")

// Template Engine
const nunjucks = require("nunjucks")
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
// config public dir
server.use(express.static('public'))

// Habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))

// Config Rotas
server.get("/", (req, res)=>{
    res.render('index.html')
})
server.get("/create-point", (req, res)=>{
    console.log(req.query)
    res.render("create-point.html")
})
server.post("/savepoint", (req, res )=>{
    const query = `
        INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
      ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err){
        if(err){
            console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        res.render("create-point.html", {saved: true})
    }
    db.run(query, values, afterInsertData)
})
server.get("/search-results", (req, res)=>{

    const search = req.query.search

    if(search == ""){
       return res.render('search-results.html', {total: 0})
    }    

    db.all(`SELECT * FROM places WHERE city = '${search}'`, (err, rows)=>{
        if(err){
            console.log(err)
        }
        
        const total = rows.length

        // HTML recebendo os dados do DB
        return res.render('search-results.html', {places: rows, total})
    })
    
})

server.listen(3000)
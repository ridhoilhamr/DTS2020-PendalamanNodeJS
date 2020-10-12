import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'

//const database = require('./database')
import { initDatabase, initTable, insertProduct, getProduct } from './database.js'

const __dirname = path.resolve()

const app = express()
const db = initDatabase()
initTable(db)

// //initialize express
// const app = express()

app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

// log incoming reques
app.use(morgan('combined'))

// parse request body
app.use(bodyParser.urlencoded())

// serve static file
app.use('/assets', express.static(__dirname + '/assets'))
// app.use('/files', express.static(__dirname + '/files'))

app.get('/', (req, res, next)=>{
    res.send({success: true})
})

app.get('/product', async (req, res, next) => {
    res.render('product')
})


// get product list
app.get('/add-product', (req, res, next) => {
  res.send(req.query)
})

// handle form POST method
app.post('/add-product', (req, res, next) => {
  console.log('Request', req.body)
  
// insert product
  insertProduct(db, req.body.name, parseInt(req.body.price), '-')
  
// redirect
res.redirect('/product')
})

//send error message
app.use((err, req, res, next) => { 
    res.send(err.message)
  })

//listen
app.listen(9000, () => {
    console.log('app listen on port 9000')
  })
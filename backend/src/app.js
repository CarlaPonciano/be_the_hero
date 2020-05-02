const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const { errors } = require('celebrate')

const app = express()

//em desenvolvimento: todas as aplicações podem acessar
app.use(cors())

//em produção:
/*app.use(cors({
    origin: 'endereço que pode acessar a aplicação. Ex: http://meuapp.com'
}))*/

app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app
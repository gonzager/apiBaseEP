const {Router} = require('express')
const {Cliente} = require('../db/models')
const userController = require('../controllers/cliente.controller')
const middlewareCliente = require('../middlewares/exists.middleware')
const clienteSchema = require('../schemas/cliente.schema')
const route = Router()


route.get('/clientes', userController.getAllUser )

route.get('/clientes/:id', middlewareCliente.existsById(Cliente)  , userController.clienteById )

route.post('/clientes', middlewareCliente.validaSchema(clienteSchema),  userController.crearCliente)
module.exports = route




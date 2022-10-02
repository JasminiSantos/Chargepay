const express = require('express')
const { cadastro, validateEmail } = require('./controladores/usuario/cadastro')
const usuario = require('./controladores/usuario/login')
const { cadastrarCliente } = require('./controladores/usuario/cliente/cadastroCliente');
const { listarClientes } = require('./controladores/usuario/cliente/listagemClientes');
const detalharCliente = require('./controladores/usuario/cliente/detalharCliente');
const cobranca = require('./controladores/cobrancas/cadastro');
const { editarContato } = require('./controladores/usuario/cliente/editarCliente');
const editarUsuario = require('./controladores/usuario/editarUsuario');
const pagas = require('./controladores/cobrancas/filtragem/paga');
const pendentes = require('./controladores/cobrancas/filtragem/pendentes');
const vencidas = require('./controladores/cobrancas/filtragem/vencidas')
const situacao = require('./controladores/usuario/cliente/filtragem/situacao')

require('dotenv').config()
const rota = express()



rota.get("/filtrar/cobranca/paga", pagas)
rota.get("/filtrar/cobranca/pendente", pendentes)
rota.get("/filtrar/cobranca/vencidas", vencidas)
rota.get("/filtrar/clientes/situacao", situacao)

rota.get("/", (req, res) => {
  res.status(200).send('Hello world!')
})

rota.post("/", usuario.sigIn)
rota.post("/cadastro/cobranca", cobranca.cadastro)

rota.route("/cobrancas")
  .get(cobranca.buscarTodos)
  .put(cobranca.updateCobranca)

rota.route("/cobrancas/:id")
  .delete(cobranca.deleteCobranca)

rota.get("/", (req, res) => {
  return res.status(200).json('Hello world!')
})
rota.post("/cliente", cadastrarCliente);
rota.get("/cliente", listarClientes);

rota.route("/cliente/update")
  .put(editarContato)

rota.get("/cliente/:id", detalharCliente);
rota.put("/usuario/edit/:id", editarUsuario);

rota.route("/usuario/create")
  .post(cadastro)

rota.route("/usuario/verify")
  .post(validateEmail)

module.exports = rota
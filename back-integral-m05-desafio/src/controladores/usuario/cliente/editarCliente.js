const db = require('../../../db');
const editarContato = async (req, res) => {
  const { emailAnterior, cpfAnterior, ...cliente } = req.body
  console.log(req.body)
  const data = {
    email: false,
    cpf: false,
  }
  if (!req.body.email) {
    return res.status(400).json({ error: { message: "Falta o email!!" } })
  }
  if (!req.body.cpf) {
    return res.status(400).json({ error: { message: "Falta o cpf!!" } })
  }
  if (!emailAnterior) {
    return res.status(400).json({ error: { message: "Falta o emailAnterior!!" } })
  }

  const emailValidate = await db('clientes').select('*').where('email', req.body.email)
  const cpfValidate = await db('clientes').select('*').where('cpf', req.body.cpf)

  if (emailValidate.length > 0) {
    data.email = true
  }

  if (cpfValidate.length > 0) {
    data.cpf = true
  }

  if (emailAnterior === req.body.email) {
    data.email = false
  }

  if (cpfAnterior === req.body.cpf) {
    data.cpf = false
  }

  if (data.cpf || data.email) {
    return res.status(200).json({ data })
  }

  try {
    await db('clientes').update(cliente).where('email', emailAnterior)
    return res.status(204).json()
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

module.exports = {
  editarContato
}
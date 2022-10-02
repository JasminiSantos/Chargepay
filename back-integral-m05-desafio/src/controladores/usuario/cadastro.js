const db = require('../../db');
const bcrypt = require('bcrypt');
const cadastro = async (req, res) => {
  const { nome, email, senha } = req.body
  if (!nome) {
    return res.status(400).json({ error: { message: 'Falta o nome do usuário' } })
  }

  if (!senha) {
    return res.status(400).json({ error: { message: 'Falta o senha do usuário' } })
  }

  if (!email) {
    return res.status(400).json({ error: { message: 'Falta o e-mail do usuário' } })
  }

  const emailDb = await db('usuarios').select('*').where('email', email);

  if (emailDb.length > 0) {
    return res.status(400).json({ error: { message: 'O e-mail já esta em uso' } })
  }


  try {
    let senhaNova = await bcrypt.hash(senha, 11)
    await db('usuarios').insert({ nome, email, senha: senhaNova });
    return res.status(201).json({
      sucesso: {
        message: "usuario criado com sucesso"
      }
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

const validateEmail = async (req, res) => {
  const user = await db('usuarios').select('*').where({ email: req.body.email })
  console.log(user)
  console.log(req.body)
  if (user.length > 0) {
    return res.status(400).json({
      error: {
        message: 'Email em uso!!'
      }
    });
  }
  return res.status(204).json();
}

module.exports = {
  cadastro,
  validateEmail
}
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../../db');
require('dotenv').config({ path: '../../.env' })
async function sigIn(req, res) {

    const { email, senha } = req.body
    const usuarioDb = await db('usuarios').select('*').where('email', email);
    const usuarioLogado = {
        id: usuarioDb[0].id,
        nome: usuarioDb[0].nome,
        cpf: usuarioDb[0].cpf,
        telefone: usuarioDb[0].telefone,
        email: usuarioDb[0].email,
        senha: usuarioDb[0].senha
    }

    if (usuarioDb.length === 0) {
        return res.status(400).json({ error: { message: 'E-mail ou senha incorretos' } })
    }
    const senhaCorreta = await bcrypt.compare(senha, usuarioDb[0].senha)

    if (!senhaCorreta) {
        return res.status(400).json({ error: { message: 'E-mail ou senha incorretos' } })
    }

    try {
        const token = jwt.sign(usuarioLogado, process.env.JWT_SECURE, { expiresIn: '2h' })
        req.authorization = token
        return res.json({ token: token, usuario: usuarioLogado })
    } catch (error) {

        return res.status(400).json(error.message)
    }

}


module.exports = {
    sigIn
}
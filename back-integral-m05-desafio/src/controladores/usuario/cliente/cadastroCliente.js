const db = require('../../../db');

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, telefone, endereco, complemento, cep, bairro, cidade, uf } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "Nome é um campo obrigatório." });
    }
    if (!email) {
        return res.status(400).json({ mensagem: "E-mail é um campo obrigatório." });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: "Cpf é um campo obrigatório." });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: "Endereço é um campo obrigatório." });
    }

    const emailEncontrado = await db('clientes').select('*').where('email', email);

    if (emailEncontrado.length > 0) {
        return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
    }

    try {
        await db('clientes').insert({ nome, email, cpf, telefone, endereco, complemento, cep, bairro, cidade, uf });
        return res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarCliente
}
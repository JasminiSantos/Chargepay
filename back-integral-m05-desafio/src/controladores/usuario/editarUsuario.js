const db = require('../../db');
const bcrypt = require('bcrypt')

const editarUsuario = async (req, res) => {
    const { nome, email, cpf, telefone, senha } = req.body;
    const { id } = req.params;

    if (!nome) {
        return res.status(400).json({ error: { mensagem: "O campo nome deve ser preenchido" } });
    }

    if (!email) {
        return res.status(400).json({ error: { mensagem: "O campo email deve ser preenchido" } });
    }

    try {
        const emailDb = await db('usuarios').select('*').where('email', email);

        if (emailDb.length > 0 && emailDb[0].id !== Number(id)) {
            return res.status(400).json({ error: { message: "O email já está em uso" } })
        }

        const usuarioEncontrado = await db('usuarios').select('*').where('id', id);
        if (!usuarioEncontrado) {
            return res.status(404).json({ error: { mensagem: "Usuário não encontrado" } });
        }

        const senhaAntiga = usuarioEncontrado[0].senha
        if (!senha) {
            await db('usuarios').update({ nome, email, cpf, telefone, senha: senhaAntiga }).where('id', id);
            return res.status(204).json();
        }

        if (senha !== senhaAntiga) {
            let senhaNova = await bcrypt.hash(senha, 11);
            await db('usuarios').update({ nome, email, cpf, telefone, senha: senhaNova }).where('id', id);
            return res.status(204).json();
        } else {
            await db('usuarios').update({ nome, email, cpf, telefone, senha }).where('id', id);
            return res.status(204).json();
        }


    } catch (error) {
        return res.status(400).json(error.message);
    }


}

module.exports = editarUsuario;
const db = require('../../db');
require('dotenv').config({ path: '../../.env' })

const cadastro = async (req, res) => {
    const { cliente, descricao, status, valor, vencimento, cliente_id } = req.body

    if (!cliente) {
        return res.status(400).json({ error: { message: "O Campo nome é obrigatorio" } })
    }
    if (!descricao) {
        return res.status(400).json({ error: { message: "O Campo descrição é obrigatorio" } })
    }
    if (status === null || status === '') {
        return res.status(400).json({ error: { message: "O Campo status é obrigatorio" } })
    }
    if (!valor) {
        return res.status(400).json({ error: { message: "O Campo valor é obrigatorio" } })
    }
    if (!vencimento) {
        return res.status(400).json({ error: { message: "O Campo vencimento é obrigatorio" } })
    }
    try {
        const result = await db('cobrancas').insert({ cliente, cliente_id, descricao, status, valor, vencimento }).returning("*");
        return res.json(result).status(201);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const buscarTodos = async (req, res) => {
    try {
        const result = await db.select("*").from("cobrancas");

        const cobrancasStatusAtualizadas = result.map(cobranca => {
            const dataCobranca = `${cobranca.vencimento.getDate()}/${cobranca.vencimento.getMonth()}/${cobranca.vencimento.getFullYear()}`
            const dataAtual = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
            if (cobranca.vencimento < new Date() && cobranca.status === 'pendente') {
                if (dataCobranca === dataAtual) {
                    const cobrancaAtt = { ...cobranca, status: 'pendente' }
                    return cobrancaAtt
                } else {
                    const cobrancaAtt = { ...cobranca, status: 'vencida' }
                    return cobrancaAtt
                }

            } else {
                return cobranca
            }
        })

        return res.json(cobrancasStatusAtualizadas).status(200);

    } catch (error) {
        return res.status(400).json(error.message);

    }
}
const updateCobranca = async (req, res) => {

    const { cliente, descricao, status, valor, vencimento, cliente_id } = req.body

    if (!cliente) {
        return res.status(400).json({ error: { message: "O Campo nome é obrigatorio" } })
    }
    if (!cliente_id) {
        return res.status(400).json({ error: { message: "O Campo id do cliente é obrigatorio" } })
    }
    if (!descricao) {
        return res.status(400).json({ error: { message: "O Campo descrição é obrigatorio" } })
    }
    if (typeof status !== "string") {
        return res.status(400).json({ error: { message: "O Campo status é obrigatorio" } })
    }
    if (!valor) {
        return res.status(400).json({ error: { message: "O Campo valor é obrigatorio" } })
    }
    if (!vencimento) {
        return res.status(400).json({ error: { message: "O Campo vencimento é obrigatorio" } })
    }


    const body = {
        cliente_id,
        cliente,
        descricao,
        valor,
        vencimento,
        status

    }


    try {
        const result = await db('cobrancas').select('*').where('id', req.body.id)

        if (result.length <= 0) {
            return res.status(404).json({ error: { message: "Not Found!!" } });
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {
        const result = await db('cobrancas').where('id', req.body.id).update(body).returning("*")
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteCobranca = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            error: {
                message: "falta o id na URL!"
            }
        });
    }

    try {
        const result = await db('cobrancas').select('*').where('id', id)
        if (result.length <= 0) {
            return res.status(404).json({ error: { message: "Not Found!!" } });
        }

        if (result.status) {
            return res.status(400).json({ error: { message: "Cobrança deve estar pendente!!" } });
        }

        if (result.vencimento <= new Date()) {
            return res.status(400).json({ error: { message: "Cobrança fora do vencimento!!" } });
        }

    } catch (error) {
        return res.status(400).json(error.message);
    }

    try {
        await db('cobrancas').where('id', id).del()
        return res.status(204).json()
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastro,
    buscarTodos,
    updateCobranca,
    deleteCobranca
}


const db = require('../../../db');

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    if(id%1 !== 0) {
        res.status(400).json({ error: { mensagem:  "Id inválido" } })
    }

    try {
        const clienteEncontrado = await db('clientes').select('*').where('id', id);

        if(!clienteEncontrado) {
            res.status(404).json({ error: { mensagem: "Cliente não encontrado" } })
        } else {
            res.status(200).json(clienteEncontrado);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = detalharCliente;
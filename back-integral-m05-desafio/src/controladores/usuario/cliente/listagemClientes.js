const db = require('../../../db');

const listarClientes = async (req, res) => {


    const clientes = await db('clientes').returning('*')
    const cobrancas = await db('cobrancas').where('vencimento', '<', new Date()).andWhere({
        status: 'pendente'
    }).distinct('cliente_id').returning('*')

    const clientesStatusAtualizado = clientes.map(cliente => {
        for (const cobranca of cobrancas) {
            if (cliente.id === cobranca.cliente_id) {
                return { ...cliente, status: false }
            }
        }

        return { ...cliente, status: true }
    });

    try {
        return res.status(200).json(clientesStatusAtualizado);
    } catch (error) {
        return res.status(400).json(error.message);
    }



}

module.exports = {
    listarClientes
}
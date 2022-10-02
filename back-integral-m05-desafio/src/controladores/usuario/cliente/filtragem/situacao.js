const db = require('../../../../db');
async function situacao(req, res) {

    const clientes = await db('clientes').returning('*')
    const cobrancas = await db('cobrancas').where('vencimento', '<', new Date()).andWhere({
        status: 'pendente'
    }).distinct('cliente_id').returning('*')


    const clientesStatusAtualizado = clientes.map(cliente => {
        for (const cobranca of cobrancas) {
            if (cliente.id === cobranca.cliente_id) {
                return { ...cliente, status: 'vencida' }
            }
        }

        return { ...cliente, status: 'paga' }
    });
    try {

        const clientesInadimplentes = []
        const clientesAdimplentes = []

        for (const cliente of clientesStatusAtualizado) {
            if (cliente.status === 'vencida') {
                clientesInadimplentes.push(cliente)
            } else {
                clientesAdimplentes.push(cliente)
            }
        }


        const retorno = {
            inadimplentes: clientesInadimplentes,
            adimplentes: clientesAdimplentes
        }

        // console.log(retorno)

        return res.json({
            inadimplentes: clientesInadimplentes,
            adimplentes: clientesAdimplentes
        })
    } catch (error) {
        return res.json(error.message)
    }


}


module.exports = situacao
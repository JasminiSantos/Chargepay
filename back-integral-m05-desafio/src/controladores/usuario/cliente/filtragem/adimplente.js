const db = require('../../../../db');
async function adimplentes(req, res) {

    const dataAtualTimestamp = new Date().getTime()
    const clientesAdimplentes = []

    try {
        const clientes = await db('clientes').innerJoin('cobrancas', 'clientes.id', 'cobrancas.cliente_id')
        clientes.forEach(element => {
            if (element.vencimento.getTime() > dataAtualTimestamp) {
                clientesAdimplentes.push(element)

            }
        })


        if (clientesAdimplentes.length > 0) {
            return res.json(clientesAdimplentes)
        }
    } catch (error) {

        return res.json({ error: { mensagem: "Não existem clientes em dia" } })
    }



}

module.exports = adimplentes
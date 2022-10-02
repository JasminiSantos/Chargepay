const db = require('../../../db');
async function pagas(req, res) {
    try {
        const cobrancasPagas = await db('cobrancas').select('*').where({
            status: 'paga'
        })

        return res.json(cobrancasPagas)
    } catch (error) {
        return res.json({ error: { mensagem: "Não existem cobranças pagas" } })
    }
}

module.exports = pagas
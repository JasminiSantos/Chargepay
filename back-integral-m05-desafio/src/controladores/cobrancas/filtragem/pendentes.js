const db = require('../../../db');
async function pendentes(req, res) {

    const dataAtualTimestamp = new Date()
    try {
        const cobrancas = await db('cobrancas').select('*').where({
            status: 'pendente'
        })
        const cobrancasPendentes = []
        cobrancas.forEach(element => {
            const dataCobranca = `${element.vencimento.getDate()}/${element.vencimento.getMonth()}/${element.vencimento.getFullYear()}`
            const dataAtual = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
            if (dataAtual === dataCobranca) {
                cobrancasPendentes.push(element)
            }

            if (element.vencimento >= dataAtualTimestamp && element.status === 'pendente') {


                cobrancasPendentes.push(element)

            }
        });
        return res.json(cobrancasPendentes)
    } catch (error) {

        return res.json({ error: { mensagem: "Não existem cobranças pendentes" } })
    }

}
module.exports = pendentes
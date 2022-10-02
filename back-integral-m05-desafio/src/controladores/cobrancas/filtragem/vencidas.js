const db = require('../../../db');
async function vencidas(req, res) {

    try {
        const arrayCobrancas = await db('cobrancas').select('*')
        const cobrancasVencidas = []

        const cobrancasStatusAtualizadas = arrayCobrancas.map(cobranca => {
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


        cobrancasStatusAtualizadas.forEach(element => {
            if (element.status === 'vencida') {
                cobrancasVencidas.push(element)
            }
        });
        return res.json(cobrancasVencidas)

    } catch (error) {
        return res.json({ error: { mensagem: "Não existem cobranças vencidas" } })
    }

}
module.exports = vencidas
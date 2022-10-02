const listarCobranca = async () => {
    try {
        const response = await fetch("https://charge-pay-back.herokuapp.com/cobrancas", {
            method: 'GET'
        });

        const dadosCobranca = await response.json();

        return dadosCobranca
    } catch (error) {
        console.log(error)
    }
}

async function obterCobrancasPagas() {
    try {
        const response = await fetch('https://charge-pay-back.herokuapp.com/filtrar/cobranca/paga', {
            method: 'GET'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function obterCobrancasVencidas() {
    try {
        const response = await fetch('https://charge-pay-back.herokuapp.com/filtrar/cobranca/vencidas', {
            method: 'GET'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function obterCobrancasPrevistas() {
    try {
        const response = await fetch('https://charge-pay-back.herokuapp.com/filtrar/cobranca/pendente', {
            method: 'GET'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

async function obterClientesFiltrados() {
    try {
        const response = await fetch('https://charge-pay-back.herokuapp.com/filtrar/clientes/situacao', {
            method: 'GET'
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        return
    }
}

export {
    listarCobranca,
    obterCobrancasPagas,
    obterCobrancasVencidas,
    obterCobrancasPrevistas,
    obterClientesFiltrados
};
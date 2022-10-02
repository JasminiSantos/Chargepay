

async function loadClients() {
    try {
        const response = await fetch('https://charge-pay-back.herokuapp.com/cliente', {
            method: 'GET'
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return []
    }

}
export {
    loadClients
}
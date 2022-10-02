
import useConsumer from './useConsumer'
import { useNavigate } from 'react-router-dom';
require('dotenv').config()

function useFunctions() {
    const { setTokenStorage, email, senha, setErro, setUsuarioLogado } = useConsumer()
    const navigate = useNavigate();

    function redirecionar(path) {
        navigate(path);
    }

    async function signIn() {
        const usuario = {
            email,
            senha
        }

        try {
            const response = await fetch('https://charge-pay-back.herokuapp.com/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-type": 'application/json'
                },
                body: JSON.stringify(usuario)

            })

            const body = await response.json()
            if (body.error) {
                setErro({ message: body.error.message })
                return
            }
            setTokenStorage(body.token)
            setUsuarioLogado(body.usuario)
            redirecionar("/home")
        } catch (err) {
            return console.log(err)

        }
    }

    async function editUser(body, id) {
        await fetch(`https://charge-pay-back.herokuapp.com/usuario/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
    }

    return {
        signIn,
        redirecionar,
        editUser
    }
}

export default useFunctions
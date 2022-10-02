import { useState } from 'react';
import useLocalStorage from "use-local-storage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function UseData() {
    const [tokenStorage, setTokenStorage, removeTokenStorage] = useLocalStorage("token")
    const [usuarioLogado, setUsuarioLogado, removeUsuarioLogado] = useLocalStorage("usuario")
    const [stage, setStage] = useState({ one: true, two: false, three: false })
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [inputError, setInputError] = useState(true)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [inputValueCadastroNome, setInputValueCadastroNome] = useState("")
    const [inputValueCadastroEmail, setInputValueCadastroEmail] = useState('')
    const [inputValueCadastroCpf, setInputValueCadastroCpf] = useState('')
    const [inputValueCadastroTelefone, setInputValueCadastroTelefone] = useState('')
    const [inputValueCadastroSenha, setInputValueCadastroSenha] = useState('')
    const [erro, setErro] = useState(false)
    const [visualizarSenha, setVisualizarSenha] = useState(false)
    const [visualizarSenhaRepeat, setVisualizarSenhaRepeat] = useState(false)
    const [inputErrorValidate, setInputErrorValidate] = useState(true)
    const [btnHomeActive, setBtnHomeActive] = useState(true)
    const [btnClientsActive, setBtnClientsActive] = useState(false)
    const [btnCobrancasActive, setBtnCobrancasActive] = useState(false)
    const [inputErrorValidateEmail, setInputErrorValidateEmail] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [nomeModal, setNomeModal] = useState('')
    const [emailModal, setEmailModal] = useState('')
    const [cpfModal, setCpfModal] = useState('')
    const [telefoneModal, setTelefoneModal] = useState('')
    const [enderecoModal, setEnderecoModal] = useState('')
    const [complementoModal, setComplementoModal] = useState('')
    const [cepModal, setCepModal] = useState('')
    const [bairroModal, setBairroModal] = useState('')
    const [cidadeModal, setCidadeModal] = useState('')
    const [ufModal, setUfModal] = useState('')
    const [emailAnteriorModal, setEmailAnteriorModal] = useState('')
    const [inputErrorModalEmail, setInputErrorModalEmail] = useState(true)
    const [inputErrorModalCpf, setInputErrorModalCpf] = useState(true)
    const [inputErrorModalNome, setInputErrorModalNome] = useState(true)
    const [inputErrorModalTelefone, setInputErrorModalTelefone] = useState(true)
    const [inputErrorModalEmailEmUso, setInputErrorModalEmailEmUso] = useState(true)
    const [inputErrorModalCpfEmUso, setInputErrorModalCpfEmUso] = useState(true)
    const [modalCadastroCobranca, setModalCadastroCobranca] = useState(false)
    const [cobrancasPagas, setCobrancasPagas] = useState(false);
    const [cobrancasVencidas, setCobrancasVencidas] = useState(false);
    const [cobrancasPrevistas, setCobrancasPrevistas] = useState(false);
    const [clientesInadimplentes, setClientesInadimplentes] = useState(false);
    const [clientesEmDia, setClientesEmDia] = useState(false);
    const [cobrancasTodas, setCobrancasTodas] = useState(false);
    const [clientesTodos, setClientesTodos] = useState(false);
    const [inputModalCpfAnterior, setInputModalCpfAnterior] = useState('')
    const [sucessoEdit, setSucessoEdit] = useState(false)
    const navigate = useNavigate();
    const handleVisualizarSenha = () => {
        visualizarSenha ? setVisualizarSenha(false) : setVisualizarSenha(true)
    }
    function redirecionar(path) {
        navigate(path);
    }
    const handleVisualizarSenhaRepeat = () => {
        visualizarSenhaRepeat ? setVisualizarSenhaRepeat(false) : setVisualizarSenhaRepeat(true)
    }
    const handleValidadeCampos = async () => {
        if (inputValueCadastroNome && inputValueCadastroEmail) {
            setInputErrorValidate(true)
            return
        }
        setInputErrorValidate(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== passwordRepeat) {
            setInputError(false)
            return
        }
        setInputError(true)
        const data = {
            nome: inputValueCadastroNome,
            senha: password,
            email: inputValueCadastroEmail
        }
        await axios.post('https://charge-pay-back.herokuapp.com/usuario/create', data, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.status === 201) {
                setStage({ one: true, two: true, three: true })
            }
        })
            .catch(err => {
                // alert(err.message);
            })
    }

    const handleVerifyEmailCriado = () => {
        if (inputValueCadastroEmail) {
            axios.post('https://charge-pay-back.herokuapp.com/usuario/verify', {
                email: inputValueCadastroEmail
            }, {
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                if (res.status === 204) {
                    setInputErrorValidateEmail(true)
                    setStage({ one: true, two: true, three: false })
                }
                return
            }).catch(err => {
                setInputErrorValidateEmail(false)
                return
            })

        }
        setInputErrorValidateEmail(true)
    }

    const handleSubmitEditarCliente = async (e) => {
        e.preventDefault();
        setInputErrorModalEmail(true)
        setInputErrorModalCpf(true)
        setInputErrorModalEmailEmUso(true)
        setInputErrorModalCpfEmUso(true)
        setInputErrorModalTelefone(true)
        setInputErrorModalNome(true)
        if (!emailModal || !cpfModal || !telefoneModal || !nomeModal) {
            if (!emailModal) {
                setInputErrorModalEmail(false)
            }
            if (!cpfModal) {
                setInputErrorModalCpf(false)
            }
            if (!telefoneModal) {
                setInputErrorModalTelefone(false)
            }
            if (!nomeModal) {
                setInputErrorModalNome(false)
            }
            return
        }
        const data = {
            nome: nomeModal,
            email: emailModal,
            cpf: cpfModal,
            telefone: telefoneModal,
            endereco: enderecoModal,
            complemento: complementoModal,
            cep: cepModal,
            bairro: bairroModal,
            cidade: cidadeModal,
            uf: ufModal,
            emailAnterior: emailAnteriorModal,
            cpfAnterior: inputModalCpfAnterior
        }
        setInputErrorModalEmail(true)
        setInputErrorModalCpf(true)
        setInputErrorModalNome(true)
        setInputErrorModalTelefone(true)
        await axios.put('https://charge-pay-back.herokuapp.com/cliente/update', data, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            if (response.data.data) {
                if (response.data.data.email) {
                    setInputErrorModalEmailEmUso(false)
                }
                if (response.data.data.cpf) {
                    setInputErrorModalCpfEmUso(false)
                }
                return
            }
            setInputErrorModalEmailEmUso(true)
            setInputErrorModalCpfEmUso(true)
            setOpenModal(false)
            setSucessoEdit(true)
        }).catch(error => {
            alert(error.message)
        })
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return {
        email,
        setEmail,
        senha,
        setSenha,
        tokenStorage,
        setTokenStorage,
        removeTokenStorage,
        stage,
        setStage,
        password,
        passwordRepeat,
        inputError,
        setPassword,
        setPasswordRepeat,
        setInputError,
        inputValueCadastroNome,
        setInputValueCadastroNome,
        inputValueCadastroEmail,
        setInputValueCadastroEmail,
        erro,
        setErro,
        handleVisualizarSenha,
        handleVisualizarSenhaRepeat,
        handleValidadeCampos,
        visualizarSenha,
        setVisualizarSenha,
        visualizarSenhaRepeat,
        setVisualizarSenhaRepeat,
        inputErrorValidate,
        setInputErrorValidate,
        handleSubmit,
        redirecionar,
        handleVerifyEmailCriado,
        btnHomeActive,
        setBtnHomeActive,
        btnClientsActive,
        setBtnClientsActive,
        btnCobrancasActive,
        setBtnCobrancasActive,
        inputErrorValidateEmail,
        setInputErrorValidateEmail,
        openModal,
        setOpenModal,
        nomeModal,
        setNomeModal,
        emailModal,
        setEmailModal,
        cpfModal,
        setCpfModal,
        telefoneModal,
        setTelefoneModal,
        enderecoModal,
        setEnderecoModal,
        complementoModal,
        setComplementoModal,
        cepModal,
        setCepModal,
        bairroModal,
        setBairroModal,
        cidadeModal,
        setCidadeModal,
        ufModal,
        setUfModal,
        handleSubmitEditarCliente,
        emailAnteriorModal,
        setEmailAnteriorModal,
        inputErrorModalEmail,
        setInputErrorModalEmail,
        inputErrorModalCpf,
        setInputErrorModalCpf,
        handleCloseModal,
        inputErrorModalEmailEmUso,
        setInputErrorModalEmailEmUso,
        inputErrorModalCpfEmUso,
        setInputErrorModalCpfEmUso,
        inputErrorModalNome,
        setInputErrorModalNome,
        inputErrorModalTelefone,
        setInputErrorModalTelefone,
        modalCadastroCobranca,
        setModalCadastroCobranca,
        usuarioLogado,
        setUsuarioLogado,
        removeUsuarioLogado,
        inputValueCadastroCpf,
        setInputValueCadastroCpf,
        inputValueCadastroTelefone,
        setInputValueCadastroTelefone,
        inputValueCadastroSenha,
        setInputValueCadastroSenha,
        cobrancasPagas,
        setCobrancasPagas,
        cobrancasVencidas,
        setCobrancasVencidas,
        cobrancasPrevistas,
        setCobrancasPrevistas,
        clientesInadimplentes,
        setClientesInadimplentes,
        clientesEmDia,
        setClientesEmDia,
        cobrancasTodas,
        setCobrancasTodas,
        clientesTodos,
        setClientesTodos,
        inputModalCpfAnterior,
        setInputModalCpfAnterior,
        sucessoEdit,
        setSucessoEdit
    }
}
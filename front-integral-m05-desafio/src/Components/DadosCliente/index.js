import { useEffect } from 'react'
import './styles.css';
import iconEditClient from '../../Assets/icon-editClientGreen.svg';
import useConsumer from '../../Hooks/useConsumer';
import ModalEditarCliente from '../ModalEditarCliente';

export default function DadosCliente({ cliente }) {
    const { openModal, setOpenModal } = useConsumer();

    //   O COMENTADO É O QUE SAIU APÓS UM PR, DEIXADO POR PRECAUÇÃO
    // import { useLocation } from 'react-router-dom';

    // export default function DadosCliente() {
    //     const location = useLocation();
    //     const {
    //         openModal,
    //         setOpenModal,
    //         setNomeModal,
    //         setEmailModal,
    //         setCpfModal,
    //         setTelefoneModal,
    //         setEnderecoModal,
    //         setComplementoModal,
    //         setCepModal,
    //         setBairroModal,
    //         setCidadeModal,
    //         setUfModal,
    //         setEmailAnteriorModal
    //     } = useConsumer();
    //     useEffect(() => {
    //         setNomeModal(location.state.client.nome)
    //         setEmailModal(location.state.client.email)
    //         setCpfModal(location.state.client.cpf)
    //         setTelefoneModal(location.state.client.telefone)
    //         setEnderecoModal(location.state.client.endereco)
    //         setComplementoModal(location.state.client.complemento)
    //         setCepModal(location.state.client.cep)
    //         setBairroModal(location.state.client.bairro)
    //         setCidadeModal(location.state.client.cidade)
    //         setUfModal(location.state.client.uf)
    //         setEmailAnteriorModal(location.state.client.email)
    //     }, [])

    return (
        <div className="container__dados">
            <div className="container__header">
                <h2 className="header__title">Dados do cliente</h2>
                <button className="btn__edit-client" onClick={() => setOpenModal(true)}>
                    <img src={iconEditClient} alt="Editar cliente" />
                    <span>Editar Cliente</span>
                </button>
            </div>
            {openModal && <ModalEditarCliente cliente={cliente} />}
            <div className="dados dados__pessoais">
                <div className="dados__field">
                    <h3>Email</h3>
                    <p>{cliente.email}</p>
                </div>
                <div className="dados__field">
                    <h3>Telefone</h3>
                    <p>{cliente.telefone}</p>
                </div>
                <div className="dados__field">
                    <h3>CPF</h3>
                    <p>{cliente.cpf}</p>
                </div>
            </div>
            <div className="dados dados__endereco">
                <div className="dados__field">
                    <h3>Endereço</h3>
                    <p>{cliente.endereco}</p>
                </div>
                <div className="dados__field">
                    <h3>Bairro</h3>
                    <p>{cliente.bairro}</p>
                </div>
                <div className="dados__field">
                    <h3>Complemento</h3>
                    <p>{cliente.complemento}</p>
                </div>
                <div className="dados__field">
                    <h3>CEP</h3>
                    <p>{cliente.cep}</p>
                </div>
                <div className="dados__field">
                    <h3>Cidade</h3>
                    <p>{cliente.cidade}</p>
                </div>
                <div className="dados__field">
                    <h3>UF</h3>
                    <p>{cliente.uf}</p>
                </div>
            </div>
        </div>
    );
}
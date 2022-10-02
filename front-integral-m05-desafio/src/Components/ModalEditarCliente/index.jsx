import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import close from '../../Assets/closeButton.svg'
import iconeClientes from '../../Assets/iconClientes.svg'
import useConsumer from '../../Hooks/useConsumer'
import './styles.css';

const ModalEditarCliente = ({ cliente }) => {

  const {
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
    handleCloseModal,
    inputErrorModalEmail,
    inputErrorModalCpf,
    inputErrorModalEmailEmUso,
    inputErrorModalCpfEmUso,
    inputErrorModalNome,
    inputErrorModalTelefone,
    setEmailAnteriorModal,
    setInputModalCpfAnterior
  } = useConsumer()

  //   const [nomeModal, setNomeModal] = useState(cliente.nome);
  //   const [emailModal, setEmailModal] = useState(cliente.email);
  //   const [cpfModal, setCpfModal] = useState(cliente.cpf);
  //   const [telefoneModal, setTelefoneModal] = useState(cliente.telefone);
  //   const [enderecoModal, setEnderecoModal] = useState(cliente.endereco);
  //   const [complementoModal, setComplementoModal] = useState(cliente.complemento);
  //   const [cepModal, setCepModal] = useState(cliente.cep)
  //   const [bairroModal, setBairroModal] = useState(cliente.bairro)
  //   const [cidadeModal, setCidadeModal] = useState(cliente.cidade)
  //   const [ufModal, setUfModal] = useState(cliente.uf)


  useEffect(() => {
    setNomeModal(cliente.nome);
    setEmailModal(cliente.email);
    setCpfModal(cliente.cpf);
    setTelefoneModal(cliente.telefone);
    setEnderecoModal(cliente.endereco);
    setComplementoModal(cliente.complemento);
    setCepModal(cliente.cep);
    setBairroModal(cliente.bairro);
    setCidadeModal(cliente.cidade);
    setUfModal(cliente.uf);
    setEmailAnteriorModal(cliente.email)
    setInputModalCpfAnterior(cliente.cpf)
  }, [])


  return (
    <div className="modalEditarCliente">
      <form action="PUT" className="modal-Content" onSubmit={(e) => handleSubmitEditarCliente(e)}>
        <img src={close} alt="close" className="close" onClick={handleCloseModal} />
        <div className="headModal" >
          <img src={iconeClientes} alt="icone clientes" />
          <h3>Editar Cliente</h3>
        </div>
        <div className="boxModalEditarCliente">
          <label htmlFor="nome">Nome*</label>
          <input type="text" id="nome" value={nomeModal} onChange={(e) => { setNomeModal(e.target.value); }} />
          {
            inputErrorModalNome ?
              null
              :
              (
                <span className='required'>Este Campo deve ser preenchido</span>
              )
          }
        </div>
        <div className="boxModalEditarCliente">
          <label htmlFor="email">E-mail*</label>
          <input type="email" id="email" value={emailModal} onChange={(e) => setEmailModal(e.target.value)} />
          {
            inputErrorModalEmail ?
              null
              :
              (
                <span className='required'>Este Campo deve ser preenchido</span>
              )
          }

          {
            inputErrorModalEmailEmUso ?
              null
              :
              (
                <span className='required'>E-mail já cadastrado</span>
              )
          }
        </div>
        <div className="multiBoxModalEditarCliente">
          <div className="boxModalEditarCliente">
            <label htmlFor="cpf">CPF*</label>
            <input type="text" id="cpf" value={cpfModal} onChange={(e) => setCpfModal(e.target.value)} />
            {
              inputErrorModalCpf ?
                null
                :
                (
                  <span className='required'>Este Campo deve ser preenchido</span>
                )
            }
            {
              inputErrorModalCpfEmUso ?
                null
                :
                (
                  <span className='required'>CPF já cadastrado</span>
                )
            }
          </div>
          <div className="boxModalEditarCliente">
            <label htmlFor="telefone">Telefone*</label>
            <input type="text" id="telefone" value={telefoneModal} onChange={(e) => setTelefoneModal(e.target.value)} />
            {
              inputErrorModalTelefone ?
                null
                :
                (
                  <span className='required'>Este Campo deve ser preenchido</span>
                )
            }
          </div>
        </div>
        <div className="boxModalEditarCliente">
          <label htmlFor="endereço">Endereço</label>
          <input type="text" id="endereço" value={enderecoModal} onChange={(e) => setEnderecoModal(e.target.value)} />
        </div>
        <div className="boxModalEditarCliente">
          <label htmlFor="complemento">Complemento</label>
          <input type="text" id="complemento" value={complementoModal} onChange={(e) => setComplementoModal(e.target.value)} />
        </div>
        <div className="multiBoxModalEditarCliente">
          <div className="boxModalEditarCliente grow-2">
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" value={cepModal} onChange={(e) => setCepModal(e.target.value)} />
          </div>
          <div className="boxModalEditarCliente grow-1">
            <label htmlFor="bairro">Bairro</label>
            <input type="text" id="bairro" value={bairroModal} onChange={(e) => setBairroModal(e.target.value)} />
          </div>
        </div>
        <div className="multiBoxModalEditarCliente">
          <div className="boxModalEditarCliente grow-1">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" value={cidadeModal} onChange={(e) => setCidadeModal(e.target.value)} />
          </div>
          <div className="boxModalEditarCliente grow-3">
            <label htmlFor="uf">UF</label>
            <input type="text" id="uf" value={ufModal} onChange={(e) => setUfModal(e.target.value)} />
          </div>
        </div>
        <div className="boxButtons">
          <input className="button-cancel" type="button" value="Cancelar" onClick={handleCloseModal} />
          <button>Aplicar</button>
        </div>
      </form>
    </div>
  )
};

export default ModalEditarCliente;

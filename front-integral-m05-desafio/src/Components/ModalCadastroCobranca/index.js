import './styles.css';
import iconFolhaCobranca from '../../Assets/icon-folha-cobranca.svg';
import { useState } from 'react';
import useClients from "../../Hooks/useClients";
import InputMask from "react-input-mask";

function ModalCadastroCobrança({ setOpenModalCadastroCobranca, setOpen, client }) {
  const { descricao, setDescricao, vencimento, setVencimento, valor, setValor, setCobrancas, setErroDescricao, setErroVencimento, setErroValor, statusCobranca, setStatusCobranca, erroValor, erroVencimento, erroDescricao } = useClients();

  function handleSubmit(event) {
    event.preventDefault();

    validate()
  }

  function validate() {
    const cliente = client.nome;
    const cliente_id = client.id;
    const status = statusCobranca ? 'paga' : 'pendente';

    const cobranca = {
      cliente_id,
      cliente,
      descricao,
      status,
      valor,
      vencimento: vencimento
    }

    if (descricao && vencimento && valor) {
      saveInDb(cobranca);
      setOpenModalCadastroCobranca(false);
      setOpen(true);
    } else {
      if (!descricao) {
        setErroDescricao(true);
      } else {
        setErroDescricao(false);
      }

      if (!vencimento) {
        setErroVencimento(true);
      } else {
        setErroVencimento(false);
      }

      if (!valor) {
        setErroValor(true);
      } else {
        setErroValor(false);
      }
    }
  }

  async function saveInDb(cobranca) {
    try {
      const response = await fetch('https://charge-pay-back.herokuapp.com/cadastro/cobranca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cobranca),
      });

      const data = await response.json();

      setCobrancas((prevState) => [...prevState, data]);

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="backdrop-modal-cadastro-cobranca">
      <div className="container-modal-cadastro-cobranca">
        <div className="titulo">
          <img src={iconFolhaCobranca} alt="icone folha de cobrança" />
          <h3>Cadastro de Cobrança</h3>
        </div>
        <form action="submit" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="inputNomeDevedor">Nome*</label>
            <input type="text" id="inputNomeDevedor" value={client.nome} readOnly />
          </div>
          <div className="field">
            <label htmlFor="inputDescricao">Descrição*</label>
            <textarea
              type="text"
              id="inputDescricao"
              rows="3"
              maxLength="150"
              placeholder="Digite a descrição"
              onChange={(event) => setDescricao(event.target.value)}
              value={descricao}
            >
            </textarea>
            {erroDescricao && <span id='spanError-cadCob'>Campo 'Descrição' é obrigatório.</span>}
          </div>
          <div className="container-fields-venc-valor">
            <div className="field">
              <label htmlFor="inputVencimento">Vencimento*</label>
              <input
                type="date"
                id="inputVencimento"
                placeholder="Data de Vencimento"
                onChange={(event) => setVencimento(event.target.value)}
                value={vencimento}
              />
              {erroVencimento && <span id='spanError-cadCob'>Campo 'Vencimento' é obrigatório.</span>}
            </div>
            <div className="field">
              <label htmlFor="inputValor">Valor*</label>
              <input
                type="number"
                id="inputValor"
                placeholder="Digite o valor"
                onChange={(event) => setValor((event.target.value))}
                value={valor}
              />
              {erroValor && <span id='spanError-cadCob'>Campo 'Valor' é obrigatório.</span>}
            </div>
          </div>
          <span>Status*</span>
          <div className="field-checkbox">
            <div className="background-group-radio">
              <div class="group-radio">
                <input id="paga" type="radio" name="status-cobranca" value="paga" checked={statusCobranca} onChange={() => setStatusCobranca(true)} />
                <label for="paga">Cobrança Paga</label>
              </div>
            </div>
            <div className="background-group-radio">
              <div class="group-radio">
                <input id="pendente" type="radio" name="status-cobranca" value="pendente" checked={!statusCobranca} onChange={() => setStatusCobranca(false)} />
                <label for="pendente">Cobrança Pendente</label>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button id="btn-cancel" onClick={() => setOpenModalCadastroCobranca(false)} >Cancelar</button>
            <button id="btn-aply">Aplicar</button>
          </div>
        </form>
      </div >
    </div >
  );
}

export default ModalCadastroCobrança;
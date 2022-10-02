import './styles.css';
import iconFolhaCobranca from '../../Assets/icon-folha-cobranca.svg';
import iconClose from '../../Assets/icon-close.svg';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import ContextModal from '../../Context/contextModal';
import { format, getYear, getMonth, getDate, add, parseISO } from 'date-fns';

function ModalEditarCobranca() {
  const [checado, setChecado] = useState(true);
  const {
    setOpenModalEditCobranca,
    openModalEditCobranca,
    editarCobranca,
    setOpenEdit
  } = useContext(ContextModal);

  const [nomeModalEditCobranca, setNomeModalEditCobranca] = useState("")
  const [descricaoModalEditCobranca, setDescricaoModalEditCobranca] = useState("")
  const [valorModalEditCobranca, setValorModalEditCobranca] = useState("")
  const [vencimentoModalEditCobranca, setVencimentoModalEditCobranca] = useState("")
  const [statusModalEditCobranca, setStatusModalEditCobranca] = useState("")
  const [clienteId, setClienteId] = useState("")
  const [id, setId] = useState("")

  const [erroDescricaoEditCobranca, setErroDescricaoEditCobranca] = useState(false);
  const [erroVencimentoEditCobranca, setErroVencimentoEditCobranca] = useState(false);
  const [erroValorEditCobranca, setErroValorEditCobranca] = useState(false);

  const dataVencimento = format(parseISO(openModalEditCobranca.vencimento), "yyyy-MM-dd");
  console.log(dataVencimento);

  useEffect(() => {
    setNomeModalEditCobranca(openModalEditCobranca.cliente)
    setDescricaoModalEditCobranca(openModalEditCobranca.descricao)
    setValorModalEditCobranca(openModalEditCobranca.valor)
    setVencimentoModalEditCobranca(dataVencimento);
    setStatusModalEditCobranca(openModalEditCobranca.status)
    setId(openModalEditCobranca.id)
    setClienteId(openModalEditCobranca.cliente_id)
    setErroDescricaoEditCobranca(false);
    setErroVencimentoEditCobranca(false);
    setErroValorEditCobranca(false);
  }, [])

  async function handleSubmit(event) {
    event.preventDefault();

    let body = {};


    if (descricaoModalEditCobranca && vencimentoModalEditCobranca && valorModalEditCobranca) {
      body = {
        id: id,
        cliente_id: clienteId,
        cliente: nomeModalEditCobranca,
        descricao: descricaoModalEditCobranca,
        valor: valorModalEditCobranca,
        vencimento: vencimentoModalEditCobranca,
        status: statusModalEditCobranca === 'vencida' || statusModalEditCobranca === 'pendente' ? 'pendente' : 'paga'
      }
      await editarCobranca(body)
      setOpenEdit(true)
    } else {
      if (!descricaoModalEditCobranca) {
        setErroDescricaoEditCobranca(true);
      } else {
        setErroDescricaoEditCobranca(false);
      }

      if (!vencimentoModalEditCobranca) {
        setErroVencimentoEditCobranca(true);
      } else {
        setErroVencimentoEditCobranca(false);
      }

      if (!valorModalEditCobranca) {
        setErroValorEditCobranca(true);
      } else {
        setErroValorEditCobranca(false);
      }

      return
    }


    setOpenModalEditCobranca(false)
  }
  return (
    <div className="backdrop-modal-edicao-cobranca">
      <div className="container-modal-edicao-cobranca">
        <div className="titulo">
          <div className="titulo-modal">
            <img src={iconFolhaCobranca} alt="icone folha de cobrança" />
            <h3>Edição de Cobrança</h3>
          </div>
          <div className="fechar-modal" onClick={() => setOpenModalEditCobranca(false)}>
            <img src={iconClose} alt="Fechar modal" />
          </div>
        </div>
        <form action="submit" onSubmit={(event) => handleSubmit(event)}>
          <div className="field">
            <label htmlFor="inputNomeDevedor">Nome*</label>
            <input type="text" id="inputNomeDevedor" value={nomeModalEditCobranca} readOnly />
          </div>
          <div className="field">
            <label htmlFor="inputDescricao">Descrição*</label>
            <textarea
              type="text"
              id="inputDescricao"
              rows="3"
              maxLength="150"
              placeholder="Digite a descrição"
              value={descricaoModalEditCobranca}
              onChange={(e) => setDescricaoModalEditCobranca(e.target.value)}
              style={erroDescricaoEditCobranca ? { borderColor: 'red' } : {}}
            >
            </textarea>
            {erroDescricaoEditCobranca ? <span style={{ color: 'red' }} id='spanError-editCob'>Campo 'Descrição' é obrigatório.</span> : null}
          </div>
          <div className="container-fields-venc-valor">
            <div className="field">
              <label htmlFor="inputVencimento">Vencimento*</label>
              <input
                type="date"
                id="inputVencimento"
                placeholder="Data de Vencimento"
                value={vencimentoModalEditCobranca}
                onChange={(e) => setVencimentoModalEditCobranca(e.target.value)}
                style={erroVencimentoEditCobranca ? { borderColor: 'red' } : {}}
              />
              {erroVencimentoEditCobranca ? <span style={{ color: 'red' }} id='spanError-editCob'>Campo 'Vencimento' é obrigatório.</span> : null}
            </div>
            <div className="field">
              <label htmlFor="inputValor">Valor*</label>
              <input
                type="number"
                id="inputValor"
                placeholder="Digite o valor"
                value={valorModalEditCobranca}
                onChange={e => setValorModalEditCobranca(e.target.value)}
                style={erroValorEditCobranca ? { borderColor: 'red' } : {}}
              />
              {erroValorEditCobranca ? <span style={{ color: 'red' }} id='spanError-editCob'>Campo 'Valor' é obrigatório.</span> : null}
            </div>
          </div>
          <span>Status*</span>
          <div className="field-checkbox">
            <div className="background-group-radio">
              <div class="group-radio">
                <input id="paga" type="radio" name="status-cobranca" value="paga" checked={
                  statusModalEditCobranca === 'paga' ? checado : !checado
                } onChange={() => setStatusModalEditCobranca('paga')} />
                <label for="paga">Cobrança Paga</label>
              </div>
            </div>
            <div className="background-group-radio">
              <div class="group-radio">
                <input id="pendente" type="radio" name="status-cobranca" value="pendente" checked={
                  statusModalEditCobranca === 'pendente' || statusModalEditCobranca === 'vencida' ? checado : !checado
                } onChange={() => setStatusModalEditCobranca('pendente')} />
                <label for="pendente">Cobrança Pendente</label>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button id="btn-cancel" onClick={() => setOpenModalEditCobranca(false)}>Cancelar</button>
            <button type='submit' id="btn-aply">Aplicar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditarCobranca;
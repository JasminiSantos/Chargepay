import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useContext, useEffect, useState } from "react";
import btnFiltro from "../../Assets/filtro.svg";
import iconCobranca from "../../Assets/icon-cobrancas.svg";
import search from '../../Assets/search-icon.svg';
import BuscaSemResultados from '../../Components/BuscaSemResultados';
import Head from '../../Components/Head';
import Menu from '../../Components/Menu';
import TableClients from '../../Components/TableClients';
import ContextModal from '../../Context/contextModal';
import { listarCobranca, obterCobrancasPagas, obterCobrancasPrevistas, obterCobrancasVencidas } from "../../Hooks/useCobranca";
import useConsumer from '../../Hooks/useConsumer';
import './styles.css';

function Cobrancas() {
  const [dadosCobranca, setDadosCobranca] = useState(null);
  const [busca, setBusca] = useState('');
  const { openModalExcluirCobranca, open, setOpen, setOpenEdit, openEdit } = useContext(ContextModal);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const { cobrancasPagas, cobrancasPrevistas, cobrancasVencidas } = useConsumer();

  async function listar() {
    if (cobrancasPagas) {
      const response = await obterCobrancasPagas();
      setDadosCobranca(response);
    } else if (cobrancasPrevistas) {
      const response = await obterCobrancasPrevistas();
      setDadosCobranca(response);
    } else if (cobrancasVencidas) {
      const response = await obterCobrancasVencidas();
      setDadosCobranca(response);
    } else {
      const dadosCobranca = await listarCobranca()
      setDadosCobranca(dadosCobranca)
    }
  }

  useEffect(() => {
    listar()
  }, [])

  useEffect(() => {
    listar()
  }, [openModalExcluirCobranca])

  async function filtroBusca(inputValue) {
    let cobrancas = await listarCobranca()
    if (inputValue !== '') {
      cobrancas = cobrancas.filter((item) => (item.cliente.toLowerCase() === inputValue.toLowerCase() || item.id == inputValue))

    }
    setDadosCobranca(cobrancas)
  }

  return (
    <div className="container-cobrancas">
      <Menu />
      <div className="principal">
        <Head title="Cobranças" />
        <div className="container-table2">
          <header >
            <span>
              <img src={iconCobranca} alt="ícone cobrança" />
              <h3>Cobranças</h3>
            </span>
            <span>
              <button><img src={btnFiltro} alt="filtro" /></button>
              <div className="search-button">
                <input placeholder="Pesquisa" type="search"
                  type="text" value={busca} onChange={(ev) => setBusca(ev.target.value)}
                />
                <img className="search-icon" src={search} alt="search icon" onClick={() => filtroBusca(busca)} />
              </div>
            </span>
          </header>
          <main>
            {!dadosCobranca ? <></> : dadosCobranca.length ? <TableClients dados={dadosCobranca} setDadosCobranca={setDadosCobranca} /> : <BuscaSemResultados />}
          </main>
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity={open} sx={open === "success" ? { bgcolor: '#C3D4FE', color: '#243F80', width: '100%', fontSize: '14px' } : { bgcolor: '#F2D6D0', color: '#AE1100', width: '100%', fontSize: '14px' }}>
            {open === "success" ? "Cobrança excluida com sucesso" : "Cobrança não esta pendente"}
          </Alert>
        </Snackbar>
        <Snackbar open={openEdit} autoHideDuration={2000} onClose={() => setOpenEdit(false)}>
          <Alert onClose={() => setOpenEdit(false)} severity="success" sx={{ bgcolor: '#C3D4FE', color: '#243F80', width: '100%', fontSize: '14px' }}>
            Cobrança editada com sucesso
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Cobrancas;

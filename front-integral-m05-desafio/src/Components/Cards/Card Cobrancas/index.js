import { useNavigate } from 'react-router-dom';
import useConsumer from '../../../Hooks/useConsumer';
import { formatToMoney } from '../../../utils/formatters';
import './styles.css';

function CardCobrancas({ title, count, bgColor, dados }) {
  const { cobrancasPagas, setCobrancasPagas, cobrancasVencidas, setCobrancasVencidas, cobrancasPrevistas, setCobrancasPrevistas } = useConsumer();
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();

    if (bgColor === 'pagas') {
      setCobrancasPagas(true);
      setCobrancasPrevistas(false);
      setCobrancasVencidas(false);
    } else if (bgColor === 'previstas') {
      setCobrancasPagas(false);
      setCobrancasPrevistas(true);
      setCobrancasVencidas(false);
    } else if (bgColor === 'vencidas') {
      setCobrancasPagas(false);
      setCobrancasPrevistas(false);
      setCobrancasVencidas(true);
    }

    navigate("/cobrancas");
  }

  return (
    <div className="container-card-cobrancas">
      <header>
        <h3>{title}</h3>
        <span className={bgColor}>{count}</span>
      </header>
      <main>
        <div className="table">
          <div className="table-cobrancas-title">
            <div className="table-cobrancas-title-cell cliente">Cliente</div>
            <div className="table-cobrancas-title-cell id">ID da cob.</div>
            <div className="table-cobrancas-title-cell valor">Valor</div>
          </div>
          {dados.slice(0, 4).map(item => (
            <div className="table-line">
              <div className="line-cell cliente">{item.cliente}</div>
              <div className="line-cell id">{item.id}</div>
              <div className="line-cell valor">{formatToMoney(item.valor)}</div>
            </div>
          ))}
          {dados.length === 0 && <div className="table-line vazio">Nenhum registro a ser mostrado.</div>}
        </div>
      </main>
      <footer>
        <a onClick={(event) => handleClick(event)}>Ver todos</a>
      </footer>
    </div>
  );
}

export default CardCobrancas;
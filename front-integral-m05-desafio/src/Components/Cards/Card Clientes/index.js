import './styles.css';
import useConsumer from '../../../Hooks/useConsumer';
import { useNavigate } from 'react-router-dom';

function CardClientes({ title, icon, count, bgColor, dados }) {
  const { clientesInadimplentes, setClientesInadimplentes, clientesEmDia, setClientesEmDia, clientesTodos, setClientesTodos } = useConsumer();
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();

    if (bgColor === 'em-dia') {
      setClientesEmDia(true);
      setClientesInadimplentes(false);
      setClientesTodos(false);
    } else if (bgColor === 'inadimplentes') {
      setClientesEmDia(false);
      setClientesInadimplentes(true);
      setClientesTodos(false);
    } else {
      setClientesEmDia(false);
      setClientesInadimplentes(false);
      setClientesTodos(true);
    }

    navigate("/cliente");
  }

  return (
    <div className="container-card-clientes">
      <header>
        <div className="esquerda-header">
          <img src={icon} alt="icone-card-clientes" />
          <h3>{title}</h3>
        </div>
        <span className={bgColor}>{count}</span>
      </header>
      <main>
        <div className='table'>
          <div className='table-clientes-title'>
            <div className='table-clientes-title-cell cliente'>Clientes</div>
            <div className='table-clientes-title-cell vencimento'>ID do Cliente</div>
            <div className='table-clientes-title-cell valor'>CPF</div>
          </div>
          {dados.slice(0, 4).map(item => (
            <div className='table-line'>
              <div className='line-cell cliente'>{item.nome}</div>
              <div className='line-cell vencimento'>{item.id}</div>
              <div className='line-cell valor'>{item.cpf}</div>
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

export default CardClientes;
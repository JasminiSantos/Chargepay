import './styles.css';
import iconHomeActive from '../../Assets/icon-home-actived.svg';
import iconHomeUnactive from '../../Assets/icon-home.svg';
import iconClientes from '../../Assets/icon-clientes.svg';
import iconClientesActive from '../../Assets/icon-clients-active.svg';
import iconCobrancas from '../../Assets/icon-cobrancas.svg';
import iconCobrancasActive from '../../Assets/icon-cobrancas-active.svg';
import { NavLink } from 'react-router-dom';
import useConsumer from '../../Hooks/useConsumer';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function Menu() {
  const { btnHomeActive, setBtnHomeActive, btnClientsActive, setBtnClientsActive, btnCobrancasActive, setBtnCobrancasActive, setCobrancasPagas, setCobrancasPrevistas, setCobrancasVencidas, setCobrancasTodas, setClientesEmDia, setClientesInadimplentes, setClientesTodos, clientesEmDia, clientesInadimplentes, clientesTodos } = useConsumer();
  const location = useLocation();

  function handleClick() {
    setCobrancasTodas(true);
    setCobrancasPagas(false);
    setCobrancasPrevistas(false);
    setCobrancasVencidas(false);
    // document.location.reload();
  }

  function handleClickClients() {
    setClientesEmDia(false);
    setClientesInadimplentes(false);
    setClientesTodos(true);
    console.log(clientesEmDia, clientesInadimplentes, clientesTodos)
  }

  useEffect(() => {
    if (location.pathname === "/home") {
      setBtnHomeActive(true);
      setBtnClientsActive(false);
      setBtnCobrancasActive(false);
    } else if (location.pathname === "/cliente") {
      setBtnHomeActive(false);
      setBtnClientsActive(true);
      setBtnCobrancasActive(false);
    } else if (location.pathname === "/cobrancas") {
      setBtnHomeActive(false);
      setBtnClientsActive(false);
      setBtnCobrancasActive(true);
    }
  }, [location.pathname])

  return (
    <nav className='container-menu'>
      <NavLink to="/home">
        <button className="container-menu-button" >
          <img src={btnHomeActive ? iconHomeActive : iconHomeUnactive} alt="ícone Home" />
          <span>Home</span>
        </button>
      </NavLink>
      <NavLink to="/cliente">
        <button onClick={(event) => handleClickClients(event)}>
          <img src={btnClientsActive ? iconClientesActive : iconClientes} alt="ícone Clientes" />
          <span>Clientes</span>
        </button>
      </NavLink>
      <NavLink to="/cobrancas">
        <button onClick={(event) => handleClick(event)}>
          <img src={btnCobrancasActive ? iconCobrancasActive : iconCobrancas} alt="ícone Cobranças" />
          <span>Cobranças</span>
        </button>
      </NavLink>
    </nav>
  );
}

export default Menu;
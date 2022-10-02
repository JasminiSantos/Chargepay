import './styles.css';
import iconUser from '../../Assets/icon-user.svg';
import arrowDown from '../../Assets/arrow-down.svg';
import iconEditHead from '../../Assets/icon-edit-head.svg';
import iconSairHead from '../../Assets/icon-sair-head.svg';
import { useContext, useState } from 'react';
import ContextModal from '../../Context/contextModal';
import ModalEditUser from '../ModalEditUser';
import ModalSuccess from '../ModalEditUser/ModalSuccess';
import useConsumer from '../../Hooks/useConsumer';

function Head({ title }) {
  const { redirecionar, usuarioLogado } = useConsumer()
  const [modalHead, setModalHead] = useState(false);
  const { setOpenModalEditUser, openModalEditUserSuccess } = useContext(ContextModal);
  const { tokenStorage } = useConsumer();


  function handleClickSair() {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")

    redirecionar("/")

  }

  function handleShowModal() {
    setOpenModalEditUser(true);
  }

  return (
    <div className="container-head">
      <h2>{title}</h2>
      <div className="head-direita">
        <img className="icon-user" src={iconUser} alt="ícone usuário" />
        <span>{usuarioLogado.nome}</span>
        <img className="arrow-down" src={arrowDown} onClick={() => setModalHead(true)} alt="seta para baixo do menu do usuário" />
        {
          modalHead &&
          <div className="backdrop-head" onClick={() => setModalHead(false)}>
            <div className="modal-head">
              <button onClick={handleShowModal}>
                <img src={iconEditHead} alt="ícone editar usuário" />
                <span>Editar</span>
              </button>
              <button onClick={handleClickSair} >
                <img src={iconSairHead} alt="ícone sair da aplicação" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        }
      </div>
      <ModalEditUser />
      {openModalEditUserSuccess && <ModalSuccess />}
    </div>
  );
}

export default Head;
import './styles.css';
import Confirmado from '../../../Assets/Confirmado.svg';
import { useContext } from 'react';
import ContextModal from '../../../Context/contextModal';

export default function ModalSuccess() {
    const { setOpenModalEditUserSuccess } = useContext(ContextModal);

    return (
        <div className="backdrop__success" onClick={() => setOpenModalEditUserSuccess(false)}>
            <div className="modal__container">
                <div className="modal__image">
                    <img src={Confirmado} alt="Edição de dados confirmada" />
                </div>
                <div className="modal__message">
                    <h1>Cadastro Alterado com Sucesso!</h1>
                </div>
            </div>
        </div>
    );
}
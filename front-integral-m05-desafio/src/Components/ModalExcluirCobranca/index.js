import { useContext } from 'react';
import Alerta from '../../Assets/alerta.svg';
import IconClose from '../../Assets/icon-close.svg';
import ContextModal from '../../Context/contextModal';
import './styles.css';


export default function ModalExcluirCobranca() {
    const { setOpenModalExcluirCobranca, openModalExcluirCobranca, setOpen } = useContext(ContextModal);
    console.log(openModalExcluirCobranca);

    async function deletarCobranca() {

        await fetch(`https://charge-pay-back.herokuapp.com/cobrancas/${openModalExcluirCobranca.id}`, {
            method: 'DELETE'
        })
    }

    async function handleClickYes() {
        if (openModalExcluirCobranca.status === 'pendente') {
            console.log('pendente')
            await deletarCobranca()
            setOpenModalExcluirCobranca(false)
            setOpen("success")
        } else {
            console.log('paga ou vencida')
            setOpenModalExcluirCobranca(false)
            setOpen("error")

        }
    }

    return (
        <div className="backdrop">
            <div className="modal__container">
                <div className="modal__close" onClick={() => setOpenModalExcluirCobranca(false)}>
                    <img src={IconClose} alt="Fechar modal" />
                </div>
                <div className="modal__image">
                    <img src={Alerta} alt="Atenção!" />
                </div>
                <div className="modal__alert">
                    <h1>Tem certeza que deseja excluir esta cobrança?</h1>
                </div>
                <div className="modal__buttons">
                    <div className="btn__excluir --nao" onClick={() => setOpenModalExcluirCobranca(false)}>Não</div>
                    <div className="btn__excluir --sim" onClick={() => handleClickYes()}>Sim</div>
                </div>
            </div>
        </div>
    );
}
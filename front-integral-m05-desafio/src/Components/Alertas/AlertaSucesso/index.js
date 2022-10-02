import './styles.css';
import IconSuccess from '../../../Assets/icon-alert-success.svg';
import IconClose from '../../../Assets/icon-close-blue.svg';

export default function AlertaSucesso({ mensagem }) {
    return (
        <div className="alert__container">
            <div className="alert__message">
                <img src={IconSuccess} alt="Confirmado" />
                <h1 className="message__title">{mensagem}</h1>
            </div>
            <div className="alert__close">
                <img src={IconClose} alt="Fechar alerta" />
            </div>
        </div>
    );
}
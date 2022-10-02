import './styles.css';
import IconError from '../../../Assets/icon-alert-error.svg';
import IconClose from '../../../Assets/icon-close-red.svg';

export default function AlertaErro() {
    return (
        <div className="alert__container">
            <div className="alert__message">
                <img src={IconError} alt="Erro!" />
                <h1 className="message__title">Esta cobrança não pode ser excluída!</h1>
            </div>
            <div className="alert__close">
                <img src={IconClose} alt="Fechar alerta" />
            </div>
        </div>
    );
}
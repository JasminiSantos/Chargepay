import './styles.css';
import NotFound from '../../Assets/not-found.svg';

export default function BuscaSemResultados() {
    return (
        <div className="container">
            <div className="container__image">
                <img src={NotFound} alt="Sem resultados" />
            </div>
            <div className="container__message">
                <h1 className="principal__message">Nenhum resultado foi encontrado!</h1>
                <h3 className="sub__message">Verifique se a escrita está correta</h3>
            </div>
        </div>
    );
}
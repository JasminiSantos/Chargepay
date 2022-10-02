import iconArrows from '../../../Assets/icon-arrows.svg';
import './styles.css';

export default function TableHeader() {
    return (
        <div className="table__header">
            <div className="column__title">
                <img src={iconArrows} alt="" />
                <span>ID Cob.</span>
            </div>
            <div className="column__title">
                <img src={iconArrows} alt="" />
                <span>Data de venc.</span>
            </div>
            <div className="column__title">
                <span>Valor</span>
            </div>
            <div className="column__title">
                <span>Status</span>
            </div>
            <div className="column__title">
                <span>Descrição</span>
            </div>
        </div>
    )
}
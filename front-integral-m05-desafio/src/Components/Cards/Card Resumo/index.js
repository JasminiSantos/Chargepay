import { formatToMoneyDecimal } from '../../../utils/formatters';
import './styles.css';

function CardResumo({ title, value, icon, bgColor }) {

  return (
    <div className={`card-resumo ${bgColor}`}>
      <img src={icon} alt="ícone do tipo de cobrança" />
      <div className='dadosCobranca'>
        <h3>{title}</h3>
        <strong className='valorResumoCobranca'>
          R$ {formatToMoneyDecimal(value)}
        </strong>
      </div>
    </div>
  )
}

export default CardResumo;
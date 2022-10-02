import iconEdit from '../../../Assets/icon-edit-head.svg';
import iconDelete from '../../../Assets/icon-delete-red.svg';
import './styles.css';
import { useContext, useState } from 'react';
import ContextModal from '../../../Context/contextModal';
import { format } from "date-fns";
import ModalEditarCobranca from '../../ModalEditarCobranca';
import ModalExcluirCobranca from '../../ModalExcluirCobranca';
import ModalDetalhesCobranca from '../../ModalDetalhesCobranca';
import { formatToMoney } from '../../../utils/formatters';

export default function TableBody({ dados }) {
    const { openModalEditCobranca, setOpenModalEditCobranca } = useContext(ContextModal);
    const { openModalExcluirCobranca, setOpenModalExcluirCobranca } = useContext(ContextModal);
    const { openModalDetalhesCobranca, setOpenModalDetalhesCobranca } = useContext(ContextModal);
    const { setDetalhesCobranca } = useContext(ContextModal);

    function handleOpenModalDetalhesCobranca(item) {
        setOpenModalDetalhesCobranca(true);
        setDetalhesCobranca({
            id: item.id,
            cliente_id: item.cliente_id,
            cliente: item.cliente,
            descricao: item.descricao,
            status: item.status,
            valor: item.valor,
            vencimento: format(new Date(item.vencimento), "dd-MM-yyyy"),
        });
    }

    return (
        <div>
            {dados?.map((item) => (
                <div className="table__body">
                    <div className="body__field" onClick={() => handleOpenModalDetalhesCobranca(item)}>
                        <span>{item.id}</span>
                    </div>
                    <div className="body__field" onClick={() => handleOpenModalDetalhesCobranca(item)}>
                        <span>{format(new Date(item.vencimento), "dd-MM-yyyy")}</span>
                    </div>
                    <div className="body__field" onClick={() => handleOpenModalDetalhesCobranca(item)}>
                        <span>R$ {formatToMoney(item.valor)}</span>
                    </div>
                    <div className="body__field field--status" onClick={() => handleOpenModalDetalhesCobranca(item)}>
                        <span className={item.status}>{item.status}</span>
                    </div>
                    <div className="body__field field--description" onClick={() => handleOpenModalDetalhesCobranca(item)}>
                        <span>
                            {item.descricao}
                        </span>
                    </div>
                    <div className="body__field field--actions">
                        <button className="btn__edit-cobranca" onClick={() => setOpenModalEditCobranca(item)}>
                            <span>
                                <img src={iconEdit} alt="Editar cobrança" />
                            </span>
                            <span>Editar</span>
                        </button>
                        <button className="btn__delete-cobranca" onClick={() => setOpenModalExcluirCobranca(item)}>
                            <span>
                                <img src={iconDelete} alt="Excluir cobrança" />
                            </span>
                            <span>Excluir</span>
                        </button>
                    </div>
                </div>

            ))}
            {openModalEditCobranca && <ModalEditarCobranca />}
            {openModalExcluirCobranca && <ModalExcluirCobranca />}
            {openModalDetalhesCobranca && <ModalDetalhesCobranca />}
        </div>
    )
}

import "./styles.css";
import { format } from "date-fns";
import iconOrdenar from "../../Assets/seta ordenar.svg";
import btnExcluir from "../../Assets/Botao-Excluir-Tabela.svg";
import btnEditar from "../../Assets/Botao-Editar-Tabela.svg";

import { useState } from "react";
import { useContext } from "react";
import ContextModal from "../../Context/contextModal";
import ModalEditarCobranca from "../ModalEditarCobranca";
import ModalExcluirCobranca from "../ModalExcluirCobranca";
import ModalDetalhesCobranca from "../ModalDetalhesCobranca";
import BuscaSemResultados from "../BuscaSemResultados";
import { formatToMoney } from '../../utils/formatters';

// import search from '../../Assets/search-icon.svg';
// import { listarCobranca } from "../../Hooks/useCobranca"

function ClientsTable({ dados, setDadosCobranca }) {
    const [orderCliente, setOrderCliente] = useState('asc');
    const [orderId, setOrderId] = useState('asc');
    const { openModalEditCobranca, setOpenModalEditCobranca } = useContext(ContextModal);
    const { openModalExcluirCobranca, setOpenModalExcluirCobranca } = useContext(ContextModal);
    const { openModalDetalhesCobranca, setOpenModalDetalhesCobranca, setDetalhesCobranca } = useContext(ContextModal);


    function sortOrder(sortfield, order) {
        const newOrder = order === 'asc' ? 'desc' : 'asc';

        dados.sort((a, b) => {
            if (newOrder === 'asc') {
                return a[sortfield] > b[sortfield] ? 1 : -1
            } else {
                return a[sortfield] > b[sortfield] ? -1 : 1
            }
        }).map(item => item);

        if (sortfield === 'cliente') {
            setOrderCliente(newOrder)
        } else if (sortfield === 'id') {
            setOrderId(newOrder)
        }
    }



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

        <div className="container-table2">
            <div className="table-clients">
                {dados.length ?
                    <div className="table-clients-title">
                        <div className="table-cobrancas2-title">
                            <div className="table-cobrancas2-title-cell ">
                                <button onClick={() => sortOrder('cliente', orderCliente)}><img src={iconOrdenar} alt="icon-ordenar" /></button>
                                Cliente</div>
                            <div className="table-cobrancas2-title-cell ">
                                <button onClick={() => sortOrder('id', orderId)}><img src={iconOrdenar} alt="icon-ordenar" /></button>
                                ID cob.</div>
                            <div className="table-cobrancas2-title-cell ">Valor</div>
                            <div className="table-cobrancas2-title-cell ">Data de venc.</div>
                            <div className="table-cobrancas2-title-cell ">Status</div>
                            <div className="table-cobrancas2-title-cell ">Descrição</div>
                            <div className="table-cobrancas2-title-cell "></div>
                        </div>
                        {dados?.map((item) => (
                            <div className="table-line">
                                <div className="line-cell cliente" onClick={() => handleOpenModalDetalhesCobranca(item)}>{item.cliente}</div>
                                <div className="line-cell " onClick={() => handleOpenModalDetalhesCobranca(item)}>{item.id}</div>
                                <div className="line-cell valor" onClick={() => handleOpenModalDetalhesCobranca(item)}>R$ {formatToMoney(item.valor)}</div>
                                <div className="line-cell dataVenc" onClick={() => handleOpenModalDetalhesCobranca(item)}>{format(new Date(item.vencimento), "dd-MM-yyyy")}</div>
                                <div
                                    className={`line-cell ${item.status}`}
                                    onClick={() => handleOpenModalDetalhesCobranca(item)}
                                >
                                    {item.status}
                                </div>
                                <div className="line-cell descricao" onClick={() => handleOpenModalDetalhesCobranca(item)}>{item.descricao}</div>
                                <span>
                                    <div className="btn-editar " onClick={() => setOpenModalEditCobranca(item)}>
                                        <button>
                                            <img src={btnEditar} alt="botão editar" />
                                        </button>
                                    </div>
                                    <div className="btn-excluir ">
                                        <button onClick={() => setOpenModalExcluirCobranca(item)}>
                                            <img src={btnExcluir} alt="botão excluir" />
                                        </button>
                                    </div>
                                </span>
                            </div>
                        ))}
                        {openModalExcluirCobranca && <ModalExcluirCobranca />}
                        {openModalEditCobranca && <ModalEditarCobranca />}
                        {openModalDetalhesCobranca && <ModalDetalhesCobranca />}
                    </div>

                    : <BuscaSemResultados />}
            </div>
        </div>
    )

}

export default ClientsTable;
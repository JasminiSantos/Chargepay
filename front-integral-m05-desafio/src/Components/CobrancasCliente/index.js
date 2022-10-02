import './styles.css';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { useState, useEffect, useContext } from 'react';
import ModalCadastroCobrança from '../ModalCadastroCobranca';
import { listarCobranca } from "../../Hooks/useCobranca";
import ContextModal from '../../Context/contextModal';

export default function CobrancasCliente({ cliente }) {
    const [openModalCadastroCobranca, setOpenModalCadastroCobranca] = useState(false);
    const [open, setOpen] = useState();
    const [dadosCobranca, setDadosCobranca] = useState([]);
    const { idCliente } = useContext(ContextModal);

    async function listar() {
        const dadosCobranca = await listarCobranca();
        setDadosCobranca(dadosCobranca.filter(cobranca => cobranca.cliente_id === idCliente));
    }

    useEffect(() => {
        listar()
    }, [dadosCobranca])


    return (
        <div className="container__cobrancas">
            <div className="container__header">
                <h2 className="header__title">Cobranças do Cliente</h2>
                <button className="btn__add-cobranca" onClick={() => setOpenModalCadastroCobranca(true)}>
                    <span>+ Nova Cobrança</span>
                </button>
            </div>
            <div className="container__table">
                <TableHeader />
                <TableBody dados={dadosCobranca} />
            </div>
            {openModalCadastroCobranca && <ModalCadastroCobrança setOpenModalCadastroCobranca={setOpenModalCadastroCobranca} setOpen={setOpen} client={cliente} />}
        </div>
    );
}
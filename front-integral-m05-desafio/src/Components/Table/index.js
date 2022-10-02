import './style.css';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import cobranca from "../../Assets/cobranca.svg";
import arrowUpDown from "../../Assets/arrow-up-down.svg";
import { useState } from "react";
import ModalCadastroCobrança from "../ModalCadastroCobranca";
import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DetalhesCliente from '../../Pages/DetalhesCliente';




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Table({ clients }) {
    const [chave, setChave] = useState(null);
    const [orderCliente, setOrderCliente] = useState('asc');
    const [openModalCadastroCobranca, setOpenModalCadastroCobranca] = useState(false);
    const [open, setOpen] = useState(false);
    const [detalhe, setDetalhe] = useState(false);


    const navigate = useNavigate();

    function sortOrder(sortfield, order) {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        clients.sort((a, b) => {
            if (newOrder === 'asc') {
                return a[sortfield] > b[sortfield] ? 1 : -1
            } else {
                return a[sortfield] > b[sortfield] ? -1 : 1
            }
        });

        if (sortfield === 'cliente') {
            setOrderCliente(newOrder)

        }
    }

    return (
        <div className="table2">
                <>
                    <div className="table-head">
                        <div className="table-head-cell"><img src={arrowUpDown} alt="arrows icon" onClick={() => sortOrder('cliente', orderCliente)} />Cliente</div>
                        <div className="table-head-cell">CPF</div>
                        <div className="table-head-cell">E-mail</div>
                        <div className="table-head-cell">Telefone</div>
                        <div className="table-head-cell">Status</div>
                        <div className="table-head-cell">Criar cobrança</div>
                    </div>
                    {clients.map((client) => {
                        return (
                            <div className="table-line" key={client.id}>
                                <div className="table-line-cell" onClick={() => { setChave(client); setDetalhe(true); navigate('/cliente/detalhes', { state: { client: client } }) }}>{client.nome}</div>
                                <div className="table-line-cell" onClick={() => { setChave(client); setDetalhe(true); navigate('/cliente/detalhes', { state: { client: client } }) }}>{client.cpf}</div>
                                <div className="table-line-cell" onClick={() => { setChave(client); setDetalhe(true); navigate('/cliente/detalhes', { state: { client: client } }) }}>{client.email}</div>
                                <div className="table-line-cell" onClick={() => { setChave(client); setDetalhe(true); navigate('/cliente/detalhes', { state: { client: client } }) }}>{client.telefone}</div>
                                <div className={`table-line-cell ${client.status}`}>{`${client.status ? 'Em dia' : 'Inadimplente'}`}</div>
                                <div className="table-line-cell">
                                    <button className="table-button" onClick={() => {
                                        setOpenModalCadastroCobranca(true);
                                        setChave(client);
                                        setDetalhe(true);
                                    }}>
                                        <img src={cobranca} alt="cobrança icon" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {openModalCadastroCobranca && <ModalCadastroCobrança setOpenModalCadastroCobranca={setOpenModalCadastroCobranca} setOpen={setOpen} client={chave} />}
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', fontSize: '14px', bgcolor: '#C3D4FE', color: '#243F80' }}>
                            Cadastro concluído com sucesso
                        </Alert>
                    </Snackbar>
                    {false && <DetalhesCliente client={chave} detalhe={detalhe} />}
                </>
            
        </div>
    );
}

export default Table;
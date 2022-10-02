import './style.css';
import { useState, useEffect } from 'react';
import SearchButton from '../../Components/SearchButton';
import userClients from '../../Assets/userClients.svg';
import Modal from '../../Components/Modal';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Menu from '../../Components/Menu';
import Head from '../../Components/Head';
import Table from '../../Components/Table';
import useClients from '../../Hooks/useClients';
import { loadClients } from '../../Hooks/useClientsData';
import search from '../../Assets/search-icon.svg';
import BuscaSemResultados from "../../Components/BuscaSemResultados";
import { useNavigate } from 'react-router-dom';
import useConsumer from '../../Hooks/useConsumer';
import { obterClientesFiltrados } from '../../Hooks/useCobranca';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedButton({ text, setShowModal }) {
    return (
        <button onClick={() => setShowModal(true)} className="customized-button">{text}</button>
    );
}

function CadastroCliente() {
    const [showModal, setShowModal] = useState(false);
    const [open, setOpen] = useState(false);
    const { clients, setClients } = useClients();
    const [busca, setBusca] = useState('');
    const { clientesInadimplentes, setClientesInadimplentes, clientesEmDia, setClientesEmDia, clientesTodos, setClientesTodos } = useConsumer();
    const navigate = useNavigate();

    async function filtroBusca(inputValue) {
        let clientes = await loadClients()
        if (inputValue !== '') {
            clientes = clientes.filter((client) => (client.nome.toLowerCase() === inputValue.toLowerCase() ||
                client.cpf.toLowerCase() === inputValue.toLowerCase()) ||
                client.email.toLowerCase() === inputValue.toLowerCase()

            )
        }
        setClients(clientes)
    }

    async function listar() {
        if (clientesEmDia) {
            const response = await obterClientesFiltrados();
            setClients(response.adimplentes);
        } else if (clientesInadimplentes) {
            const response = await obterClientesFiltrados();
            setClients(response.inadimplentes);
        } else if (clientesTodos) {
            const load = await loadClients();
            setClients(load);
        }
    }

    useEffect(async () => {
        setClientesEmDia(false);
        setClientesInadimplentes(false);
        setClientesTodos(true);
        const load = await loadClients();
        setClients(load);
        listar();
    }, [])

    //     useEffect(async () => {
    //         const load = await loadClients()
    //         setClients(load)
    //     }, [clients])

    return (
        <div className="container-cadastro-clientes">
            <Menu />
            <div className="principal">
                <Head title="Clientes" />
                <main>
                    <div className="buttons-line">
                        <div className="clients-text-section">
                            <img src={userClients} alt="clients icon" />
                            <h3>Clientes</h3>
                        </div>
                        <div className="add-search-section">
                            <CustomizedButton
                                text="+ Adicionar cliente"
                                setShowModal={setShowModal}
                            />
                            <div className="search-button">
                                <input placeholder="Pesquisa" type="search" onChange={(ev) => setBusca(ev.target.value)} />
                                <img className="search-icon" src={search} alt="search icon" onClick={() => filtroBusca(busca)} />
                            </div>
                        </div>
                    </div>
                    {!clients ? <></> : clients.length ? <Table clients={clients} /> : <BuscaSemResultados />}
                </main>
                {showModal && <Modal setOpen={setOpen} setShowModal={setShowModal} />}
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', fontSize: '14px', bgcolor: '#C3D4FE', color: '#243F80' }}>
                        Cadastro concluído com sucesso
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default CadastroCliente;
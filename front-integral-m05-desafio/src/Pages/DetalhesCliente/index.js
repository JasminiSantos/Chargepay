import Head from '../../Components/Head';
import Menu from '../../Components/Menu';
import iconClients from '../../Assets/icon-clientes.svg';
import './styles.css';
import DadosCliente from '../../Components/DadosCliente';
import CobrancasCliente from '../../Components/CobrancasCliente';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import useConsumer from '../../Hooks/useConsumer'
import ContextModal from '../../Context/contextModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from "react";


export default function DetalhesCliente({ detalhe }) {
    const location = useLocation();
    const [cliente, setCliente] = useState({});
    const { setIdCliente, open, setOpen, openEdit, setOpenEdit } = useContext(ContextModal);
    const { openModal, sucessoEdit, setSucessoEdit } = useConsumer()

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    useEffect(() => {
        async function load() {
            await handleLoadCliente();
        }

        load()
    }, [detalhe]);

    useEffect(() => {
        async function load() {
            await handleLoadCliente();
        }
        load()
    }, [openModal]);

    async function handleLoadCliente() {
        try {
            const response = await fetch(`https://charge-pay-back.herokuapp.com/cliente/${location.state.client.id}`, {
                method: 'GET'
            });

            const data = await response.json();

            setCliente(data[0]);
            setIdCliente(data[0].id)

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container__details">
            <Menu />
            <div className="principal">
                <Head title="Clientes > Detalhes do Cliente" />
                <main>
                    <div className="client__name">
                        <img src={iconClients} alt="Cliente" />
                        <h1>{cliente.nome}</h1>
                    </div>
                    <DadosCliente cliente={cliente} />
                    <CobrancasCliente cliente={cliente} />
                </main>
            </div>
            <Snackbar open={sucessoEdit} autoHideDuration={6000} onClose={() => setSucessoEdit(false)}>
                <Alert onClose={() => setSucessoEdit(false)} severity="success" sx={{ bgcolor: '#C3D4FE', color: '#243F80', width: '100%', fontSize: '14px' }}>
                    Cliente editado com sucesso
                </Alert>
            </Snackbar>
                <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={open} sx={open === "success" ? { bgcolor: '#C3D4FE', color: '#243F80', width: '100%', fontSize: '14px' } : { bgcolor: '#F2D6D0', color: '#AE1100', width: '100%', fontSize: '14px' }}>
                    {open === "success" ? "Cobrança excluida com sucesso" : "Cobrança não esta pendente"}
                </Alert>
            </Snackbar>
            <Snackbar open={openEdit} autoHideDuration={2000} onClose={() => setOpenEdit(false)}>
                <Alert onClose={() => setOpenEdit(false)} severity="success" sx={{ bgcolor: '#C3D4FE', color: '#243F80', width: '100%', fontSize: '14px' }}>
                    Cobrança editada com sucesso
                </Alert>
            </Snackbar>
        </div>
    );
}

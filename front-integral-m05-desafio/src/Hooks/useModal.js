import { useState } from "react";

export default function useModal() {
    const [openModalEditUser, setOpenModalEditUser] = useState(false);
    const [openModalEditCobranca, setOpenModalEditCobranca] = useState(false);
    const [openModalExcluirCobranca, setOpenModalExcluirCobranca] = useState(false);
    const [openModalEditUserSuccess, setOpenModalEditUserSuccess] = useState(false);
    const [openModalDetalhesCobranca, setOpenModalDetalhesCobranca] = useState(false);

    const [idCliente, setIdCliente] = useState("");
    const [detalhesCobranca, setDetalhesCobranca] = useState({});

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false)

    async function editarCobranca(body) {

        const response = await fetch('https://charge-pay-back.herokuapp.com/cobrancas', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const sucesso = response.json()
        return sucesso
    }
    return {
        openModalEditUser,
        setOpenModalEditUser,

        openModalEditUserSuccess,
        setOpenModalEditUserSuccess,

        openModalEditCobranca,
        setOpenModalEditCobranca,

        openModalExcluirCobranca,
        setOpenModalExcluirCobranca,

        openModalDetalhesCobranca,
        setOpenModalDetalhesCobranca,

        editarCobranca,

        idCliente,
        setIdCliente,

        detalhesCobranca,
        setDetalhesCobranca,

        open,
        setOpen,

        openEdit,
        setOpenEdit
    }
}
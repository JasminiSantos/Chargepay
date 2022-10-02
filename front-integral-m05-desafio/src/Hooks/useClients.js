import { useState } from "react";

export default function useClients() {
    const [clients, setClients] = useState(null);

    const [nome, setNome] = useState("");
    const [erroNome, setErroNome] = useState(false);

    const [email, setEmail] = useState("");
    const [erroEmail, setErroEmail] = useState(false);
    const [erroEmailEncontrado, setErroEmailEncontrado] = useState(false);

    const [cpf, setCpf] = useState("");
    const [erroCpf, setErroCpf] = useState(false);

    const [telefone, setTelefone] = useState("");
    const [erroTelefone, setErroTelefone] = useState(false);

    const [endereco, setEndereco] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cep, setCep] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [status, setStatus] = useState(true);

    const [descricao, setDescricao] = useState("");
    const [vencimento, setVencimento] = useState("");
    const [valor, setValor] = useState(null);
    const [statusCobranca, setStatusCobranca] = useState(true)
    const [cobrancas, setCobrancas] = useState([]);
    const [erroDescricao, setErroDescricao] = useState(false);
    const [erroVencimento, setErroVencimento] = useState(false);
    const [erroValor, setErroValor] = useState(false);




    return {
        clients,
        setClients,
        nome,
        setNome,
        erroNome,
        setErroNome,
        email,
        setEmail,
        erroEmail,
        setErroEmail,
        erroEmailEncontrado,
        setErroEmailEncontrado,
        cpf,
        setCpf,
        erroCpf,
        setErroCpf,
        telefone,
        setTelefone,
        erroTelefone,
        setErroTelefone,
        endereco,
        setEndereco,
        complemento,
        setComplemento,
        cep,
        setCep,
        bairro,
        setBairro,
        cidade,
        setCidade,
        uf,
        setUf,
        status,
        setStatus,
        descricao,
        setDescricao,
        vencimento,
        setVencimento,
        valor,
        setValor,
        cobrancas,
        setCobrancas,
        statusCobranca,
        setStatusCobranca,
        erroDescricao,
        setErroDescricao,
        erroVencimento,
        setErroVencimento,
        erroValor,
        setErroValor
    }
}
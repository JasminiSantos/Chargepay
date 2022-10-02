import './style.css';
import close from "../../Assets/close.svg";
import userClients from '../../Assets/userClients.svg';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import useClients from '../../Hooks/useClients';
import Helpertext from "../Helpertext";
import { loadClients } from '../../Hooks/useClientsData';

function Modal({setShowModal, setOpen}){
    const {clients, setClients, nome, setNome, erroNome,setErroNome, status, email, setEmail, erroEmail, setErroEmail, erroEmailEncontrado, setErroEmailEncontrado, cpf, setCpf, erroCpf, setErroCpf, telefone, setTelefone, erroTelefone,  setErroTelefone, endereco, setEndereco, complemento, setComplemento, cep, setCep, bairro, setBairro, cidade, setCidade, uf, setUf} = useClients();

    useEffect(() => {
        const viacep = async () => {
            if (cep.replace('-', '').length === 8) {
                const url = `https://viacep.com.br/ws/${cep}/json/`;
                const data = await fetch(url);
                const result = await data.json();

                if (result) {
                    setEndereco(result.logradouro);
                    setBairro(result.bairro);
                    setCidade(result.localidade);
                    setUf(result.uf);
                }
            }
        }
        viacep();
    }, [cep])

    async function handleCreateClient(client){
        try {
            const response = await fetch('https://charge-pay-back.herokuapp.com/cliente', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(client),
            });
      
            const data = await response.json();
        
            setClients((prevState)=> [...prevState, data]);
      
          } catch (error) {
            console.log(error)
          }
    }
    function handleSubmit(event){
        event.preventDefault();

        validate();
    }

    async function saveInDb(client){
        await handleCreateClient(client);
    }
    async function checkEmail(client){     
        const data = await loadClients();
        
        return data.find(item => item.email === client.email);
        
    }

    async function validate() {
        const client = {
            nome,
            email,
            cpf,
            telefone,
            endereco,
            complemento,
            cep,
            bairro,
            cidade,
            uf,
            status
        }
        const result = await checkEmail(client);
        
        if(!result && nome && email && cpf && telefone){
            saveInDb(client);
            setShowModal(false);
            setOpen(true);
        } else {
            console.log(result)
            if (result) {
                setErroEmailEncontrado(true);
            }else{
                setErroEmailEncontrado(false);
            }

            if (!nome) {
                setErroNome(true);
            } else {
                setErroNome(false);
            }

            if (!email) {
                setErroEmail(true);
            } else {
                setErroEmail(false);
            }

            if (!cpf) {
                setErroCpf(true);
            } else {
                setErroCpf(false);
            }

            if (!telefone) {
                setErroTelefone(true);
            } else {
                setErroTelefone(false);
            }
        }

    }


    return (
        <div className="modal-background">
            <form onSubmit={handleSubmit} className="modal">
                <img
                    className="close-icon"
                    src={close}
                    alt="close icon"
                    onClick={() => setShowModal(false)}
                />

                <div className="icon-text">
                    <img src={userClients} alt="users icons"/>
                    <h1 className="modal-title">Cadastro do Cliente</h1>
                </div>

                <div className="label-input">
                    <label>Nome*</label>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 0, width: '430px'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-error"
                                error={erroNome}
                                helpertext={erroNome ? 'Este campo deve ser preenchido' : ''}
                                onChange={(event) => setNome(event.target.value)}
                                value={nome}
                                size='medium'
                                placeholder="Digite o nome"
                                inputProps={{style: {fontSize: '14px', textAlign: "left"}}}
                                FormHelperTextProps={{style: {fontSize:"14px", textAlign: "left"}}}
                            />
                            {erroNome && <Helpertext alerta='Este campo deve ser preenchido'/>}
                        </div>
                    </Box>
                </div>

                <div className="label-input">
                    <label>E-mail*</label>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 0, width: '430px'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-error"
                                error={erroEmail || erroEmailEncontrado}
                                helpertext={erroEmail ? 'Este campo deve ser preenchido' : '' || erroEmailEncontrado ? 'E-mail já cadastrado' : ''}
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                                placeholder="Digite o e-mail"
                                inputProps={{style: {fontSize: '14px', textAlign: "left"}}}
                                FormHelperTextProps={{style: {fontSize:"14px"}}}
                                size='medium'
                            />
                            {erroEmail && <Helpertext alerta='Este campo deve ser preenchido'/>}
                            {erroEmailEncontrado && <Helpertext alerta='E-mail já cadastrado'/>}
                        </div>
                    </Box>
                </div>

                <div className="cpf-telefone-section">
                    <div className="cpf-section">
                        <label>CPF*</label>
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 0, width: '195px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-error"
                                    error={erroCpf}
                                    helpertext={erroCpf ? 'Este campo deve ser preenchido' : ''}
                                    value={cpf}
                                    onChange={(event) => setCpf(event.target.value)}
                                    placeholder="Digite o cpf"
                                    inputProps={{style: {fontSize: '14px', textAlign: "left"}}}
                                    FormHelperTextProps={{style: {fontSize:"14px"}}}
                                    size='medium'
                                />
                                {erroCpf && <Helpertext alerta='Este campo deve ser preenchido'/>}
                            </div>
                        </Box>
                    </div>
                    <div className="telefone-section">
                        <label>Telefone*</label>
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 0, width: '195px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-error"
                                    error={erroTelefone}
                                    helpertext={erroTelefone ? 'Este campo deve ser preenchido' : ''}
                                    value={telefone}
                                    onChange={(event) => setTelefone(event.target.value)}
                                    placeholder="Digite o telefone"
                                    inputProps={{style: {fontSize: '14px', textAlign: "left"}}}
                                    FormHelperTextProps={{style: {fontSize:"14px"}}}
                                    size='medium'
                                />
                                {erroTelefone && <Helpertext alerta='Este campo deve ser preenchido'/>}
                            </div>
                        </Box>
                    </div>
                </div>

                <div className="label-input">
                    <label>Endereço</label>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 0, width: '430px'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-error"
                                value={endereco}
                                onChange={(event) => setEndereco(event.target.value)}
                                placeholder="Digite o endereço"
                                inputProps={{style: {fontSize: '14px', textAlign: "left"}}}
                                size='medium'
                                required
                            />
                        </div>
                    </Box>
                </div>

                <div className="label-input">
                    <label>Complemento</label>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 0, width: '430px'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-error"
                                value={complemento}
                                onChange={(event) => setComplemento(event.target.value)}
                                placeholder="Digite o complemento"
                                inputProps={{style: {fontSize: '14px', textAlign: "left"}}}
                                size='medium'
                                required
                            />
                        </div>
                    </Box>
                </div>

                <div className="cep-bairro-section">
                    <div className="cep-section">
                        <label>CEP</label>
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 0, width: '195px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-error"
                                    value={cep}
                                    onChange={(event) => setCep(event.target.value)}
                                    placeholder="Digite o cep"
                                    inputProps={{style: {fontSize: '14px'}}}
                                    size='medium'
                                    required
                                />
                            </div>
                        </Box>
                    </div>
                    <div className="bairro-section">
                        <label>Bairro</label>
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 0, width: '195px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-error"
                                    value={bairro}
                                    onChange={(event) => setBairro(event.target.value)}
                                    placeholder="Digite o bairro"
                                    inputProps={{style: {fontSize: '14px'}}}
                                    size='medium'
                                    required
                                />
                            </div>
                        </Box>
                    </div>
                </div>

                <div className="cidade-uf-section">
                    <div className="cidade-section">
                        <label>Cidade</label>
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 0, width: '230px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-error"
                                    value={cidade}
                                    onChange={(event) => setCidade(event.target.value)}
                                    placeholder="Digite a cidade"
                                    inputProps={{style: {fontSize: '14px'}}}
                                    size='medium'
                                    required
                                />
                            </div>
                        </Box>
                    </div>
                    <div className="uf-section">
                        <label>UF</label>
                        <Box
                            component="form"
                            sx={{
                            '& .MuiTextField-root': { m: 0, width: '160px'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-error"
                                    value={uf}
                                    onChange={(event) => setUf(event.target.value)}
                                    placeholder="Digite a UF"
                                    inputProps={{style: {fontSize: '14px'}}}
                                    size='medium'
                                    required
                                />
                            </div>
                        </Box>
                    </div>
                </div>
                <div className="modal-buttons">
                    <button id="cancel-button" onClick={() => setShowModal(false)} className="buttons">Cancelar</button>
                    <button type="submit" id="submit-button" className="buttons">Aplicar</button>
                </div>
            </form>
        </div>
    );
}

export default Modal;
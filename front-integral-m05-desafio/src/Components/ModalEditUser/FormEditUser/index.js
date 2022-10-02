import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect } from 'react'
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import useConsumer from '../../../Hooks/useConsumer';
import { styled } from '@mui/system';
import * as React from 'react';
import useFunction from '../../../Hooks/useFunctions'
import ContextModal from '../../../Context/contextModal';
import { useContext } from 'react';
import './styles.css';

const CustomLabel = styled(InputLabel)`
    font-size: 14px;
    font-weight: 600;
    color: #344054;
`;

export default function FormEditUser() {
    const [values, setValues] = React.useState({
        showPassword: false,
        showConfirmPassword: false,
    });

    const {
        password,
        passwordRepeat,
        setPassword,
        setPasswordRepeat,
        inputValueCadastroNome,
        setInputValueCadastroNome,
        inputValueCadastroEmail,
        setInputValueCadastroEmail,
        usuarioLogado,
        inputValueCadastroTelefone,
        setInputValueCadastroTelefone,
        inputValueCadastroCpf,
        setInputValueCadastroCpf,
        setUsuarioLogado
    } = useConsumer();


    const { editUser } = useFunction()



    const [errorName, setErrorName] = React.useState(false);
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = React.useState(false);
    const [errorInequalPasswords, setErrorInequalPasswords] = React.useState(false);
    const { setOpenModalEditUser, setOpenModalEditUserSuccess } = useContext(ContextModal);

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    useEffect(() => {
        setInputValueCadastroEmail(usuarioLogado.email)
        setInputValueCadastroNome(usuarioLogado.nome)
        setInputValueCadastroTelefone(usuarioLogado.telefone)
        setInputValueCadastroCpf(usuarioLogado.cpf)
        setPassword(usuarioLogado.senha)
        setPasswordRepeat(usuarioLogado.senha)
    }, []);



    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let error = validate();

        if(!error) {
            const usuarioAtualizado = {
                nome: inputValueCadastroNome,
                email: inputValueCadastroEmail,
                cpf: inputValueCadastroCpf,
                telefone: inputValueCadastroTelefone,
                senha: password
            }
            await editUser(usuarioAtualizado, usuarioLogado.id)
            const usuarioLogadoAtualizado = {
                id: usuarioLogado.id,
                ...usuarioAtualizado
            }
    
            setUsuarioLogado(usuarioLogadoAtualizado);
            console.log("sem erros");
            setOpenModalEditUser(false);
            setOpenModalEditUserSuccess(true);
        }       

    }

    function validate() {
        let error = false;

        if(!inputValueCadastroNome) {
            setErrorName(true);
            error = true;
        } else {
            setErrorName(false);
        }

        if(!inputValueCadastroEmail) {
            setErrorEmail(true);
            error = true;
        } else {
            setErrorEmail(false);
        }

        if(!passwordRepeat && password) {
            setErrorConfirmPassword(true);
            error = true;
        } else {
            setErrorConfirmPassword(false);
        }

        if(password && passwordRepeat && (password !== passwordRepeat)) {
            setErrorInequalPasswords(true);
            error = true;
        } else {
            setErrorInequalPasswords(false);
        }

        return error;

    }

    return (
        <form action="PUT" className="modal__form" onSubmit={(e) => handleSubmit(e)}>
            <div className="form__field">
                <CustomLabel htmlFor="field__name">Nome*</CustomLabel>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="field__name"
                        variant="outlined"
                        size="small"
                        name="name"
                        value={inputValueCadastroNome}
                        onChange={(event) => setInputValueCadastroNome(event.target.value)}
                        error={errorName}
                        helperText={errorName && "Este campo deve ser preenchido"}
                        required />
                </Box>

            </div>
            <div className="form__field">
                <CustomLabel htmlFor="field__email">Email*</CustomLabel>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="field__email"
                        variant="outlined"
                        size="small"
                        type="email"
                        name="email"
                        value={inputValueCadastroEmail}
                        onChange={(event) => setInputValueCadastroEmail(event.target.value)}
                        error={errorEmail}
                        helperText={errorEmail && "Este campo deve ser preenchido"}
                        required />
                </Box>

            </div>
            <div className="form__fieldsContainer">
                <div className="form__field">
                    <CustomLabel htmlFor="field__cpf">CPF</CustomLabel>
                    <TextField
                        id="field__cpf"
                        variant="outlined"
                        size="small"
                        name="cpf"
                        value={inputValueCadastroCpf}
                        onChange={(event) => setInputValueCadastroCpf(event.target.value)}
                    />
                </div>
                <div className="form__field">
                    <CustomLabel htmlFor="field__phone">Telefone</CustomLabel>
                    <TextField
                        id="field__phone"
                        variant="outlined"
                        size="small"
                        name="phone"
                        value={inputValueCadastroTelefone}
                        onChange={(event) => setInputValueCadastroTelefone(event.target.value)}
                    />
                </div>
            </div>
            <div className="form__field">
                <CustomLabel htmlFor="field__password">Senha</CustomLabel>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <OutlinedInput
                        id="field__password"
                        size="small"
                        fullWidth
                        type={values.showPassword ? 'text' : 'password'}
                        name="password"
                        onChange={(event) => setPassword(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />

                </Box>
            </div>
            <div className="form__field">
                <CustomLabel htmlFor="field__confirmPassword" className="teste">Confirmar senha</CustomLabel>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <OutlinedInput
                        id="field__confirmPassword"
                        size="small"
                        fullWidth
                        type={values.showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        onChange={(event) => setPasswordRepeat(event.target.value)}
                        error={errorConfirmPassword || errorInequalPasswords}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errorConfirmPassword && <FormHelperText error>Este campo deve ser preenchido</FormHelperText>}
                    {errorInequalPasswords && <FormHelperText error>As senhas não coincidem</FormHelperText>}
                </Box>
            </div>
            <div className="form__submitButton">
                <button type="submit" className="form__button">Aplicar</button>
            </div>
        </form>
    );
}
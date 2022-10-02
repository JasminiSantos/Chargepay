import React from 'react';
import useConsumer from '../../Hooks/useConsumer';
import olhoFechado from '../../Assets/Iconolhofechado.svg'
import olhoAberto from '../../Assets/icon-eye-show.svg'
import lineChecked from '../../Assets/lineChecked.svg'
import lineNotChecked from '../../Assets/lineNotCheck.svg'
import confirmado from '../../Assets/Confirmado.svg'
import './styles.css';
import classes from '../../Pages/Login/style'
import { useNavigate } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

const FormSignUp = () => {
  const {
    stage,
    password,
    passwordRepeat,
    setPassword,
    setPasswordRepeat,
    inputError,
    inputValueCadastroNome,
    setInputValueCadastroNome,
    inputValueCadastroEmail,
    setInputValueCadastroEmail,
    handleVisualizarSenha,
    handleVisualizarSenhaRepeat,
    visualizarSenha,
    visualizarSenhaRepeat,
    inputErrorValidate,
    handleSubmit,
    handleVerifyEmailCriado,
    inputErrorValidateEmail,
    handleValidadeCampos,
    erro
  } = useConsumer();

  const navigate = useNavigate();

  const [blankPassword, setBlankPassword] = React.useState(false);
  const [differentPasswords, setDifferentPasswords] = React.useState(false);

  function handleVerifyPassword(event) {
    (!password || !passwordRepeat) ? setBlankPassword(true) : setBlankPassword(false);
    (password && passwordRepeat && (password !== passwordRepeat)) ? setDifferentPasswords(true) : setDifferentPasswords(false);
  }

  function handleToLogin() {
    navigate('/');
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container-forms">
      <form action="POST" className="form" onSubmit={(e) => handleSubmit(e)}>
        {
          stage.one && !stage.two ? (
            <div>
              <h1>Adicione seus dados</h1>
              <div className="boxInput">
                <label htmlFor="inputNome">Nome*</label>
                <input type="text" id="inputNome" placeholder="Digite seu nome" value={inputValueCadastroNome} onChange={(e) => setInputValueCadastroNome(e.target.value)} required />
              </div>
              <div className="boxInput">
                <label htmlFor="inputEmail">E-mail*</label>
                <input type="email" id="inputEmail" placeholder="Digite seu e-mail" value={inputValueCadastroEmail} onChange={(e) => setInputValueCadastroEmail(e.target.value)} required />
                {
                  inputErrorValidateEmail ?
                    null
                    :
                    (
                      <span className="spanError">Email em uso</span>
                    )
                }
                {
                  inputErrorValidate ?
                    null
                    :
                    (
                      <span className="spanError">Falta campos Obrigatórios</span>
                    )
                }
              </div>
              <input type="button" value="Continuar" className="buttonPinkNext" onClick={() => {
                handleValidadeCampos()
                handleVerifyEmailCriado()
              }} />
              <p className="form__footer">Já possui uma conta ? Faça o seu <a href="/">Login</a></p>
            </div>
          ) : null
        }
        {
          stage.two && !stage.three ? (
            <div>
              <h1>Escolha uma senha</h1>
              <div className="boxInput input-senha">
                <label htmlFor="outlined-adornment-password">Senha*</label>
                <FormControl
                  className={classes.input} fullWidth size="small" variant="outlined">
                  <OutlinedInput
                    error={erro && true}
                    id="outlined-adornment-password"
                    type={visualizarSenha ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleVisualizarSenha}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {visualizarSenha ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {erro && <span className="erro">{erro.message}</span>}
                </FormControl>
              </div>
              <div className="boxInput input-senha">
                <label htmlFor="outlined-adornment-password-repeat">Repita sua senha*</label>
                <FormControl
                  className={classes.input} fullWidth size="small" variant="outlined">
                  <OutlinedInput
                    error={erro && true}
                    id="outlined-adornment-password-repeat"
                    type={visualizarSenhaRepeat ? "text" : "password"}
                    value={passwordRepeat}
                    onChange={e => setPasswordRepeat(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleVisualizarSenhaRepeat}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {visualizarSenhaRepeat ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {erro && <span className="erro">{erro.message}</span>}
                </FormControl>
                {blankPassword && <FormHelperText error>Todos os campos são obrigatórios</FormHelperText>}
                {differentPasswords && <FormHelperText error>As senhas não coincidem</FormHelperText>}
              </div>
              <div className="buttonBox">
                <button className="buttonPinkNext" onClick={() => handleVerifyPassword()}>Cadastrar</button>
              </div>
              <p className="form__footer">Já possui uma conta ? Faça o seu <a href="/">Login</a></p>
            </div>
          ) : null
        }
        {
          stage.three ?
            (
              <div className="boxStage">
                <img src={confirmado} alt="confirmado" />
                <h1>Cadastro realizado com sucesso!</h1>
                <input type="button" value="Ir para Login" className="buttonPinkStage3" onClick={handleToLogin} />
              </div>
            )
            : null
        }
        <div className={stage.three ? 'linesStage' : 'lines'}>
          <img src={stage.one && !stage.two ? lineChecked : lineNotChecked} alt={stage.one ? "Checked" : "not checked"} />
          <img src={stage.two && !stage.three ? lineChecked : lineNotChecked} alt={stage.two ? "Checked" : "not checked"} />
          <img src={stage.three ? lineChecked : lineNotChecked} alt={stage.three ? "Checked" : "not checked"} />
        </div>
      </form>
    </div>
  )
};

export default FormSignUp;

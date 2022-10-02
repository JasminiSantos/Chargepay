import imageLogin from '../../Assets/imageLogin.jpg'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl'
import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment'
import PinkButton from '../../Components/pinkButtton';
import useStyles from './style';
import useConsumer from '../../Hooks/useConsumer';
import useFunctions from '../../Hooks/useFunctions'
import './style.css'

function Login() {
  const { email, senha, setEmail, setSenha, setErro, erro } = useConsumer()
  const { signIn } = useFunctions()
  const [values, setValues] = React.useState({
    amount: '',
    password: senha,
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setSenha(event.target.value)
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };


  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !senha) {
      setErro({ message: 'Todos os campos são obrigatórios' })
      return
    } else {
      setErro(false)
      signIn()
      setEmail("")
      setSenha("")
    }

  }

  const classes = useStyles()

  return <div className="login__container">

    <div className="login__container-image">
      <h1 className="login__container-image__title">Gerencie todos os pagamentos da sua empresa em um só lugar.</h1>
      <img src={imageLogin} alt="imagem do login" />
    </div>

    <div className="login__container-form">
      <form action="submit" onSubmit={handleSubmit} className="login__container-form__form">
        <h1 className="login__form__title">Faça seu login!</h1>
        <div className="email">
          <label className="login__form__email-label" htmlFor="email">Email</label>
          <TextField error={erro && true} onChange={(e) => setEmail(e.target.value)} value={email} className={classes.input} placeholder="Digite seu E-mail" size="small" fullWidth id="email" variant="outlined" />
        </div>
        <div className="password">
          <div className="password__labels">
            <label className="login__form__email-label" htmlFor="password">Senha</label>
            <span><a href={console.log('ok')}>Esqueceu sua senha?</a></span>
          </div>
          <FormControl
            className={classes.input} fullWidth size="small" variant="outlined">
            <OutlinedInput
              error={erro && true}
              placeholder="Digite sua senha"
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {erro && <span className="erro">{erro.message}</span>}
          </FormControl>
        </div>
        <PinkButton message="Entrar" />
        <span className="form__span-register">Ainda não possui uma conta? <a href="/cadastro">Cadastre-se</a></span>
      </form>
    </div>
  </div>
}

export default Login
import React from 'react';
import line from '../../Assets/line.svg'
import stepMarcado from '../../Assets/stepLogin.svg'
import stepDesmarcado from '../../Assets/stagependente.svg'
import './styles.css'
import useConsumer from '../../Hooks/useConsumer';

const StagesSignUp = () => {
  const { stage } = useConsumer()
  return (
    <div className="container">
      <div className="box">
        <div className="sub_box">
          <div className="boxIcon">
            <img className="imgRadio" src={stage.one ? stepMarcado : stepDesmarcado} alt="stage" />
            <img src={line} alt="linha" />
          </div>
          <div className="boxText">
            <h3>Cadastre-se</h3>
            <p>Por favor, escreva seu nome e e-mail</p>
          </div>
        </div>
        <div className="sub_box">
          <div className="boxIcon">
            <img className="imgRadio" src={stage.two ? stepMarcado : stepDesmarcado} alt="stage" />
            <img src={line} alt="linha" />
          </div>
          <div className="boxText">
            <h3>Escolha uma senha</h3>
            <p>Escolha uma senha segura</p>
          </div>
        </div>
        <div className="sub_box">
          <div className="boxIcon">
            <img className="imgRadio" src={stage.three ? stepMarcado : stepDesmarcado} alt="stage" />
          </div>
          <div className="boxText last">
            <h3>Cadastro realizado com sucesso</h3>
            <p>E-mail e senha cadastrados com sucesso</p>
          </div>
        </div>
      </div>
    </div >
  )
};

export default StagesSignUp;

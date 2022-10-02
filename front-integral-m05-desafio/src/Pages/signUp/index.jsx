import StagesSignUp from "../../Components/stagesSignUp";
import FormSignUp from "../../Components/formSignUp";
import './style.css';
const SignUp = () => {
  return (
    <div className="container-cadastro">
      <StagesSignUp />
      <FormSignUp />
    </div>
  )
};

export default SignUp;
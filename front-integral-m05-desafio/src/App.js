import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { ContextProvider } from './Context/context';
import Login from './Pages/Login';
import SignUp from './Pages/signUp';
import Home from './Pages/Home';
import CadastroCliente from './Pages/cadastroCliente';
import DetalhesCliente from './Pages/DetalhesCliente';
import Cobrancas from './Pages/Cobrancas';
import ContextModal from "./Context/contextModal";
import useModal from "./Hooks/useModal";
// import useModalEditUser from "./Hooks/useModalEditUser";



function App() {

  const modalStates = useModal();

  // function RotasPrivadas(props) {
  //   <Navigate to="/login" state={{ from: location }} />
  // }

  function RequireAuth(props) {
    let location = useLocation();

    if (window.localStorage.token === 'undefined' || !window.localStorage.token) {
      return <Navigate to="/" state={{ from: location }} />;
    }

    return props.children;
  }


  return (
    <div className="App">
      <BrowserRouter>

        <ContextProvider>
          <ContextModal.Provider value={modalStates}>
            <Routes>
              <Route path="/home" element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              } />

              <Route path="/cliente" element={
                <RequireAuth>
                  <CadastroCliente />
                </RequireAuth>
              } />

              <Route path="/cliente/detalhes" element={
                <RequireAuth>
                  <DetalhesCliente />
                </RequireAuth>
              } />

              <Route path="/cobrancas" element={
                <RequireAuth>
                  <Cobrancas />
                </RequireAuth>
              } />




              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<SignUp />} />

            </Routes>
          </ContextModal.Provider>
        </ContextProvider>
      </BrowserRouter>

    </div >
  );
}

export default App;

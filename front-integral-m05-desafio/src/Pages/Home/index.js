import iconClienteInadimplente from "../../Assets/iconClienteInadimplente.svg";
import iconClienteEmDia from "../../Assets/iconClienteEmDia.svg"
import iconCobrancaPaga from "../../Assets/ícone- Cobrança Paga-Color.svg";
import iconCobrancaVencida from "../../Assets/ícone- Corbança Pendente-Color.svg";
import iconCobrancaPendente from "../../Assets/ícone- Corbança Vencida-Color.svg";
import CardClientes from "../../Components/Cards/Card Clientes";
import CardCobrancas from "../../Components/Cards/Card Cobrancas";
import CardResumo from "../../Components/Cards/Card Resumo";
import Head from '../../Components/Head';
import Menu from '../../Components/Menu';
import "./styles.css";
import { useEffect, useState } from "react";
import { obterCobrancasPagas, obterCobrancasVencidas, obterCobrancasPrevistas, obterClientesFiltrados } from '../../Hooks/useCobranca';
export function Home() {
  const [dados, setDados] = useState([]);
  const [dadosVencidas, setDadosVencidas] = useState([]);
  const [dadosPrevistas, setDadosPrevistas] = useState([]);
  const [totalPagas, setTotalPagas] = useState(0);
  const [totalVencidas, setTotalVencidas] = useState(0);
  const [totalPrevistas, setTotalPrevistas] = useState(0);
  const [dadosClientesInadimplentes, setDadosClientesInadimplentes] = useState([]);
  const [dadosClientesAdimplentes, setDadosClientesAdimplentes] = useState([]);

  async function pegarCobrancas() {
    const response = await obterCobrancasPagas();
    const responseVencidas = await obterCobrancasVencidas();
    const responsePrevistas = await obterCobrancasPrevistas();
    const responseClientes = await obterClientesFiltrados();
    setDados(response);
    setDadosVencidas(responseVencidas);
    setDadosPrevistas(responsePrevistas);
    setDadosClientesInadimplentes(responseClientes.inadimplentes);
    setDadosClientesAdimplentes(responseClientes.adimplentes)

    let somatorioPagas = 0;
    response.map(item => {
      somatorioPagas += item.valor;
    })
    setTotalPagas(somatorioPagas);

    let somatorioVencidas = 0;
    responseVencidas.map(item => {
      somatorioVencidas += item.valor;
    })
    setTotalVencidas(somatorioVencidas);

    let somatorioPrevistas = 0;
    responsePrevistas.map(item => {
      somatorioPrevistas += item.valor;
    })
    setTotalPrevistas(somatorioPrevistas);

    return;
  }

  useEffect(() => {
    pegarCobrancas();
  }, [])

  return (
    <div className="container-home">
      <Menu />
      <div className="principal">
        <Head title="Resumo das cobranças" />
        <main>
          <div className="container-cards-resumo">
            <CardResumo title="Cobranças Pagas" icon={iconCobrancaPaga} bgColor="pagas" value={totalPagas} />
            <CardResumo title="Cobranças Vencidas" icon={iconCobrancaPendente} bgColor="vencidas" value={totalVencidas} />
            <CardResumo title="Cobranças Previstas" icon={iconCobrancaVencida} bgColor="previstas" value={totalPrevistas} />
          </div>
          <div className="container-cards-cobrancas">
            <CardCobrancas title="Cobranças Pagas" count={dados.length} bgColor="pagas" dados={dados} />
            <CardCobrancas title="Cobranças Vencidas" count={dadosVencidas.length} bgColor="vencidas" dados={dadosVencidas} />
            <CardCobrancas title="Cobranças Previstas" count={dadosPrevistas.length} bgColor="previstas" dados={dadosPrevistas} />
          </div>
          <div className="container-cards-clientes" >
            <CardClientes title="Clientes Inadiplentes" icon={iconClienteInadimplente} count={dadosClientesInadimplentes.length} bgColor="inadimplentes" dados={dadosClientesInadimplentes} />
            <CardClientes title="Clientes em dia" icon={iconClienteEmDia} count={dadosClientesAdimplentes.length} bgColor="em-dia" dados={dadosClientesAdimplentes} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
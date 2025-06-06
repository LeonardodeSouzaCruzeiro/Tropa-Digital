
import styled from "styled-components";
import { FiUsers, FiCalendar, FiClipboard } from "react-icons/fi";

const Dashboard = () => {
  const dados = {
    totalEventos: 12,
    totalEquipes: 28,
    totalInscricoes: 142,
  };

  return (
    <ContainerDash>
      <HeaderDash>
        <SaudacaoDash>Bem vindo de volta, <strong>Leonardo Cruzeiro</strong></SaudacaoDash>
        <TituloDash>Resumo geral</TituloDash>
      </HeaderDash>

      <CardsDash>
        <Card>
          <FiCalendar size={28} />
          <div>
            <h4>{dados.totalEventos}</h4>
            <p>Eventos cadastrados</p>
          </div>
        </Card>
        <Card>
          <FiUsers size={28} />
          <div>
            <h4>{dados.totalEquipes}</h4>
            <p>Equipes registradas</p>
          </div>
        </Card>
        <Card>
          <FiClipboard size={28} />
          <div>
            <h4>{dados.totalInscricoes}</h4>
            <p>Inscrições totais</p>
          </div>
        </Card>
      </CardsDash>

      <AvisoDash>
        📌 Acompanhe aqui um resumo geral do sistema. Para detalhes, navegue pelo menu lateral.
      </AvisoDash>
    </ContainerDash>
  );
};

export default Dashboard;
const ContainerDash = styled.div`
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8f9fc;
  min-height: 100vh;
`;

const HeaderDash = styled.div`
  margin-bottom: 2rem;
  position: relative;
  bottom: 50px;
`;

const SaudacaoDash = styled.p`
  font-size: 0.9rem;
  color: #666;

  strong {
    color: black;
  }
`;

const TituloDash = styled.h2`
  color: #cc6237;
  font-size: 1.4rem;
  margin-top: 0.3rem;
`;

const CardsDash = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  position: relative;
  bottom: 50px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease;
  color: #cc6237;

  h4 {
    font-size: 1.6rem;
    margin: 0;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #888;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

const AvisoDash = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  background-color: #fff9f7;
  border-left: 4px solid #cc6237;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #99513e;
`;

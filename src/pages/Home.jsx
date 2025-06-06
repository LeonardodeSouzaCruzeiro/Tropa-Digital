import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MenuSidebar from "../components/Menu";
import Eventos from "../components/Eventos";
import Dashboard from "../components/Dashboard";
import Equipes from "../components/Equipes";
import Inscricoes from "../components/Inscricoes";

const Home = () => {
  const [activeTab, setActiveTab] = useState("eventos");

  const renderContent = () => {
    switch (activeTab) {
       case "dashboard":
      return <Dashboard />;
      case "eventos":
        return <Eventos />;
      case "equipes":
        return <Equipes />;
      case "inscricoes":
        return <Inscricoes />;
      default:
        return <ContentText>Selecione uma aba</ContentText>;
    }
  };

  return (
    <Wrapper>
      <MenuSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {renderContent()}
      </MainContent>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  background: #f8f9fc;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const ContentText = styled.h1`
  font-size: 1.8rem;
  color: #cc6237;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

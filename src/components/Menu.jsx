import styled from "styled-components";
import { RxDashboard } from "react-icons/rx"
import { MdOutlineCalendarMonth } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineGroups3 } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoPower } from "react-icons/io5";

const MenuSidebar = ({ activeTab, setActiveTab }) => {
  return (
    <Sidebar>
      <Top>
        <LogoWrapper>
          <Logo src="/img/logo.png" alt="Logo" />
        </LogoWrapper>

        <SectionTitle>MENU</SectionTitle>
        <Nav>
          <NavItem
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            title="Dashboard"
          >
            <RxDashboard />
            <span>Dashboard</span>
          </NavItem>
          <NavItem
            active={activeTab === "eventos"}
            onClick={() => setActiveTab("eventos")}
            title="Eventos"
          >
            <MdOutlineCalendarMonth />
            <span>Eventos</span>
          </NavItem>
          <NavItem
            active={activeTab === "equipes"}
            onClick={() => setActiveTab("equipes")}
            title="Equipes"
          >
            <MdOutlineGroups3 />
            <span>Equipes</span>
          </NavItem>
          <NavItem
            active={activeTab === "inscricoes"}
            onClick={() => setActiveTab("inscricoes")}
            title="Inscrições"
          >
            <HiOutlineUsers />
            <span>Inscrições</span>
          </NavItem>
        </Nav>
      </Top>

      <BottomSection>
        <UserInfo>
          <Avatar src="./img/avatar.jpg" alt="Avatar" />
          <UserText>
            <strong>Leonardo Cruzeiro</strong>
            <small>Administrador</small>
          </UserText>
        </UserInfo>
        <ActionButton title="Alterar dados">
          <FaRegUser />
          <span>Alterar dados</span>
        </ActionButton>
        <ActionButton title="Sair">
          <IoPower />
          <span>Sair</span>
        </ActionButton>
      </BottomSection>
    </Sidebar>
  );
};

export default MenuSidebar;

const Sidebar = styled.aside`
  width: 190px;
  background-color: #fff;
  padding: 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: 72px;
    padding: 1rem 0.5rem;
    align-items: center;
  }
`;

const Top = styled.div`
  width: 100%;
`;

const LogoWrapper = styled.div`
  padding-bottom: 1rem;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Logo = styled.img`
  width: 90%;
  max-height: 45px;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    object-fit: contain;
  }
`;

const SectionTitle = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 1rem;
  font-weight: 600;
  position:relative;
  left:15px;
  top:15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: ${({ active }) => (active ? "#cc6237" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease;

  svg {
    font-size: 1.1rem;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    background-color: ${({ active }) => (active ? "#b15227" : "#f0f0f0")};
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0.5rem;
  }
`;

const BottomSection = styled.div`
  border-top: 1px solid #eee;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position:relative;
  bottom:60px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.2rem;
  }
`;

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  border:1px solid #cc6237;
`;

const UserText = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.95rem;
    color: #333;
  }

  small {
    font-size: 0.75rem;
    color: #999;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #555;
  font-size: 0.9rem;
  cursor: pointer;
  position:relative;
  bottom:60px;
  font-weight: 700;

  svg {
    font-size: 1rem;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    color: #cc6237;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

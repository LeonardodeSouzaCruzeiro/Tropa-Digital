import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiMoreVertical, FiSearch, FiPlus } from "react-icons/fi";

const Inscricoes = () => {
  const [inscricoes, setInscricoes] = useState([
    { id: 1, participante: "João Silva", equipe: "Pantaneiros A", status: "Confirmado", data: "01/06/2025" },
    { id: 2, participante: "Maria Souza", equipe: "Pantaneiros B", status: "Pendente", data: "02/06/2025" },
    { id: 3, participante: "Carlos Lima", equipe: "Pantaneiros C", status: "Confirmado", data: "03/06/2025" }
  ]);

  const [busca, setBusca] = useState("");
  const [menuAberto, setMenuAberto] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const fecharMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(null);
      }
    };
    document.addEventListener("mousedown", fecharMenu);
    return () => document.removeEventListener("mousedown", fecharMenu);
  }, []);

  const inscricoesFiltradas = inscricoes.filter((i) =>
    i.participante.toLowerCase().includes(busca.toLowerCase())
  );

  const excluirInscricao = (id) => {
    setInscricoes((prev) => prev.filter((i) => i.id !== id));
    setMenuAberto(null);
  };

  return (
    <ContainerInscricoes>
      <HeaderInscricoes>
        <SaudacaoInscricoes>Olá <strong>Leonardo Cruzeiro</strong>, veja as inscrições abaixo</SaudacaoInscricoes>
        <TituloInscricoes>Inscrições</TituloInscricoes>
      </HeaderInscricoes>

      <BoxInscricoes>
        <TopBarInscricoes>
          <SearchWrapperInscricoes>
            <FiSearch size={16} />
            <SearchInputInscricoes
              placeholder="Buscar participante"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </SearchWrapperInscricoes>
          <AddButtonInscricoes>
            <FiPlus size={16} /> Nova inscrição
          </AddButtonInscricoes>
        </TopBarInscricoes>

        <TableInscricoes>
          <thead>
            <tr>
              <th>Participante</th>
              <th>Equipe</th>
              <th>Status</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inscricoesFiltradas.map((i) => (
              <tr key={i.id}>
                <td>{i.participante}</td>
                <td>{i.equipe}</td>
                <td style={{ display: "flex" }}>
                  <StatusInscricoes ativo={i.status === "Confirmado"} />
                  {i.status}
                </td>
                <td>{i.data}</td>
                <td style={{ position: "relative" }}>
                  <FiMoreVertical
                    size={18}
                    onClick={() => setMenuAberto(menuAberto === i.id ? null : i.id)}
                    style={{ cursor: "pointer", color: "#cc6237" }}
                  />
                  {menuAberto === i.id && (
                    <DropdownInscricoes ref={menuRef}>
                      <li>Editar</li>
                      <li onClick={() => excluirInscricao(i.id)}>Excluir</li>
                      <li>Ver detalhes</li>
                    </DropdownInscricoes>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableInscricoes>
      </BoxInscricoes>
    </ContainerInscricoes>
  );
};

export default Inscricoes;


const ContainerInscricoes = styled.div`
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  background-color: #f8f9fc;
  min-height: 100vh;
`;

const HeaderInscricoes = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  bottom: 50px;
`;

const SaudacaoInscricoes = styled.p`
  font-size: 0.9rem;
  color: #666;

  strong {
    color: black;
  }
`;

const TituloInscricoes = styled.h2`
  color: #cc6237;
  font-size: 1.4rem;
  margin-top: 0.3rem;
`;

const BoxInscricoes = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  position: relative;
  bottom: 50px;
  overflow-x: auto;
`;

const TopBarInscricoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SearchWrapperInscricoes = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

const SearchInputInscricoes = styled.input`
  border: none;
  outline: none;
  background: transparent;
`;

const AddButtonInscricoes = styled.button`
  background: #cc6237;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const TableInscricoes = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  thead th {
    text-align: left;
    padding: 0.75rem;
    color: #ebc4b4;
  }

  tbody td {
    padding: 0.75rem;
    border-top: 1px solid #f0f0f0;
    color: #9fa9bc;
  }
`;

const StatusInscricoes = styled.span`
  color: ${({ ativo }) => (ativo ? "#79f340" : "gray")};
  padding-right: 10px;
  &:before {
    content: '●';
    font-size: 1.5rem;
    position: relative;
    bottom: 8px;
  }
`;

const DropdownInscricoes = styled.ul`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  list-style: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;

  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background-color: #f6f6f6;
    }
  }
`;

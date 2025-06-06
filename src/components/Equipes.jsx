
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiMoreVertical, FiSearch, FiPlus } from "react-icons/fi";

const Equipes = () => {
  const [equipes, setEquipes] = useState([
    { id: 1, nome: "Equipe A", membros: 5, status: "Ativa" },
    { id: 2, nome: "Equipe B", membros: 8, status: "Inativa" },
    { id: 3, nome: "Equipe C", membros: 6, status: "Ativa" },
  ]);
  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEquipe, setEditingEquipe] = useState(null);
  const [menuAberto, setMenuAberto] = useState(null);
  const modalRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowForm(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const equipesFiltradas = equipes.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const novaEquipe = {
      id: editingEquipe ? editingEquipe.id : Date.now(),
      nome: form.nome.value,
      membros: parseInt(form.membros.value),
      status: form.status.value,
    };

    if (editingEquipe) {
      setEquipes(equipes.map(eq => eq.id === editingEquipe.id ? novaEquipe : eq));
    } else {
      setEquipes([...equipes, novaEquipe]);
    }

    setShowForm(false);
    setEditingEquipe(null);
  };

  const handleEdit = (equipe) => {
    setEditingEquipe(equipe);
    setShowForm(true);
    setMenuAberto(null);
  };

  const handleDelete = (id) => {
    if (confirm("Deseja remover esta equipe?")) {
      setEquipes(equipes.filter(eq => eq.id !== id));
      setMenuAberto(null);
    }
  };

  return (
    <ContainerEquipes>
      <HeaderEquipes>
        <SaudacaoEquipes>Gerencie suas <strong>Equipes</strong></SaudacaoEquipes>
        <TituloEquipes>Lista de Equipes</TituloEquipes>
      </HeaderEquipes>

      <BoxEquipes>
        <TopBarEquipes>
          <SearchWrapperEquipes>
            <FiSearch size={16} />
            <SearchInputEquipes
              placeholder="Buscar equipe"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </SearchWrapperEquipes>

          <AddButtonEquipes onClick={() => {
            setEditingEquipe(null);
            setShowForm(true);
          }}>
            <FiPlus size={16} /> Nova Equipe
          </AddButtonEquipes>
        </TopBarEquipes>

        <TableEquipes>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Membros</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {equipesFiltradas.map((eq) => (
              <tr key={eq.id}>
                <td>{eq.nome}</td>
                <td>{eq.membros}</td>
                <td>{eq.status}</td>
                <td style={{ position: "relative", color: "#cc6237" }}>
                  <FiMoreVertical size={18} onClick={() => setMenuAberto(menuAberto === eq.id ? null : eq.id)} />
                  {menuAberto === eq.id && (
                    <DropdownEquipes ref={menuRef}>
                      <li onClick={() => handleEdit(eq)}>Editar</li>
                      <li onClick={() => handleDelete(eq.id)}>Excluir</li>
                    </DropdownEquipes>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableEquipes>
      </BoxEquipes>

      {showForm && (
        <FormModalEquipes ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <h3>{editingEquipe ? "Editar Equipe" : "Nova Equipe"}</h3>
            <input name="nome" defaultValue={editingEquipe?.nome || ""} placeholder="Nome" required />
            <input name="membros" type="number" defaultValue={editingEquipe?.membros || 0} placeholder="Nº de Membros" required />
            <select name="status" defaultValue={editingEquipe?.status || "Ativa"}>
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </select>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </FormModalEquipes>
      )}
    </ContainerEquipes>
  );
};

export default Equipes;


const ContainerEquipes = styled.div`
  padding: 2rem;
  background-color: #f8f9fc;
`;

const HeaderEquipes = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  bottom: 50px;
`;

const SaudacaoEquipes = styled.p`
  font-size: 0.9rem;
  color: #666;

  strong {
    color: black;
  }
`;

const TituloEquipes = styled.h2`
  color: #cc6237;
  font-size: 1.4rem;
  margin-top: 0.3rem;
`;

const BoxEquipes = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  position: relative;
  bottom: 50px;
`;

const TopBarEquipes = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchWrapperEquipes = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

const SearchInputEquipes = styled.input`
  border: none;
  outline: none;
  background: transparent;
`;

const AddButtonEquipes = styled.button`
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

const TableEquipes = styled.table`
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

const DropdownEquipes = styled.ul`
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
    &:hover {
      background-color: #f6f6f6;
    }
  }
`;

const FormModalEquipes = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;

    input, select {
      padding: 0.6rem;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    button {
      padding: 0.6rem;
      border: none;
      border-radius: 6px;
      background-color: #cc6237;
      color: white;
      font-weight: bold;
      cursor: pointer;

      &:nth-child(2) {
        background-color: #ccc;
        color: #333;
      }
    }
  }
`;

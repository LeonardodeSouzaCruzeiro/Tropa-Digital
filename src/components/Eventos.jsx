
import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FiMoreVertical, FiSearch, FiPlus } from "react-icons/fi";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
`;

const Eventos = () => {
  const [eventos, setEventos] = useState([
    { id: 1, nome: "Clube do Laço Coração Pantaneiro A", equipes: 10, status: "Ativo", data: "09 a 11 de Junho" },
    { id: 2, nome: "Clube do Laço Coração Pantaneiro B", equipes: 8, status: "Ativo", data: "15 a 17 de Julho" },
    { id: 3, nome: "Clube do Laço Coração Pantaneiro C", equipes: 12, status: "Ativo", data: "20 a 22 de Agosto" },
    { id: 4, nome: "Clube do Laço Coração Pantaneiro D", equipes: 9, status: "Inativo", data: "01 a 03 de Setembro" },
    { id: 5, nome: "Clube do Laço Coração Pantaneiro E", equipes: 7, status: "Ativo", data: "10 a 12 de Outubro" },
  ]);

  const [busca, setBusca] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [menuAberto, setMenuAberto] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const porPagina = 2;

  const modalRef = useRef();
  const menuRef = useRef();

  const eventosFiltrados = eventos.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(eventosFiltrados.length / porPagina);
  const eventosPaginados = eventosFiltrados.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const novoEvento = {
      id: editingEvento ? editingEvento.id : Date.now(),
      nome: form.nome.value,
      equipes: parseInt(form.equipes.value),
      status: form.status.value,
      data: form.data.value,
    };

    if (editingEvento) {
      setEventos(eventos.map(ev => ev.id === editingEvento.id ? novoEvento : ev));
    } else {
      setEventos([...eventos, novoEvento]);
    }
    setShowForm(false);
    setEditingEvento(null);
  };

  const handleEdit = (evento) => {
    setEditingEvento(evento);
    setShowForm(true);
    setMenuAberto(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Deseja realmente excluir este evento?");
    if (!confirmDelete) return;

    const novosEventos = eventos.filter(ev => ev.id !== id);
    setEventos(novosEventos);

    const totalPaginasAtualizadas = Math.ceil(novosEventos.length / porPagina);
    if (paginaAtual > totalPaginasAtualizadas) {
      setPaginaAtual(totalPaginasAtualizadas || 1);
    }

    setMenuAberto(null);
  };

  return (
    <ContainerEventos>
      <HeaderEventos>
        <SaudacaoEventos>Bem vindo de volta, <strong>Leonardo Cruzeiro</strong></SaudacaoEventos>
        <TituloEventos>Todos eventos</TituloEventos>
      </HeaderEventos>

      <BoxEventos>
        <TopBarEventos>
            <SearchWrapperEventos>
            <FiSearch size={16} />
            <SearchInputEventos
              placeholder="Buscar eventos"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </SearchWrapperEventos>
          <AddButtonEventos onClick={() => {
            setEditingEvento(null);
            setShowForm(true);
          }}>
            <FiPlus size={16} /> Inserir novo
          </AddButtonEventos>
         
        </TopBarEventos>

        <TableEventos>
          <thead>
            <tr>
              <th>Nome do evento</th>
              <th>Total de equipes</th>
              <th>Status</th>
              <th>Data</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {eventosPaginados.map((e) => (
              <tr key={e.id}>
                <td>{e.nome}</td>
                <td>{e.equipes}</td>
                <td style={{ display: "flex" }}><StatusEventos ativo={e.status === "Ativo"}></StatusEventos>{e.status}</td>
                <td>{e.data}</td>
                <td style={{ position: "relative", color: "#cc6237"  }}>
                  <FiMoreVertical size={18} onClick={() => setMenuAberto(menuAberto === e.id ? null : e.id)} style={{ cursor: "pointer" }} />
                  {menuAberto === e.id && (
                    <DropdownEventos ref={menuRef}>
                      <li onClick={() => handleEdit(e)}>Editar</li>
                      <li onClick={() => handleDelete(e.id)}>Excluir</li>
                      <li onClick={() => alert("Outra ação simulada")}>Outra Ação</li>
                    </DropdownEventos>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableEventos>

        <PaginationEventos>
          <PageBtnEventos onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} disabled={paginaAtual === 1}>Anterior</PageBtnEventos>
          {[...Array(totalPaginas)].map((_, i) => (
            <PageBtnEventos
              key={i + 1}
              active={paginaAtual === i + 1}
              onClick={() => setPaginaAtual(i + 1)}
            >
              {i + 1}
            </PageBtnEventos>
          ))}
          <PageBtnEventos  style={{ backgroundColor: "#cc6237", color: "white" }} onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))} disabled={paginaAtual === totalPaginas}>Próxima</PageBtnEventos>
        </PaginationEventos>
      </BoxEventos>

      {showForm && (
        <FormModalEventos ref={modalRef}>
          <form onSubmit={handleSubmit}>
            <h3>{editingEvento ? "Editar Evento" : "Novo Evento"}</h3>
            <input name="nome" defaultValue={editingEvento?.nome || ""} placeholder="Nome do evento" required />
            <input name="equipes" type="number" defaultValue={editingEvento?.equipes || 0} placeholder="Total de equipes" required />
            <input name="data" defaultValue={editingEvento?.data || ""} placeholder="Data" required />
            <select name="status" defaultValue={editingEvento?.status || "Ativo"}>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </FormModalEventos>
      )}
    </ContainerEventos>
  );
};

export default Eventos;



const ContainerEventos = styled.div`
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  color: #333;
  background-color: #f8f9fc;
  min-height: 100vh;
`;

const HeaderEventos = styled.div`
  margin-bottom: 1.5rem;
  position:relative;
  bottom:50px;
`;

const SaudacaoEventos = styled.p`
  font-size: 0.9rem;
  color: #666;

  strong{
  color:black;
  }
`;

const TituloEventos = styled.h2`
  color: #cc6237;
  font-size: 1.4rem;
  margin-top: 0.3rem;
`;

const BoxEventos = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  overflow-x: auto;
  position:relative;
  bottom:50px;
`;

const TopBarEventos = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchWrapperEventos = styled.div`
  display: flex;
  align-items: center;
  background: #f3f3f3;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

const SearchInputEventos = styled.input`
  border: none;
  outline: none;
  background: transparent;
`;

const AddButtonEventos = styled.button`
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

const TableEventos = styled.table`
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

const StatusEventos = styled.span`
  color: ${({ ativo }) => (ativo ? "#79f340" : "gray")};
  padding-right:10px;
  &:before {
    content: '●';
    font-size: 1.5rem;
    position:relative;
    bottom:8px;
  }
`;

const PaginationEventos = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  
  flex-wrap: wrap;
`;

const PageBtnEventos = styled.button`
  background: ${({ active }) => (active ? "#cc6237" : "#eee")};
  color: ${({ active }) => (active ? "white" : "#333")};
  border: none;
  border-radius: 20px;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  font-weight: 700;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DropdownEventos = styled.ul`
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

const FormModalEventos = styled.div`
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

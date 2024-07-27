import { useState, useEffect } from "react";
import axios from "axios";

function Projetos() {

    const [bancoUsuarios, setBancoUsuarios] = useState([]);
    const [dadosProjeto, setDadosProjeto] = useState({
        titulo: '',
        descricao: '',
        dataInicial: '',
        dataFinal: '',
        participantes: [
            { nome: '', funcao: '', id: '', projetoId: '' }
        ],
        tarefas: [
            {
                titulo: '',
                estado: '',
                tempoEstimado: '',
                dataPrevista: '',
                responsaveis: [
                    { participanteId: '', tarefaId: '' }
                ]
            }
        ]
    });

    useEffect(() => {
        FetchUsuarios();
    }, []);

    async function FetchUsuarios() {
        try {
          const response = await axios.get('http://localhost:8080/usuarios');
          const usuarios = response.data;
  
          const usuariosProcessados = usuarios.map(item => ({
            value: item.nomeUsuario,
            id: item.id,
            label: `${item.nome}`,
          }));
  
          setBancoUsuarios(usuariosProcessados);
  
        } catch (error) {
          console.error('Erro ao buscar Usuarios:', error);
        }
      }

    const atualizarProjeto = (e) => {
        const { name, value } = e.target;
        setDadosProjeto({
            ...dadosProjeto,
            [name]: value
        });
    };

    const atualizarTarefas = (index, e) => {
        const { name, value } = e.target;
        const novasTarefas = dadosProjeto.tarefas.map((tarefa, i) => {
            if (i === index) {
                return { ...tarefa, [name]: value };
            }
            return tarefa;
        });
        setDadosProjeto({
            ...dadosProjeto,
            tarefas: novasTarefas
        });
    };

    const atualizarParticipantes = (index, e) => {
        const { name, value } = e.target;
        const newParticipantes = dadosProjeto.participantes.map((participante, i) => {
            if (i === index) {
                return { ...participante, [name]: value, projetoId: dadosProjeto.id || '1' };
            }
            return participante;
        });
        setDadosProjeto({
            ...dadosProjeto,
            participantes: newParticipantes
        });
    };

    const atualizarResponsaveis = (tarefaIndex, responsavelIndex, e) => {
        const { name, value } = e.target;
        const novasTarefas = dadosProjeto.tarefas.map((tarefa, i) => {
            if (i === tarefaIndex) {
                const novosResponsaveis = tarefa.responsaveis.map((responsavel, j) => {
                    if (j === responsavelIndex) {
                        return { ...responsavel, [name]: value, tarefaId: tarefa.id || `${tarefaIndex + 1}` };
                    }
                    return responsavel;
                });
                return { ...tarefa, responsaveis: novosResponsaveis };
            }
            return tarefa;
        });
        setDadosProjeto({
            ...dadosProjeto,
            tarefas: novasTarefas
        });
    };

    const adicionarTarefa = () => {
        const tarefaId = `${dadosProjeto.tarefas.length + 1}`;
        setDadosProjeto({
            ...dadosProjeto,
            tarefas: [
                ...dadosProjeto.tarefas,
                { id: tarefaId, titulo: '', estado: '', tempoEstimado: '', dataPrevista: '', responsaveis: [{ participanteId: '', tarefaId: tarefaId }] }
            ]
        });
    };

    const adicionarResponsavel = (tarefaIndex) => {
        const tarefaId = dadosProjeto.tarefas[tarefaIndex].id || `${tarefaIndex + 1}`;
        const novasTarefas = dadosProjeto.tarefas.map((tarefa, i) => {
            if (i === tarefaIndex) {
                return {
                    ...tarefa,
                    responsaveis: [
                        ...tarefa.responsaveis,
                        { participanteId: '', tarefaId: tarefaId }
                    ]
                };
            }
            return tarefa;
        });
        setDadosProjeto({
            ...dadosProjeto,
            tarefas: novasTarefas
        });
    };

    const addParticipante = () => {
        setDadosProjeto({
            ...dadosProjeto,
            participantes: [
                ...dadosProjeto.participantes,
                { id: '', nome: '', funcao: '', projetoId: dadosProjeto.id || '1' }
            ]
        });
    };

    async function cadastrarProjeto() {
        console.log("Cadastrar Projeto");
        try {
            console.log("Adicionando Projeto", dadosProjeto);
            await axios.post('http://localhost:8080/projetoAdicionar', dadosProjeto);
        } catch (error) {
            console.error("Erro ao adicionar projeto:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                name="titulo"
                value={dadosProjeto.titulo}
                onChange={atualizarProjeto}
                placeholder="Título do Projeto"
            />
            <input
                type="text"
                name="descricao"
                value={dadosProjeto.descricao}
                onChange={atualizarProjeto}
                placeholder="Descrição do Projeto"
            />
            <input
                type="date"
                name="dataInicial"
                value={dadosProjeto.dataInicial}
                onChange={atualizarProjeto}
                placeholder="Data Inicial"
            />
            <input
                type="date"
                name="dataFinal"
                value={dadosProjeto.dataFinal}
                onChange={atualizarProjeto}
                placeholder="Data Final"
            />
            <button onClick={addParticipante}>Adicionar Participante</button>
            {dadosProjeto.participantes.map((participante, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="id"
                        value={participante.id}
                        onChange={(e) => atualizarParticipantes(index, e)}
                        placeholder="Id do Participante"
                    />
                    <input
                        type="text"
                        name="nome"
                        value={participante.nome}
                        onChange={(e) => atualizarParticipantes(index, e)}
                        placeholder="Nome do Participante"
                    />
                    <input
                        type="text"
                        name="funcao"
                        value={participante.funcao}
                        onChange={(e) => atualizarParticipantes(index, e)}
                        placeholder="Função do Participante"
                    />
                </div>
            ))}
            <button onClick={adicionarTarefa}>Adicionar Tarefa</button>
            {dadosProjeto.tarefas.map((tarefa, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="titulo"
                        value={tarefa.titulo}
                        onChange={(e) => atualizarTarefas(index, e)}
                        placeholder="Título da Tarefa"
                    />
                    <input
                        type="text"
                        name="estado"
                        value={tarefa.estado}
                        onChange={(e) => atualizarTarefas(index, e)}
                        placeholder="Estado da Tarefa"
                    />
                    <input
                        type="text"
                        name="tempoEstimado"
                        value={tarefa.tempoEstimado}
                        onChange={(e) => atualizarTarefas(index, e)}
                        placeholder="Tempo Estimado"
                    />
                    <input
                        type="date"
                        name="dataPrevista"
                        value={tarefa.dataPrevista}
                        onChange={(e) => atualizarTarefas(index, e)}
                        placeholder="Data Prevista"
                    />
                    {tarefa.responsaveis.map((responsavel, responsavelIndex) => (
                        <select
                            key={responsavelIndex}
                            name="participanteId"
                            value={responsavel.participanteId}
                            onChange={(e) => atualizarResponsaveis(index, responsavelIndex, e)}
                        >
                            <option value="">Selecione o Responsável</option>
                            {dadosProjeto.participantes.map((participante, i) => (
                                <option key={i} value={participante.id}>
                                    {participante.nome}
                                </option>
                            ))}
                        </select>
                    ))}
                    <button onClick={() => adicionarResponsavel(index)}>Adicionar Responsável</button>
                </div>
            ))}
            <button onClick={(e) => { cadastrarProjeto() }}>Enviar</button>
        </div>
    );
}

export default Projetos;

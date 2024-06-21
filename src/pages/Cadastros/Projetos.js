import { useState } from 'react';

function Projetos() {
    const [dadosProjeto, setDadosProjeto] = useState({
        titulo: '',
        descricao: '',
        dataInicial: '',
        dataFinal: '',
        participantes: [
            { id: '', nome: '' }
        ],
        tarefas: [
            {
                titulo: '',
                estado: '',
                responsaveis: '',
                tempoEstimado: '',
                dataPrevista: ''
            }
        ]
    });

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

    const handleParticipanteChange = (index, e) => {
        const { name, value } = e.target;
        const newParticipantes = dadosProjeto.participantes.map((participante, i) => {
            if (i === index) {
                return { ...participante, [name]: value };
            }
            return participante;
        });
        setDadosProjeto({
            ...dadosProjeto,
            participantes: newParticipantes
        });
    };

    const addTarefa = () => {
        setDadosProjeto({
            ...dadosProjeto,
            tarefas: [
                ...dadosProjeto.tarefas,
                { titulo: '', estado: '', responsaveis: '', tempoEstimado: '', dataPrevista: '' }
            ]
        });
    };

    const addParticipante = () => {
        setDadosProjeto({
            ...dadosProjeto,
            participantes: [
                ...dadosProjeto.participantes,
                { id: '', nome: '' }
            ]
        });
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
                        onChange={(e) => handleParticipanteChange(index, e)}
                        placeholder="Id do Participante"
                    />
                    <input
                        type="text"
                        name="nome"
                        value={participante.nome}
                        onChange={(e) => handleParticipanteChange(index, e)}
                        placeholder="Nome do Participante"
                    />
                </div>
            ))}
            <button onClick={addTarefa}>Adicionar Tarefa</button>
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
                    <select
                        name="responsaveis"
                        value={tarefa.responsaveis}
                        onChange={(e) => atualizarTarefas(index, e)}
                    >
                        <option value="">Selecione o Responsável</option>
                        {dadosProjeto.participantes.map((participante, i) => (
                            <option key={i} value={participante.nome}>
                                {participante.nome}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
            <button onClick={(e) => { console.log(dadosProjeto) }}>Enviar</button>
        </div>
    );
}

export default Projetos;

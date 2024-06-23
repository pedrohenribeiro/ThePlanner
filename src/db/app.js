const express = require('express');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
const mysql = require('mysql2/promise');
const app = express();



require('dotenv').config(); 

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.static(path.join(__dirname, "public")));

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    dialect: process.env.DB_DIALECT 
});

module.exports = connection;



app.post('/projetoAdicionar', async (req, res) => {
    const { titulo, descricao, dataInicial, dataFinal, participantes, tarefas } = req.body;
    try {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        
        const projeto = {
            titulo,
            descricao,
            dataInicial,
            dataFinal,
            createdAt: now,
            updatedAt: now
        };
        await connection.query('INSERT INTO Projetos SET ?', projeto);

        const [rows] = await connection.query('SELECT COUNT(*) AS total FROM Projetos');
        const projetoId = rows[0].total;
        console.log("Imprimindo a quantidade de projetos dentro do banco",projetoId)

        for (const participante of participantes) {
            const novoParticipante = {
                nome: participante.nome,
                funcao: participante.funcao,
                projetoId: projetoId,
                createdAt: now,
                updatedAt: now
            };
            await connection.query('INSERT INTO Participantes SET ?', novoParticipante);
        
        }

        for (const tarefa of tarefas) {
            const novaTarefa = {
                titulo: tarefa.titulo,
                estado: tarefa.estado,
                tempoEstimado: tarefa.tempoEstimado,
                dataPrevista: tarefa.dataPrevista,
                projetoId: projetoId,
                createdAt: now,
                updatedAt: now
            };
            await connection.query('INSERT INTO Tarefas SET ?', novaTarefa);

            for (const responsavel of tarefa.responsaveis) {
                const responsaveis ={
                    tarefaId: responsavel.tarefaId,
                    participanteId: responsavel.participanteId,
                    createdAt: now,
                    updatedAt: now
                };
                await connection.query('INSERT INTO Responsaveis SET ?', responsaveis);
            }
        }
        
        res.status(200).send('Projeto adicionado com sucesso');
    } catch (error) {
        console.error('Erro ao adicionar o projeto:', error);
        res.status(500).send('Erro ao adicionar o projeto');
    }
});

app.get('/projetos', async (req, res) => {
    try {
        // Consulta SQL para buscar todos os projetos com suas tarefas, participantes e responsáveis
        const [rows] = await connection.query(`
            SELECT 
                p.id AS projetoId,
                p.titulo AS projetoTitulo,
                p.descricao AS projetoDescricao,
                p.dataInicial,
                p.dataFinal,
                t.id AS tarefaId,
                t.titulo AS tarefaTitulo,
                t.estado AS tarefaEstado,
                t.tempoEstimado AS tarefaTempoEstimado,
                t.dataPrevista AS tarefaDataPrevista,
                r.participanteId AS responsavelId,
                pa.nome AS responsavelNome,
                pa.funcao AS responsavelFuncao
            FROM Projetos p
            LEFT JOIN Tarefas t ON p.id = t.projetoId
            LEFT JOIN Responsaveis r ON t.id = r.tarefaId
            LEFT JOIN Participantes pa ON pa.id = r.participanteId
            ORDER BY p.id, t.id, r.id
        `);

        // Processar os dados para agrupar conforme necessário
        const projetosMap = new Map();

        rows.forEach(row => {
            if (!projetosMap.has(row.projetoId)) {
                projetosMap.set(row.projetoId, {
                    id: row.projetoId,
                    titulo: row.projetoTitulo,
                    descricao: row.projetoDescricao,
                    dataInicial: row.dataInicial,
                    dataFinal: row.dataFinal,
                    tarefas: []
                });
            }

            const projeto = projetosMap.get(row.projetoId);

            if (row.tarefaId) {
                let tarefa = projeto.tarefas.find(t => t.id === row.tarefaId);
                if (!tarefa) {
                    tarefa = {
                        id: row.tarefaId,
                        titulo: row.tarefaTitulo,
                        estado: row.tarefaEstado,
                        tempoEstimado: row.tarefaTempoEstimado,
                        dataPrevista: row.tarefaDataPrevista,
                        responsaveis: []
                    };
                    projeto.tarefas.push(tarefa);
                }

                if (row.responsavelId) {
                    let responsavel = tarefa.responsaveis.find(r => r.id === row.responsavelId);
                    if (!responsavel) {
                        responsavel = {
                            id: row.responsavelId,
                        };
                        tarefa.responsaveis.push(responsavel);
                    }
                }
            }
        });

        // Converter o Map para um array
        const projetos = Array.from(projetosMap.values());

        res.json(projetos);
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.status(500).send('Erro ao buscar projetos');
    }
});




app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});


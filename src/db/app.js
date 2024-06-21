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

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});


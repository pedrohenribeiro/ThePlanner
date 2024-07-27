Projeto
npx sequelize-cli model:generate --name Projetos --attributes titulo:string,descricao:string,dataInicial:date,dataFinal:date

Participante
npx sequelize-cli model:generate --name Participantes --attributes nome:string,funcao:string

Tarefa
npx sequelize-cli model:generate --name Tarefas --attributes titulo:string,estado:string,tempoEstimado:string,dataPrevista:date,projetoId:integer

Responsável
npx sequelize-cli model:generate --name Responsaveis --attributes tarefaId:integer,participanteId:integer

Usuario
npx sequelize-cli model:generate --name Usuarios --attributes nomeUsuario:string


Executar as migrations
npx sequelize-cli db:migrate
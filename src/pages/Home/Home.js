import CardProjetos from "../../components/layout/Cards/CardsProjetos";
import CardCadastrarTarefas from "../../components/layout/Cards/tarefas/CardCadastrarTarefas";

function Home(){
    return(
        <div className="conteudosPagina">
            <div className="conteudoPagina">
                <CardProjetos 
                    titulo={"Para concluir hoje"}
                    periodo={"10/06/2024 - 19/06/2024"}
                    descricao={"descricao"}
                />
                <CardProjetos 
                    titulo={"Tarefa em foco"}
                    periodo={"10/06/2024 - 19/06/2024"}
                    descricao={"descricao"}
                />
                <CardProjetos 
                    titulo={"Tarefas Pendentes"}
                    periodo={"10/06/2024 - 23/07/2024"}
                    descricao={"descricao"}
                />
                <CardProjetos 
                    titulo={"Para essa semana"}
                    periodo={"16/06/2024 - 22/06/2024"}
                    descricao={"descricao"}
                />
            </div>
            <div className="conteudoPagina">
                <CardCadastrarTarefas/>
            </div>
            <div className="conteudoPagina">
               
            </div>
            <div className="conteudoPagina">
                <CardProjetos 
                    titulo={"Projeto X"}
                    periodo={"10/03/2024 - 16/06/2024"}
                    descricao={"descricao"}
                />
                <CardProjetos 
                    titulo={"Projeto Y"}
                    periodo={"10/03/2024 - 16/06/2024"}
                    descricao={"descricao"}
                />
            </div>
        </div>
    )
}
export default Home;
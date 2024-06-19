import CardProjetos from "../../components/layout/Cards/CardsProjetos";

function Home(){
    return(
        <div className="conteudoPagina">
            <CardProjetos 
                titulo={"Teste"}
                participantes={"Pedro"}
                descricao={"descricao"}
            />
        </div>
    )
}
export default Home;
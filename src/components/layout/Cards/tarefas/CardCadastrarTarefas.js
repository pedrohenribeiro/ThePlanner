import styles from './CardCadastrarTarefas.module.css'

function CardCadastrarTarefas({adicionarTarefa}){
    const nomeTarefa = "a"
    const descricao= "de"
    return(
        <div>
            <div className={styles.cardList}>

                <div className={styles.cardTitulo}>            
                        <h3>Adicionar Tarefa</h3>
                </div>

                <div className={styles.cardConteudos}>
                    <div className={styles.cardConteudo}>                 
                        <b>Periodo</b>
                        <p className={styles.informacoes}></p>
                    </div>
                    <div className={styles.cardConteudo}>                 
                        <button onClick={(e) => adicionarTarefa(nomeTarefa,descricao)}>Adicionar</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CardCadastrarTarefas;
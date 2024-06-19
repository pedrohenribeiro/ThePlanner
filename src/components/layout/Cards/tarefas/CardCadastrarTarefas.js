import styles from './CardCadastrarTarefas.module.css'

function CardCadastrarTarefas(){
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
                </div>

            </div>
        </div>
    )
}
export default CardCadastrarTarefas;
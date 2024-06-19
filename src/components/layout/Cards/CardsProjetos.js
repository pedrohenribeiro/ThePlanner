import styles from './CardsProjetos.module.css'
import { FiEdit } from "react-icons/fi";
import { IoIosRemoveCircleOutline } from "react-icons/io";

function CardProjetos({titulo, participantes,descricao}){

    return (
        <div>
            <div className={styles.cardList}>
                
                <div className={styles.cardTitulo}>            
                    <p>{titulo}</p>
                </div>

                <div className={styles.cardConteudo}>                 
                    <b>Participantes</b>
                    <p className={styles.informacoes}>  :{participantes}</p>
                </div>

                <div className={styles.cardConteudo}>                 
                    <b>Descricao</b>
                    <p className={styles.informacoes}>  :{descricao}</p>
                </div>
                
            </div>
        </div>
    )
}
export default CardProjetos;
import {Link} from 'react-router-dom'
import styles from './BarraLateral.module.css'
import { IoHome } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa";

function BarraLateral(){
    return (
        <div className={styles.BarraLateral}>
            <div className={styles.botoes}>

                <Link to="/" className={styles.botao}>
                    <IoHome
                        size={35}
                        onClick={() => console.log("Clicado!")}
                        title='Home'
                    />
                </Link>

                <Link to="/tarefas" className={styles.botao}>
                    <FaClipboardCheck
                        size={35}
                        onClick={() => console.log("Clicado!")} 
                        title='Tarefas'
                    />
                </Link>

                <Link to="/projetos" className={styles.botao}>
                    <IoHome
                        size={35}
                        onClick={() => console.log("Clicado!")} 
                    />
                </Link>

                <Link to="/usuarios" className={styles.botao}>
                    <IoHome
                        size={35}
                        onClick={() => console.log("Clicado!")} 
                    />
                </Link>
                
            </div>
        </div>
    )
}
export default BarraLateral;
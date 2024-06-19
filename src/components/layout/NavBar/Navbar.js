import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'
import { IoPersonSharp } from "react-icons/io5";

function Navbar() {
    return (
        <div className={styles.navMenu}>
          <ul className={styles.lista}> 
                <div className={styles.logo}>The Planner</div>
                
{/*                 <li className={styles.itemLista}> 
                    <Link to="/" className={styles.botao}>
                        <IoPersonSharp className={styles.icone}/>
                        <b>Home</b>
                    </Link>
                </li> */}
            </ul>
        </div>
    )
}

export default Navbar
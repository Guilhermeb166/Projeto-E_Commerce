import { FaInstagram, FaWhatsapp } from 'react-icons/fa6'
import styles from './Footer.module.css'
import { MdOutlineMailOutline } from 'react-icons/md'
export default function Footer(){
    return(
        <footer className={styles.footer}>
            <div>
                <ul className={styles.socialList}>
                    <li><FaInstagram className={styles.instaIcon}/></li>
                    <li><FaWhatsapp className={styles.whatIcon}/></li>
                    <li><MdOutlineMailOutline className={styles.emailIcon} /></li>
                </ul>
            </div>
            <div></div>
        </footer>
    )
}
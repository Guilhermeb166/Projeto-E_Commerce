import styles from './Navbar.module.css'
import { IoSearch,IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){
    const [showSearchBar,setShowSearchBar] = useState(false) 
    const handleSearchBar = ()=>{
        setShowSearchBar(!showSearchBar)
    }


    return(
        <div className={styles.navContainer}>
            <div className={styles.navLeft}>
                <Link to={'/'}><img src="./logo/Tech-Storepng.png" alt="" className={styles.logo}/></Link>
                <div className={styles.searchContainer}>
                    <IoSearch className={styles.searchIcon} onClick={handleSearchBar} />

                    {/*o input terá apenas a class searchBar que está como
                    display none, e caso o showSearchBar seja true ele 
                    recebe essa class com display flex */}
                    <input type="search" placeholder='Pesquise aqui...' className={`${styles.searchBar} ${showSearchBar ? styles.showSearchBar : ''}`} />
                </div>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>Mais Vendidos</li>
                <li className={styles.link}>Celulares</li>
                <li className={styles.link}>Computadores</li>
                <li className={styles.link}>Acessórios</li>
            </ul>
            <div className={styles.navRight}>
            <FaShoppingCart className={styles.cartIcon} />
            <IoPerson className={styles.personIcon} />
            </div>
        </div>
    )
}
import styles from './Navbar.module.css'
import { IoSearch, IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Context from '../../../Context/Context';

export default function Navbar() {
    const { cart } = useContext(Context);
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    //const [background,setBackground] = useState(false)
    const [scrolled, setScrolled] = useState(false); // Novo estado para controlar o background
    const navigate = useNavigate();
    const location = useLocation(); // Hook para verificar a rota atual
    const handleSearchBar = () => {
        setShowSearchBar(!showSearchBar)
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm}`);
        }
    }

    const handleCategoryClick = (category) => {
        navigate(`/search?q=${category}`);
    }

    const handleBestSellerClick = () => {
        navigate('/best-sellers');
    };

    const navBar = useRef(null)

    //Detecta a rolagem e altera o estado para adicionar o background
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (location.pathname === '/') {
                if (offset > 500) { // Define a altura em que o background deve mudar
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            } else {
                setScrolled(true)
            }

        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);// Atualiza sempre que a rota mudar

    const cartPage = () =>{
        if(cart.length>0){
            navigate('/cart')
        }else{
            alert('O carrinho está vazio!')
        }
    }

    return (
        <nav className={`${styles.navContainer} ${scrolled || location.pathname !== '/' ? styles.navScrolled : ''}`} ref={navBar}>
            <div className={styles.navLeft}>
                <Link to={'/'}><img src="./logo/Tech-Storepng.png" alt="" className={styles.logo} draggable='false' /></Link>
                <div className={styles.searchContainer}>
                    <IoSearch className={styles.searchIcon} onClick={handleSearchBar} />

                    {/*o input terá apenas a class searchBar que está como
                    display none, e caso o showSearchBar seja true ele 
                    recebe essa class com display flex */}
                    <form onSubmit={handleSearchSubmit}>
                        <input type="search" placeholder='Pesquise aqui...'
                            className={`${styles.searchBar} ${showSearchBar ? styles.showSearchBar : ''}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </form>
                </div>
            </div>
            <ul className={styles.links}>
                <li className={styles.link} onClick={handleBestSellerClick}>Mais Vendidos</li>
                <li className={styles.link} onClick={() => handleCategoryClick('smartphone')}   >Celulares</li>
                <li className={styles.link} onClick={() => handleCategoryClick('notebook')}>Computadores</li>
                <li className={styles.link} onClick={() => handleCategoryClick('Acessorios')}>Acessórios</li>
                <li className={styles.link}>Contato</li>
            </ul>
            <div className={styles.navRight}>

                <FaShoppingCart className={styles.cartIcon} onClick={cartPage} />
                {cart.length > 0 && <span className={styles.cartStatus}>{cart.reduce((total, item) => total + item.quantity, 0)}</span>}

                <Link to={'/login'}>
                    <IoPerson className={styles.personIcon} />
                </Link>
            </div>
        </nav>
    )
}
import styles from './Home.module.css'
/*import { Link } from 'react-router-dom'*/
import notebooks from '../../../productsList/Notebooks'
import phones from '../../../productsList/Phones'
import derivados from '../../../productsList/Derivados'
import ProductCard from '../Products/Cards/ProductCard'
import { Link } from 'react-router-dom'
import Carousel from '../../Layout/Header/Carousel'

export default function Home() {

   // Seleciona todos os notebooks e celulares
   const allProducts = [...notebooks.slice(0, 4), ...phones.slice(0, 4),...derivados.slice(0,4)];

   // Função para embaralhar os produtos
   function shuffle(array) {
       return array.sort(() => Math.random() - 0.5);
   }

   // Embaralha os produtos e seleciona os primeiros 8
   const shuffledProducts = shuffle(allProducts).slice(0, 12);
   

   
   

    //pegar os 8 primeiros
    const notes = notebooks.slice(0, 4)
    const cells = phones.slice(0, 4)
    return (
        <div>
            <Carousel/>
            <main className={styles.home}>
                <div className={styles.Card} >
                    <h1>Notebooks</h1>
            
                    <div className={styles.noteCard} >
                        {notes.map(notebook => (
                            <img key={notebook.id} src={notebook.image} alt={notebook.name} className={styles.noteImg} draggable='false'/>
                        ))}
                    </div>
            
                </div>
                <div className={styles.Card}>
                    <h1>Celulares</h1>
                    <div className={styles.cellCard}>
                        {cells.map(phone => (
                            <img key={phone.id} src={phone.image} alt={phone.name} className={styles.phoneImg} draggable='false'/>
                        ))}
                    </div>
                </div>
            
                    {/* Cards de produtos abaixo das seções de imagens */}
                <div className={styles.productCardsSection}>
                    <div className={styles.cardGrid}>
                       
                        {shuffledProducts.map(notebook => (
                            <ProductCard key={notebook.id} data={notebook} />
                        ))}
                    </div>
               </div>
             <button><Link to={'/products'}>clique</Link></button>
            </main>
        </div>
    )
}
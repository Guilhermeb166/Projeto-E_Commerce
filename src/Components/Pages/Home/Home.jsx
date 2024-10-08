import styles from './Home.module.css'
/*import { Link } from 'react-router-dom'*/
import notebooks from '../../../productsList/Notebooks'
import phones from '../../../productsList/Phones'
import derivados from '../../../productsList/Derivados'
import ProductCard from '../Products/Cards/ProductCard'

import Carousel from '../../Layout/Header/Carousel'
import { useEffect, useState } from 'react'

export default function Home() {
    const [displayCount,setDisplayCount] = useState(4)

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

    //useEffect para monitorar a largura da tela
    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth<481){
                setDisplayCount(2)//exibe 2 produtos
            }else {
                setDisplayCount(4)//exibe 4 produtos
            }
        }
        handleResize()//função para carregar o componente

        window.addEventListener('resize',handleResize)//adiciona o listener de resize

        return () => window.removeEventListener('resize', handleResize); //Limpa o listener ao desmontar
    },[])
    return (
        <div>
            <Carousel/>
            <main className={styles.home}>
                <div className={styles.Card} >
                    <h1 className={styles.cardTitle}>Notebooks</h1>
                    <div className={styles.noteCard} >
                        {notes.slice(0,displayCount).map(notebook => (
                            <img key={notebook.id} src={notebook.image} alt={notebook.name} className={styles.noteImg} draggable='false'/>
                        ))}
                    </div>
            
                </div>
                <div className={styles.Card}>
                    <h1 className={styles.cardTitle}>Celulares</h1>
                    <div className={styles.cellCard}>
                        {cells.slice(0,displayCount).map(phone => (
                            <img key={phone.id} src={phone.image} alt={phone.name} className={styles.phoneImg} draggable='false'/>
                        ))}
                    </div>
                </div>
            
                    {/* Cards de produtos abaixo das seções de imagens */}
                <div className={styles.productCardsSection}>
                    <div className={styles.cardGrid}>
                       
                        {shuffledProducts.map(product => (
                            <ProductCard key={product.id} data={product} imgClass={`${styles.productImage}`}/>
                        ))}
                    </div>
               </div>
             
            </main>
        </div>
    )
}
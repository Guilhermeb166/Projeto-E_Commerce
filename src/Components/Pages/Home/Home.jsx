import styles from './Home.module.css'
/*import { Link } from 'react-router-dom'*/
import notebooks from '../../../productsList/Notebooks'
import phones from '../../../productsList/Phones'
import derivados from '../../../productsList/Derivados'
import ProductCard from '../Products/Cards/ProductCard'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Carousel from '../../Layout/Header/Carousel'
import { useEffect, useState } from 'react'
import getProductImgClass from '../../patterns/ReusableFunctions'

export default function Home() {
    const [displayCount,setDisplayCount] = useState(4)
    const [numberCards,setNumberCards] = useState(16)
    const [loading,setLoading] = useState(true)

   // Seleciona todos os notebooks e celulares
   const allProducts = [...notebooks.slice(0, 8), ...phones.slice(0, 8),...derivados.slice(0,8)];

   // Função para embaralhar os produtos
   function shuffle(array) {
       return array.sort(() => Math.random() - 0.5);
   }

   
   
    //pegar os 8 primeiros
    const notes = notebooks.slice(0, 4)
    const cells = phones.slice(0, 4)
    // Embaralha os produtos e seleciona os primeiros 8
    const shuffledProducts = shuffle(allProducts).slice(0, numberCards);

    // Monitora o carregamento de imagens
    useEffect(() => {
        const images = [
            ...notes.map(item => item.image),
            ...cells.map(item => item.image),
            ...shuffledProducts.map(item => item.image)
        ];

        const loadImage = src => new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
        });

        // Carrega todas as imagens e atualiza o estado ao finalizar
        Promise.all(images.map(loadImage)).then(() => setLoading(false));
    }, [notes, cells, shuffledProducts]);

    //useEffect para monitorar a largura da tela
    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth<481){
                setDisplayCount(2)//exibe 2 produtos
                setNumberCards(8)
            }else {
                setDisplayCount(4)//exibe 4 produtos
                setNumberCards(16)
            }
        }
        handleResize()//função para carregar o componente

        window.addEventListener('resize',handleResize)//adiciona o listener de resize

        return () => window.removeEventListener('resize', handleResize); //Limpa o listener ao desmontar
    },[])

   
    return (
        <div>
            {loading ? (
                <div className={styles.preloader}>
                    <AiOutlineLoading3Quarters className={styles.loadingIcon} />
                </div>
            ) : (
                <>
                    <Carousel />
                    <main className={styles.home}>
                        <div className={styles.Card}>
                            <h1 className={styles.cardTitle}>Notebooks</h1>
                            <div className={styles.noteCard}>
                                {notes.slice(0, displayCount).map(notebook => (
                                    <img key={notebook.id} src={notebook.image} alt={notebook.name} className={styles.noteImg} draggable='false' />
                                ))}
                            </div>
                        </div>
                        <div className={styles.Card}>
                            <h1 className={styles.cardTitle}>Celulares</h1>
                            <div className={styles.cellCard}>
                                {cells.slice(0, displayCount).map(phone => (
                                    <img key={phone.id} src={phone.image} alt={phone.name} className={styles.phoneImg} draggable='false' />
                                ))}
                            </div>
                        </div>
                        <div className={styles.productCardsSection}>
                            <div className={styles.cardGrid}>
                                {shuffledProducts.map(product => (
                                    <ProductCard key={product.id} data={product} imgClass={`${styles.productImage} ${getProductImgClass(product)}`} />
                                ))}
                            </div>
                        </div>
                    </main>
                </>
            )}
        </div>
    );
}
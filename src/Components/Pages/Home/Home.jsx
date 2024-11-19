import styles from './Home.module.css'
import notebooks from '../../../productsList/Notebooks'
import phones from '../../../productsList/Phones'
import derivados from '../../../productsList/Derivados'
import ProductCard from '../Products/Cards/ProductCard'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Carousel from '../../Layout/Header/Carousel'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getProductImgClass from '../../patterns/ReusableFunctions' // Importa uma função que aplica classes específicas a cada imagem do produto, conforme a categoria do item.

export default function Home() {
    const [displayCount,setDisplayCount] = useState(4)
    //Define um estado chamado displayCount que controla quantos produtos serão exibidos inicialmente. Começa com 4, mas pode mudar se a tela for redimensionada.
    const [numberCards,setNumberCards] = useState(16)
    // Define numberCards, que controla quantos produtos no total estarão disponíveis para exibição. Começa com 16, mas é ajustado em função do tamanho da tela.
    const [loading,setLoading] = useState(true)
    //Define loading, que indica se a página ainda está carregando os produtos e imagens. Inicialmente, é true para que a tela de carregamento seja exibida até que todos os itens estejam carregados.

    const navigate = useNavigate();

   const allProducts = [...notebooks.slice(0, 8), ...phones.slice(0, 8),...derivados.slice(0,8)];// Seleciona todos os notebooks, celulares e derivados

   // Função para embaralhar os produtos
   function shuffle(array) {
       return array.sort(() => Math.random() - 0.5);
       //O método sort() é normalmente usado para ordenar elementos de um array com base em uma função de comparação.
       //essa função de comparação (() => Math.random() - 0.5) gera um número aleatório entre -0.5 e 0.5 usando Math.random().
   }

   
   
    //pegar os 8 primeiros
    const notes = notebooks.slice(0, 4)
    const cells = phones.slice(0, 4)

    // Embaralha os produtos e seleciona os primeiros 8
    const shuffledProducts = shuffle(allProducts).slice(0, numberCards);
    //Aplica a função shuffle em allProducts para misturar a ordem dos produtos e exibe uma quantidade limitada (numberCards) de produtos embaralhados.

    // Monitora o carregamento de imagens
    useEffect(() => {
        const images = [// cria uma lista (images) com todas as imagens que queremos carregar.
            ...notes.map(item => item.image),
            ...cells.map(item => item.image),
            ...shuffledProducts.map(item => item.image)
            //O comando .map(item => item.image) passa por cada item na lista de cada categoria e pega a propriedade image de cada um deles
        ];

        const loadImage = src => new Promise((resolve) => {
            //define uma função chamada loadImage que tenta carregar uma imagem. Essa função usa uma "Promessa" (Promise), que é uma forma de esperar até que algo (como carregar uma imagem) esteja completo.
            const img = new Image();
            img.src = src;
            img.onload = resolve;
        });

        // Carrega todas as imagens e atualiza o estado ao finalizar
        Promise.all(images.map(loadImage)).then(() => setLoading(false));
        /*Aqui, usamos Promise.all para esperar o carregamento de todas as imagens da lista images.
        images.map(loadImage): Para cada imagem em images, chamamos a função loadImage para tentar carregá-la. Isso nos dá uma lista de promessas (cada promessa corresponde ao carregamento de uma imagem).
        .then(() => setLoading(false));: Quando todas as imagens terminam de carregar, usamos .then() para dizer ao React que o carregamento acabou (setLoading(false)). Isso faz com que o ícone de "loading" desapareça, e o restante do conteúdo seja exibido. */
    }, [notes, cells, shuffledProducts]);

    //useEffect para monitorar a largura da tela
    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth<481){
                setDisplayCount(2)//exibe 2 produtos
                setNumberCards(8)
            }else if(window.innerWidth<=885 && window.innerWidth>=481){
                setDisplayCount(2)
                setNumberCards(10)
            }else {
                setDisplayCount(3)//exibe 4 produtos
                setNumberCards(16)
            }
        }
        handleResize()//função para carregar o componente

        window.addEventListener('resize',handleResize)//adiciona o listener de resize

        return () => window.removeEventListener('resize', handleResize); //Limpa o listener ao desmontar
    },[])

    const handleCategoryClick = (category) => {
        navigate(`/search?q=${category}`);
    }

   
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
                        <div className={styles.Card} onClick={() => handleCategoryClick('notebook')}>
                            <h1 className={styles.cardTitle}>Notebooks</h1>
                            <div className={styles.noteCard}>
                                {notes.slice(0, displayCount).map(notebook => (
                                    <img key={notebook.id} src={notebook.image} alt={notebook.name} className={styles.noteImg} draggable='false' />
                                ))}
                            </div>
                        </div>
                        <div className={styles.Card} onClick={() => handleCategoryClick('smartphone')}>
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
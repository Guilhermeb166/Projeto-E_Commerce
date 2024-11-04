import styles from './ProductPage.module.css'
import Context from '../../../../Context/Context'
import { useContext, useEffect,useRef  } from 'react'
import formatCurrency from '../../../patterns/FormatCurrency'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'



export default function ProductPage() {
  
    const { selectedProduct, setSelectedProduct,addToCart } = useContext(Context);
    
    const zoomRef = useRef(null);
    const imgWrapperRef = useRef(null);
    const animationFrameRef = useRef(null);
    const navigate = useNavigate();

    const handleBuyNow = () => {
        addToCart(selectedProduct);
        navigate('/payment'); // Redireciona para a página de pagamento
    };


   
    useEffect(() => {
        // Recupera o produto do localStorage ao carregar a página
        const savedProduct = localStorage.getItem('selectedProduct');
        if (savedProduct) {
          setSelectedProduct(JSON.parse(savedProduct));
        } else {
          console.log('Nenhum produto no localStorage');
        }
      }, [setSelectedProduct]); // O array vazio [] garante que o useEffect rode apenas uma vez ao montar o componente
    
    

    if (!selectedProduct) {
        return <div>Produto não encontrado!</div>;
    }
    const productImgClass = (product) => {
        if (Array.isArray(product.category)) {
          // Verifica se o array de categorias inclui "Notebook"
          if (product.category.some(category => category.toLowerCase() === 'notebook')) {
            return styles.notebookCartImg;
          }
          //verifica se o produto tem a categoria cobra( a imagem estava muito grande)
          else if(product.category.some(category => category.toLowerCase() === 'cobra')){
            return styles.redragonCobraCartImg;
          }
          else if(product.category.some(category => category.toLowerCase()==='webcam')){
            return styles.webcamCartImg
          }
          // Verifica se o array de categorias inclui "Acessorios"
          else if (product.category.some(category => category.toLowerCase() === 'acessorios')) {
            return styles.accessoryCartImg;
          }
          else if (product.category.some(category => category.toLowerCase() === 'smartphone')) {
            return styles.smartphoneCartImg
          }
        }
    
        return ''
      };
      const handleMouseEnter = () => {
        if (zoomRef.current) {
            zoomRef.current.style.display = 'flex';
        }
    };
    

    const handleMouseMove = (e) => {
      if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
      }
  
      animationFrameRef.current = requestAnimationFrame(() => {
          const { left, top, width, height } = imgWrapperRef.current.getBoundingClientRect();
          const x = ((e.clientX - left) / width) * 100;
          const y = ((e.clientY - top) / height) * 100;
  
          if (zoomRef.current) {
              zoomRef.current.style.backgroundPosition = `${x}% ${y}%`;
          }
      });
  };
  
  const handleMouseLeave = () => {
      if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
      }
      if (zoomRef.current) {
        zoomRef.current.style.display = 'none';
        zoomRef.current.style.backgroundPosition = '0% 0%';
    }
    }
    const { name, price, image, description } = selectedProduct
    // Função para adicionar o produto ao carrinho
    const AddToCart = () => {
        addToCart(selectedProduct); 
    };

    
    return (
        <main className={styles.productPage}>
            <div className={styles.productPageContainer}>
                <div className={styles.productLeft}>
                    <div className={styles.imgList}>
                        <div className={styles.imgItem}></div>
                        <div className={styles.imgItem}></div>
                        <div className={styles.imgItem}></div>
                    </div>
                    <div className={styles.productImgWrapper} onMouseEnter={handleMouseEnter} // Inicia o zoom
                    onMouseMove={handleMouseMove} 
                    onMouseLeave={handleMouseLeave} // Encerra o zoom
                    ref={imgWrapperRef}>
                    
                          <img src={image} alt={name} className={`${styles.productImage} ${productImgClass(selectedProduct)}`} />
                          
                          
                          <div
                            className={styles.zoom}
                            ref={zoomRef}
                            style={{
                                backgroundImage: `url(${image})`,
                            }}
                            
                        ></div>
                        
                    </div>
                    <p style={{ color: '#000000bf',marginTop:'8px' }}>Passe o mouse para ampliar a imagem</p>
                </div>
                <div className={styles.productRight}>
                    <h1 className={styles.productName}>{name}</h1>
                    <p className={styles.productDescription}>{description}</p>
                    <p className={styles.productPrice}>{price !== undefined ? formatCurrency(price, 'BRL') : 'Preço indisponível'}</p>
                    <p className={styles.parcel}>Em até 6x sem juros </p>

                    <div className={styles.paymentWrapper}>
                        <button className={styles.buyBtn}  onClick={handleBuyNow}>Comprar</button>
                        <BsFillCartPlusFill className={styles.addCartIcon} onClick={AddToCart}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

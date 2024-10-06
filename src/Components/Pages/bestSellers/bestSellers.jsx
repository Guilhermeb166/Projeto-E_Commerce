import { useState, useEffect } from 'react';
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import derivados from '../../../productsList/Derivados';
import styles from '../../../productsList/ProductList.module.css';
import getProductImgClass from '../../patterns/ReusableFunctions';
import Navbar from '../../Layout/NavBar/Navbar';
import ProductCard from '../Products/Cards/ProductCard';

export default function BestSellersPage() {
    const [bestSellers, setBestSellers] = useState([]);
     
    useEffect(() => {
        // Ordena os produtos de cada categoria pelo número de vendas em ordem decrescente
        const topPhones = [...phones].sort((a, b) => b.sales - a.sales).slice(0, 5);
        const topNotebooks = [...notebooks].sort((a, b) => b.sales - a.sales).slice(0, 5);
        const topDerivados = [...derivados].sort((a, b) => b.sales - a.sales).slice(0, 5);

        // Combina os top 5 de cada categoria
        const topProducts = [...topPhones, ...topNotebooks, ...topDerivados];

        setBestSellers(topProducts);
    }, []);

    return (
        <div>
            <Navbar/>
            <div className={styles.CardsContainer}>
                <h1 className={styles.searchText}>Top 5 Produtos Mais Vendidos por Categoria</h1>
                {bestSellers.length > 0 ? (
                    <div className={styles.ProductsCards}>
                        {bestSellers.map(product => (
                            <ProductCard key={product.id} data={product} imgClass={`${styles.productImg} ${getProductImgClass(product)}`}/>
                            
                        ))}
                    </div>
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
}

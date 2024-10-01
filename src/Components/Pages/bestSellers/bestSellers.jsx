import { useState, useEffect } from 'react';
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import derivados from '../../../productsList/Derivados';
import styles from '../../../productsList/ProductList.module.css';
import formatCurrency from '../../patterns/FormatCurrency';
import Navbar from '../../Layout/NavBar/Navbar';

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
                    <div className={styles.cardsWrapper}>
                        {bestSellers.map(product => (
                            <div key={product.id} className={styles.cardProduct}>
                                <img src={product.image} alt={product.name} className={styles.productImg} draggable='false' />
                                <h2 className={styles.productTitle}>{product.name}</h2>
                                <p className={styles.productPrice}>{formatCurrency(product.price, 'BRL')}</p>
                                <p className={styles.productSales}>Vendas: {product.sales}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
}

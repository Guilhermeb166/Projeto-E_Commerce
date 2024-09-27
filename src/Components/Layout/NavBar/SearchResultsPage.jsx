import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import styles from '../../../productsList/ProductList.module.css'
import derivados from '../../../productsList/Derivados';
import formatCurrency from '../../patterns/FormatCurrency';

export default function SearchResultsPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            const allProducts = [...phones, ...notebooks, ...derivados];

            const filteredProducts = allProducts.filter(product => {
                const productName = product.name.toLowerCase();

                // Verifica se a categoria existe e é um array, e transforma o array em string ? = if, : = else
                const productCategory = Array.isArray(product.category)
                    ? product.category.join(' ').toLowerCase()
                    : (product.category ? product.category.toLowerCase() : "");



                return (
                    productName.includes(lowerCaseQuery) ||
                    productCategory.includes(lowerCaseQuery)

                );
            });
            setResults(filteredProducts);
        }
    }, [query]);

    return (
        <div className={styles.CardsContainer}>
            <h1 className={styles.searchText}>Resultados de pesquisa para: {query}</h1>
            {results.length > 0 ? (
                <div className={styles.cardsWrapper}>
                    {results.map(product => (
                        <div key={product.id} className={styles.cardProduct}>
                            <img src={product.image} alt={product.name} className={styles.productImg} draggable='false' />
                            <h2 className={styles.productTitle}>{product.name}</h2>
                            <p>{formatCurrency(product.price, 'BRL')}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum resultado encontrado.</p>
            )}
        </div>
    );
}

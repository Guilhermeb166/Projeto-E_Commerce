import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import derivados from '../../../productsList/Derivados';
import styles from '../../../productsList/ProductList.module.css';
import getProductImgClass from '../../patterns/ReusableFunctions';
import ProductCard from '../../Pages/Products/Cards/ProductCard';
import formatCurrency from '../../patterns/FormatCurrency';

export default function SearchResultsPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [results, setResults] = useState([]);
    const [inputPrice,setInputPrice] = useState(true)
    const [maxPrice, setMaxPrice] = useState(0); // Estado para o valor máximo do slider
    const [minPrice, setMinPrice] = useState(""); // Estado para o valor mínimo

    useEffect(() => {
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            const allProducts = [...phones, ...notebooks, ...derivados];

            const filteredProducts = allProducts.filter(product => {
                const productName = product.name.toLowerCase();
                const productCategory = Array.isArray(product.category)
                    ? product.category.join(' ').toLowerCase()
                    : (product.category ? product.category.toLowerCase() : "");

                return (
                    (productName.includes(lowerCaseQuery) || productCategory.includes(lowerCaseQuery))
                );
            });
            setResults(filteredProducts);
        }
    }, [query, maxPrice]);

    const handlePriceChange = (e) => {
        const sliderValue = (e.target.value / 50000) * 100; // Calcula a porcentagem com base no valor máximo
        e.target.style.setProperty('--slider-value', sliderValue);
        setMaxPrice(Number(e.target.value)); // Atualiza o valor máximo com base no input do slider
    };
    
    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value); // Atualiza o valor mínimo manual
    };

    const handleInputPrice = ()=>{
        setInputPrice(!inputPrice)
    }

    return (
        <section className={styles.SearchResultsPageContainer}>
            <div className={styles.filterContainer}>
                <div className={styles.priceWrapper}>
                    <p>Preço</p>
                    {inputPrice ? 
                        <div>
                            <div className={styles.priceRange}>
                                <span>{formatCurrency(maxPrice, 'BRL')}</span> {/* Exibe o valor formatado */}
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="0.10" // Incrementos de 0,10
                                    value={maxPrice}
                                    onChange={handlePriceChange}
                                    className={styles.customSlider}
                                />
                            
                            </div>
                            <button onClick={handleInputPrice} className={styles.inputPriceBtn}>Digitar Manualmente</button>
                        </div>
                    :   <div>
                        <div className={styles.priceManual}>
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            className={styles.inputPriceNumber} 
                            value={minPrice || ""} // Garante que o campo fique vazio se não houver valor
                            placeholder="mínimo" 
                            onChange={handleMinPriceChange} // Atualiza o estado ao digitar
                        />
                        <span>até</span>
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            className={styles.inputPriceNumber} 
                            value={maxPrice || ""} // Garante que o campo fique vazio se não houver valor
                            placeholder="máximo" 
                            onChange={(e) => setMaxPrice(e.target.value)} // Atualiza o valor máximo manualmente
                        />
                            </div>
                            <button onClick={handleInputPrice} className={styles.inputPriceBtn}>Escolher com a barra</button>
                    </div>
                    }
                    
                </div>
            </div>

            <div className={styles.CardsContainer}>
                <h1 className={styles.searchText}>Resultados de pesquisa para: {query}</h1>
                <div className={styles.ProductsCards}>
                    {results.length > 0 ? (
                        results.map(product => (
                            <ProductCard 
                                key={product.id} 
                                data={product} 
                                imgClass={`${styles.productImg} ${getProductImgClass(product)}`}
                            />
                        ))
                    ) : (
                        <p>Nenhum resultado encontrado.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

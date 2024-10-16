import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import derivados from '../../../productsList/Derivados';
import styles from '../../../productsList/ProductList.module.css';
import getProductImgClass from '../../patterns/ReusableFunctions';
import ProductCard from '../../Pages/Products/Cards/ProductCard';
import formatCurrency from '../../patterns/FormatCurrency';
import Context from '../../../Context/Context';

export default function SearchResultsPage() {
    const location = useLocation();
    const { selectedCategories, setSelectedCategories,errorMessage, setErrorMessage} = useContext(Context)
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

    const toggleCategory = (category) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(item => item !== category) // Remove se já estiver selecionado
                : [...prevCategories, category] // Adiciona se não estiver selecionado
        );
    };

    const handlePriceChange = (e) => {
        const sliderValue = (e.target.value / 50000) * 100; // Calcula a porcentagem com base no valor máximo
        e.target.style.setProperty('--slider-value', sliderValue);
        setMaxPrice(Number(e.target.value)); // Atualiza o valor máximo com base no input do slider
    };
    
    const handleMinPriceChange = (e) => {
        const value = e.target.value;
        // Validação para garantir que o valor mínimo seja válido
        if (value.length > 8) {
            setErrorMessage("O valor mínimo não pode ter mais de 8 dígitos.");
        }else if(value<0){
            setErrorMessage("O valor mínimo não pode ser menor que 0.");
        }
         else if (Number(value) > maxPrice) {
            setErrorMessage("O valor mínimo deve ser menor que o valor máximo.");
        } else {
            setErrorMessage(""); // Limpa a mensagem de erro se for válido
            setMinPrice(value);
        }
    };

    const handleInputPrice = ()=>{
        setInputPrice(!inputPrice)
    }

    return (
        <section className={styles.SearchResultsPageContainer}>
            <form className={styles.filterContainer}>
                <div className={styles.priceWrapper}>
                    <p className={styles.filterSubTitle}>Preço</p>
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
                            <button onClick={(e) => { e.preventDefault(); handleInputPrice(); }} className={styles.inputPriceBtn}>Digitar Manualmente</button>
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
                            onChange={handleMinPriceChange}
                        />
                        <span>até</span>
                        <input 
                            type="number" 
                            name="" 
                            id="" 
                            className={styles.inputPriceNumber} 
                            value={maxPrice || ""} // Garante que o campo fique vazio se não houver valor
                            placeholder="máximo" 
                            onChange={(e) => {
                                const value = e.target.value;
                                // Limita o valor a 8 dígitos
                                if (value.length <= 8) {
                                    setMaxPrice(value);
                                }
                            }} // Atualiza o valor máximo manualmente
                            max='50000'
                            maxLength='8'
                        />
                            </div>
                            <button onClick={(e) => { e.preventDefault(); handleInputPrice(); }} className={styles.inputPriceBtn}>Escolher com a barra</button>
                    </div>
                    }
                </div>
                <div className={styles.categoryWrapper}>
                    <p className={styles.filterSubTitle}>Categoria</p>
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Celulares" id="Celulares" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Celulares')}
                        onChange={() => toggleCategory('Celulares')}/>
                        <label htmlFor="Celulares">Celulares</label>
                    </div>                         
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Notebooks" id="Notebooks" className={styles.inputCategory} 
                        checked={selectedCategories.includes ('Notebooks')}
                        onChange={() => toggleCategory('Notebooks')}/>
                        <label htmlFor="Notebooks">Notebooks</label>
                    </div>                         
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Mouse" id="Mouse" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Mouse')}
                        onChange={() => toggleCategory('Mouse')}/>
                        <label htmlFor="Mouse">Mouse</label>
                    </div>                       
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Teclados" id="Teclados" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Teclados')}
                        onChange={() => toggleCategory('Teclados')}/>
                        <label htmlFor="Teclados">Teclados</label>
                    </div>
                                           
                </div>
                <button>Filtrar</button>
            </form>

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

import { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Adicione o useNavigate
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import derivados from '../../../productsList/Derivados';
import styles from '../../../productsList/ProductList.module.css';
import getProductImgClass from '../../patterns/ReusableFunctions';
import ProductCard from '../../Pages/Products/Cards/ProductCard';
import formatCurrency from '../../patterns/FormatCurrency';
import Context from '../../../Context/Context';

export default function SearchResultsPage() {
    const sliderRef = useRef(null); // Referência para o slider
    const btnFilter = useRef(null); // Referência para o botão
    const location = useLocation();
    const navigate = useNavigate(); // Adicione isso para usar o hook de navegação
    const { selectedCategories, setSelectedCategories } = useContext(Context);
    const query = new URLSearchParams(location.search).get('q');
    const [results, setResults] = useState([]);
    const [inputPrice, setInputPrice] = useState(true);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);

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
    }, [query]);

    const toggleCategory = (category) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(item => item !== category) 
                : [...prevCategories, category] 
        );
    };

    const handlePriceChange = (e) => {
        const sliderValue = (e.target.value / 50000) * 100; // Calcula a porcentagem com base no valor máximo
        e.target.style.setProperty('--slider-value', sliderValue);
        setMaxPrice(Number(e.target.value)); // Atualiza o valor máximo com base no input do slider
    };

    const resetFilters = () => {
        setSelectedCategories([]); // Limpa as categorias
        setMaxPrice(0); // Reseta o preço máximo
        setMinPrice(0); // Reseta o preço mínimo
        setInputPrice(true); // Volta para o modo de input com slider

        // Reseta o valor do slider visualmente e o estilo de preenchimento
        if (sliderRef.current) {
            sliderRef.current.value = sliderRef.current.min; // Reseta o valor do slider
            sliderRef.current.style.setProperty('--slider-value', '0'); // Reseta o estilo de preenchimento
        }
    };

    const applyFilters = () => {
        const allProducts = [...phones, ...notebooks, ...derivados];
        
        // Se os preços forem inválidos, exibe mensagem de erro
        if (Number(minPrice) > Number(maxPrice)) {
            alert("O valor mínimo deve ser menor que o valor máximo.");
            return;
        }
    
        // Filtro de produtos
        const filteredProducts = allProducts.filter(product => {
            const productPrice = product.price;
    
            // Combina os filtros de categoria e preço
            const matchesCategory = selectedCategories.length === 0 ||
                selectedCategories.some(category =>
                    product.category.includes(category)
                );
            const matchesPrice = (!minPrice || productPrice >= minPrice) && (!maxPrice || productPrice <= maxPrice);
    
            return matchesCategory && matchesPrice; // Remove a query do filtro
        });
    
        // Atualiza os resultados
        setResults(filteredProducts);
    
        // Atualiza a URL com as categorias selecionadas e faixa de preço (sem a query)
        const searchParams = new URLSearchParams();
        if (selectedCategories.length > 0) {
            searchParams.set('category', selectedCategories.join(','));
        }
        if (minPrice) {
            searchParams.set('minPrice', minPrice);
        }
        if (maxPrice) {
            searchParams.set('maxPrice', maxPrice);
        }
    
        // Navega para a URL com os filtros aplicados, sem a query
        navigate(`/search?${searchParams.toString()}`);

        // Reseta os filtros após aplicar
        resetFilters();
    };
    
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
                                    ref={sliderRef} // Associa o useRef ao input do slider
                                    step="0.10" // Incrementos de 0,10
                                    id="priceRangeSlider"
                                    value={maxPrice}
                                    onChange={handlePriceChange}
                                    className={styles.customSlider}
                                />
                            </div>
                            <button onClick={(e) => { e.preventDefault(); setInputPrice(false); }} className={styles.inputPriceBtn}>Digitar Manualmente</button>
                        </div>
                    :   <div>
                            <div className={styles.priceManual}>
                                <input 
                                    type="text" 
                                    className={styles.inputPriceNumber} 
                                    value={minPrice || ""} 
                                    placeholder="mínimo" 
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
                                        if (value.length > 7) {
                                            value = value.slice(0, 7); // Limita a 5 dígitos antes da vírgula
                                        }
                                        const formattedValue = (Number(value) / 100).toFixed(2); // Adiciona duas casas decimais
                                        setMinPrice(formattedValue);
                                    }}
                                />

                                <span>até</span>

                                <input 
                                    type="text" 
                                    className={styles.inputPriceNumber} 
                                    value={maxPrice || ""} 
                                    placeholder="máximo" 
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número
                                        if (value.length > 7) {
                                            value = value.slice(0, 7); // Limita a 5 dígitos antes da vírgula
                                        }
                                        const formattedValue = (Number(value) / 100).toFixed(2); // Adiciona duas casas decimais
                                        if (formattedValue <= 50000) {
                                            setMaxPrice(formattedValue);
                                        }
                                    }}
                                    max='50000'
                                />
                            </div>
                            <button onClick={(e) => { e.preventDefault(); setInputPrice(true); }} className={styles.inputPriceBtn}>Escolher com a barra</button>
                        </div>
                    }
                </div>

                <div className={styles.categoryWrapper}>
                    <p className={styles.filterSubTitle}>Categoria</p>
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Celulares" id="Celulares" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Celulares')}
                        onChange={() => toggleCategory('Celulares')} />
                        <label htmlFor="Celulares">Celulares</label>
                    </div>
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Notebooks" id="Notebooks" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Notebooks')}
                        onChange={() => toggleCategory('Notebooks')} />
                        <label htmlFor="Notebooks">Notebooks</label>
                    </div>
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Mouse" id="Mouse" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Mouse')}
                        onChange={() => toggleCategory('Mouse')} />
                        <label htmlFor="Mouse">Mouse</label>
                    </div>
                    <div className={styles.categoryInputs}>
                        <input type="checkbox" name="Keyboard" id="Keyboard" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Keyboard')}
                        onChange={() => toggleCategory('Keyboard')} />
                        <label htmlFor="Teclados">Teclados</label>
                    </div>
                </div>

                <button onClick={(e) => { e.preventDefault(); applyFilters(); }} className={styles.filterBtn} ref={btnFilter}>Filtrar</button>
            </form>

            <div className={styles.CardsContainer}>
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

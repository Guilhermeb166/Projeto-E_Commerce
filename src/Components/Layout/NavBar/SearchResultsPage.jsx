import { useState, useEffect, useContext } from 'react';
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
    const location = useLocation();
    const navigate = useNavigate(); // Adicione isso para usar o hook de navegação
    const { selectedCategories, setSelectedCategories, selectedFabricators,setErrorMessage } = useContext(Context);
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
    /*const handleMinPriceChange = (e) => {
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
            // Atualiza o estado de minPrice, garantindo que o 0 inicial seja removido ao digitar outro número
            if (value === "") {
                setMinPrice(0); // Define como 0 se o campo estiver vazio
            } else {
                setMinPrice(Number(value)); // Atualiza com o valor digitado
            }
        }
    };*/

    const applyFilters = () => {

        // Verifica se o valor mínimo é maior que o valor máximo e exibe uma mensagem
        if (Number(minPrice) > Number(maxPrice)) {
            setErrorMessage("O valor mínimo deve ser menor que o valor máximo.");
            return; // Interrompe a execução caso os valores estejam incorretos
        }

        const lowerCaseQuery = query ? query.toLowerCase() : "";
        const allProducts = [...phones, ...notebooks, ...derivados];
    
        // Filtro de produtos
        const filteredProducts = allProducts.filter(product => {
            const productName = product.name.toLowerCase();
            const productCategory = Array.isArray(product.category)
                ? product.category.join(' ').toLowerCase()
                : (product.category ? product.category.toLowerCase() : "");
            const productPrice = product.price;
            const productFabricator = product.category ? product.category.join(' ') : "";
    
            // Combina os filtros
            const matchesQuery = !lowerCaseQuery || productName.includes(lowerCaseQuery) || productCategory.includes(lowerCaseQuery);
            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.some(category =>
                    product.category.includes(category)
                );
            const matchesPrice = (!minPrice || productPrice >= minPrice) && (!maxPrice || productPrice <= maxPrice);
            const matchesFabricator = selectedFabricators.length === 0 ||
                selectedFabricators.some(fabricator => productFabricator.includes(fabricator));
    
            return matchesQuery && matchesCategory && matchesPrice && matchesFabricator;
        });
    
        // Atualiza os resultados
        setResults(filteredProducts);
    
        // Atualiza a URL com a nova categoria selecionada
        const categoryParam = selectedCategories.length > 0 ? selectedCategories.join(',') : '';
        const searchParams = new URLSearchParams();
        if (categoryParam) {
            searchParams.set('category', categoryParam);  // Substitui a categoria
        }
        if (minPrice) {
            searchParams.set('minPrice', minPrice);
        }
        if (maxPrice) {
            searchParams.set('maxPrice', maxPrice);
        }
    
        // Atualiza a URL apenas quando clicar em Filtrar
        navigate(`/search?${searchParams.toString()}`);
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
                                    step="0.10" // Incrementos de 0,10
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
                        <input type="checkbox" name="Teclados" id="Teclados" className={styles.inputCategory} 
                        checked={selectedCategories.includes('Teclados')}
                        onChange={() => toggleCategory('Teclados')} />
                        <label htmlFor="Teclados">Teclados</label>
                    </div>
                </div>

                <button onClick={(e) => { e.preventDefault(); applyFilters(); }} className={styles.filterBtn}>Filtrar</button>
            </form>

            <div className={styles.CardsContainer}>
                {/*<h1 className={styles.searchText}>Resultados de pesquisa para: {query}</h1>*/}
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

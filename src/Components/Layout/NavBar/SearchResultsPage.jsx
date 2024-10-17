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
    const location = useLocation();//Obtém informações da URL, incluindo parâmetros de busca.
    const { selectedCategories, setSelectedCategories,selectedFabricators,setSelectedFabricators , setErrorMessage} = useContext(Context)
    const query = new URLSearchParams(location.search).get('q');//Armazena o termo de busca (q) da URL.
    const [results, setResults] = useState([]);//Lista de produtos filtrados que será exibida.
    const [inputPrice,setInputPrice] = useState(true)//Alterna entre entrada de preço manual e slider.
    const [maxPrice, setMaxPrice] = useState(0); // Estado para o valor máximo do slider
    const [minPrice, setMinPrice] = useState(""); // Estado para o valor mínimo

    useEffect(() => {
        if (query) {//Se query for null, undefined ou uma string vazia, o código não faz nada.
            const lowerCaseQuery = query.toLowerCase();//Cria uma versão do termo de busca em minúsculas, usando toLowerCase().
            const allProducts = [...phones, ...notebooks, ...derivados];//Combina todos os produtos em uma lista

            const filteredProducts = allProducts.filter(product => {
                // Utiliza o método filter para criar uma nova lista contendo apenas os produtos que atendem ao critério de busca.
                const productName = product.name.toLowerCase();//  Converte o nome do produto (product.name) para minúsculas.
                const productCategory = Array.isArray(product.category)
                    ? product.category.join(' ').toLowerCase()
                    : (product.category ? product.category.toLowerCase() : "");
                    //Processa a categoria do produto, transformando-a em uma string única e em minúsculas, caso seja necessário.

                    /*Array.isArray(product.category): Verifica se a categoria é um array. Se for:
                    product.category.join(' '): Converte o array de categorias em uma string única, separada por espaços, para facilitar a busca. /  Se category for uma string (não um array), ela é convertida para minúsculas. */

                return (
                    (productName.includes(lowerCaseQuery) || productCategory.includes(lowerCaseQuery))
                    //productName.includes(lowerCaseQuery): O nome do produto contém o termo de busca. Se sim, o produto é incluído no resultado filtrado.
                    //productCategory.includes(lowerCaseQuery): Se o nome não coincidir, verifica-se se a categoria do produto contém o termo de busca.
                );
            });
            setResults(filteredProducts);
            //Atualiza o estado results com os produtos que atendem ao termo de busca.
            //Após o filtro, filteredProducts contém apenas os produtos cujo nome ou categoria incluem o termo de busca fornecido.
        }
    }, [query, maxPrice]);

    const toggleCategory = (category) => {
        //Aqui estamos criando uma função chamada toggleCategory. Essa função vai receber um parâmetro chamado category, que representa a categoria que o usuário quer selecionar ou desmarcar.
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)//Este pedaço verifica se a categoria que o usuário clicou já está na lista de categorias selecionadas.
                ? prevCategories.filter(item => item !== category) // Se a categoria já estiver na lista (prevCategories), então a função filter é usada para criar uma nova lista que não inclui essa categoria. Ou seja, estamos removendo a categoria que o usuário clicou.
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

    const handleFabricatorItems = () => {
        const fabricatorMap = {
            Celulares: ['Samsung', 'Apple', 'Xiaomi'],
            Notebooks: ['Dell', 'HP', 'Lenovo'],
            Mouse: ['Logitech', 'Razer', 'Microsoft'],
            Teclados: ['Corsair', 'HyperX', 'Razer']
        };
    
        const toggleFabricator = (fabricator) => {
            setSelectedFabricators(prevFabricators =>
                prevFabricators.includes(fabricator)
                    ? prevFabricators.filter(item => item !== fabricator)
                    : [...prevFabricators, fabricator]
            );
        };
    
        const selectedFabricatorItems = selectedCategories.flatMap(category => fabricatorMap[category] || []);
        return selectedFabricatorItems.length > 0 ? (
            selectedFabricatorItems.map(fabricator => (
                <div key={fabricator} className={styles.fabricatorInput}>
                    <input
                        type="checkbox"
                        id={fabricator}
                        className={styles.inputFabricator}
                        checked={selectedFabricators.includes(fabricator)}
                        onChange={() => toggleFabricator(fabricator)}
                    />
                    <label htmlFor={fabricator}>{fabricator}</label>
                </div>
            ))
        ) : (
            <p> </p>
        );
    };

    const applyFilters = () => {
        const lowerCaseQuery = query ? query.toLowerCase() : "";
        const allProducts = [...phones, ...notebooks, ...derivados];
    
        const filteredProducts = allProducts.filter(product => {
            const productName = product.name.toLowerCase();
            const productCategory = Array.isArray(product.category)
                ? product.category.join(' ').toLowerCase()
                : (product.category ? product.category.toLowerCase() : "");
            const productPrice = product.price;
            const productFabricator = product.category ? product.category.join(' ') : "";
    
            const matchesQuery = productName.includes(lowerCaseQuery) || productCategory.includes(lowerCaseQuery);
            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.some(category =>
                    product.category.includes(category) ||
                    (category === 'Mouse' && product.category.includes('Derivados')) ||
                    (category === 'Teclados' && product.category.includes('Derivados'))
                );
            const matchesPrice = (!minPrice || productPrice >= minPrice) && (!maxPrice || productPrice <= maxPrice);
            const matchesFabricator = selectedFabricators.length === 0 ||
                selectedFabricators.some(fabricator => productFabricator.includes(fabricator));
    
            return matchesQuery && matchesCategory && matchesPrice && matchesFabricator;
        });
    
        setResults(filteredProducts);
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
                <div className={styles.fabricatorWrapper}>
                <p className={styles.filterSubTitle}>Fabricante</p>
                {handleFabricatorItems()}
                </div>
                <button onClick={(e) => { e.preventDefault(); applyFilters(); }} className={styles.filterBtn}>Filtrar</button>
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

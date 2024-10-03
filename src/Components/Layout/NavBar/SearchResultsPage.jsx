import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import styles from '../../../productsList/ProductList.module.css'
import derivados from '../../../productsList/Derivados';
import formatCurrency from '../../patterns/FormatCurrency';
import Navbar from './Navbar';
import ProductCard from '../../Pages/Products/Cards/ProductCard';

export default function SearchResultsPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const lowerCaseQuery = query.toLowerCase();//Transformamos o termo de busca (query) em letras minúsculas 
            const allProducts = [...phones, ...notebooks, ...derivados];//Criamos uma lista única contendo todos os produtos 

            //O código começa a filtrar todos os produtos:
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

    // Função para adicionar a classe notebookImg se a categoria for Notebook
    const getProductImgClass = (product) => {
        if (Array.isArray(product.category)) {
            // Verifica se o array de categorias inclui "Notebook"
            if (product.category.some(category => category.toLowerCase() === 'notebook')) {
                return styles.notebookImg;
            }
            // some: Procuramos na lista se uma das categorias é "Notebook". Se for, a função retorna a classe notebookImg.
        }
        return ''; // Retorna vazio se não for da categoria Notebook
    };


    return (
        <section>
        

            <div className={styles.CardsContainer}>
                <h1 className={styles.searchText}>Resultados de pesquisa para: {query}</h1>
                <div className={styles.ProductsCards}>
                    {results.length > 0 ? (
                        results.map(product => (
                            <ProductCard key={product.id} data={product} />
                        ))
                    ) : (
                        <p>Nenhum resultado encontrado.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

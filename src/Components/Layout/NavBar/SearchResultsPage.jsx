import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import phones from '../../../productsList/Phones';
import notebooks from '../../../productsList/Notebooks';
import derivados from '../../../productsList/Derivados';

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
        <div>
            <h1>Resultados de pesquisa para: {query}</h1>
            {results.length > 0 ? (
                <div>
                    {results.map(product => (
                        <div key={product.id}>
                            <h2>{product.name}</h2>
                            <img src={product.image} alt={product.name} />
                            <p>{product.description}</p>
                            <p>R$ {product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum resultado encontrado.</p>
            )}
        </div>
    );
}

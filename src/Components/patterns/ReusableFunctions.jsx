import styles from '../../productsList/ProductList.module.css'
// Função para adicionar a classe notebookImg se a categoria for Notebook
const getProductImgClass = (product) => {
    if (Array.isArray(product.category)) {
        // Verifica se o array de categorias inclui "Notebook"
        if (product.category.some(category => category.toLowerCase() === 'notebook')) {
          return styles.notebookImg;
        } 
        // Verifica se o array de categorias inclui "Acessorios"
        else if (product.category.some(category => category.toLowerCase() === 'acessorios')) {
          return styles.accessoryImg;
        }
      }
    
    return''
};



export default getProductImgClass
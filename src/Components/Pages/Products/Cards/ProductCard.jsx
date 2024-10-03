import propTypes from 'prop-types';
import formatCurrency from '../../../patterns/FormatCurrency';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCartPlusFill } from 'react-icons/bs';
import Context from '../../../../Context/Context';
import styles from './ProductCard.module.css';

export default function ProductCard({ data }) {
    const { name, price, image } = data;
    const { setSelectedProduct, addToCart } = useContext(Context); // Pegando a função addToCart
    const navigate = useNavigate();

    const handleCardClick = () => {
        setSelectedProduct(data);
        navigate('/ProductPage');
    };

    // Função para adicionar o produto ao carrinho
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Evita que o clique no botão navegue para a página do produto
        addToCart(data); 
    };

    return (
        <div className={styles.cardProduct} onClick={handleCardClick}>
            <img src={image} alt={name} className={styles.productImage} />
            <button className={styles.addCart_btn}>
                <BsFillCartPlusFill 
                    className={styles.addCart_icon}
                    onClick={handleAddToCart} 
                />
            </button>

            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{name}</h2>
                <h2 className={styles.productPrice}>{formatCurrency(price, 'BRL')} </h2>
                {/* */} 
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    data: propTypes.shape({
        id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
        name: propTypes.string.isRequired,
        price: propTypes.number.isRequired,
        image: propTypes.string.isRequired,
        category: propTypes.string.isRequired,
    }).isRequired,
};

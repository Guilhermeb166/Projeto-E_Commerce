import propTypes from 'prop-types';
import formatCurrency from '../../../patterns/FormatCurrency';
import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCartPlusFill } from 'react-icons/bs';
import Context from '../../../../Context/Context';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import styles from './ProductCard.module.css';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProductCard({ data,imgClass }) {
    const { name, price, image } = data;
    const { setSelectedProduct, addToCart } = useContext(Context); // Pegando a função addToCart
    const [showSnackbar, setShowSnackbar] = useState(false);
    const {showCartBtn} = useContext(Context)
    const navigate = useNavigate();

    function GrowTransition(props) {
        return <Grow {...props} />;
      }

    const handleCardClick = () => {
        setSelectedProduct(data)
        console.log('Produto selecionado:', data); // Verifica se o produto está correto
        localStorage.setItem('selectedProduct', JSON.stringify(data));
        navigate('/ProductPage');
    };

    // Função para adicionar o produto ao carrinho
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Evita que o clique no botão navegue para a página do produto
        setShowSnackbar(true);// Mostrar Snackbar ao adicionar ao carrinho
        addToCart(data); 
    };

    const handleCartBtn=()=>{
        showCartBtn()
    }

    const handleCloseSnackbar = (event, reason) => {
        // Impede que o clique no "X" redirecione para a página do produto
        if (reason === 'clickaway') {
            return; // Não fecha se for um clique fora
        }
        setShowSnackbar(false); // Fecha o Snackbar
        setTimeout(() => setShowSnackbar(false), 0); // Garante que o Snackbar é fechado e o foco é liberado
    };
    return (
        <div className={styles.cardProduct} onClick={handleCardClick}>
            {/* Snackbar Component */}
            {showSnackbar && (
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    TransitionComponent={GrowTransition}
                    disableWindowBlurListener // Desabilita o foco do Snackbar para não interferir com o menu lateral
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity="success"
                        onClick={(event) => event.stopPropagation()}
                    >
                        Produto adicionado ao carrinho!
                    </Alert>
                </Snackbar>
            )}
            <div className={styles.productImgWrapper}>
                <img src={image} alt={name} className={imgClass} />
            </div>
            <button className={styles.addCart_btnIcon}>
                <BsFillCartPlusFill 
                    className={styles.addCart_icon}
                    onClick={handleAddToCart} 
                />
            </button>

            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{name}</h2>
                <h2 className={styles.productPrice}>{formatCurrency(price, 'BRL')} </h2>
                <button className={`${styles.addCartBtn} ${handleCartBtn ? styles.showBtn : ''}`} onClick={handleAddToCart}>Adicionar ao carrinho</button>
            </div>

            
        </div>
    );
}

ProductCard.propTypes = {
    data: propTypes.shape({
        id: propTypes.any.isRequired,
        name: propTypes.any.isRequired,
        price: propTypes.any.isRequired,
        image: propTypes.any.isRequired,
        category: propTypes.any.isRequired,
    }).isRequired,
};

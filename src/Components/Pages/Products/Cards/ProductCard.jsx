import propTypes from 'prop-types'
import formatCurrency from '../../../patterns/FormatCurrency'
import { BsFillCartPlusFill } from 'react-icons/bs'
import styles from './ProductCard.module.css'
export default function ProductCard({ data }) {
    const { name, price, image } = data
    return (
        <div className={styles.cardProduct}>

            <img src={image} alt={name} className={styles.productImage} />
            <button className={styles.addCart_btn}><BsFillCartPlusFill className={styles.addCart_icon}/></button>

            <div className={styles.productInfo}>
                <h2 className={styles.productName}>{name}</h2>
                <h2 className={styles.productPrice}>{formatCurrency(price, 'BRL')}</h2>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    data: propTypes.shape({}),
}.isRequired
//Define propTypes para o componente, especificando que data deve ser um objeto.
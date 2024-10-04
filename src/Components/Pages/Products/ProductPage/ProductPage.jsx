import styles from './ProductPage.module.css'
import Context from '../../../../Context/Context'
import { useContext } from 'react'
import formatCurrency from '../../../patterns/FormatCurrency'
import { BsFillCartPlusFill } from 'react-icons/bs'

export default function ProductPage() {
    const { selectedProduct } = useContext(Context)

    if (!selectedProduct) {
        return <div>Produto não encontrado!</div>
    }

    const { name, price, image, description } = selectedProduct
    return (
        <main className={styles.productPage}>
            <div className={styles.productPageContainer}>
                <div className={styles.productLeft}>
                    <img src={image} alt={name} className={styles.productImage} />
                </div>
                <div className={styles.productRight}>
                    <h1 className={styles.productName}>{name}</h1>
                    <p className={styles.productDescription}>{description}</p>
                    <p className={styles.productPrice}>{formatCurrency(price, 'BRL')}</p>

                    <div>
                       <button>Comprar</button>
                       <BsFillCartPlusFill/>
                    </div>
                </div>
            </div>
        </main>
    )
}

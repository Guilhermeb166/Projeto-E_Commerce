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

    const { name, price, image, description,sales } = selectedProduct
    return (
        <main className={styles.productPage}>
            <div className={styles.productPageContainer}>
                <div className={styles.productLeft}>
                    <div className={styles.imgList}>
                        <div className={styles.imgItem}></div>
                        <div className={styles.imgItem}></div>
                        <div className={styles.imgItem}></div>
                    </div>
                    <div className={styles.productImgWrapper}>
                        <img src={image} alt={name} className={styles.productImage} />
                    </div>
                </div>
                <div className={styles.productRight}>
                    <h1 className={styles.productName}>{name}</h1>
                    <p>Vendas: {sales}+</p>
                    <p className={styles.productDescription}>{description}</p>
                    <p className={styles.productPrice}>{formatCurrency(price, 'BRL')}</p>

                    <div className={styles.paymentWrapper}>
                        <button className={styles.buyBtn}>Comprar</button>
                        <BsFillCartPlusFill className={styles.addCartIcon} />
                    </div>
                </div>
            </div>
        </main>
    )
}

import { useContext } from 'react'
import formatCurrency from '../../../patterns/FormatCurrency'
import styles from './Cart.module.css'
import Context from '../../../../Context/Context'
import { useNavigate } from 'react-router-dom'
import { TiDelete } from 'react-icons/ti'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart } = useContext(Context);

  return (
    <div className={styles.cartContainer}>
      <h1>Seu Carrinho</h1>
      {Array.isArray(cart) && cart.length === 0 ? (
        navigate('/')
      ) : (
        <div className={styles.cartWrapper}>
          {cart.map((product) => (
            <div key={product.id} className={styles.cartItem}>
              <img src={product.image} alt={product.name} style={{ width: '100px' }} className={styles.cartImg}/>
              <h2 className={styles.cartName}>{product.name}</h2>
              <p className={styles.cartPrice}>{formatCurrency(product.price, 'BRL')}</p>
              <p className={styles.cartAmount}>Quantidade: {product.quantity}</p>
              <button onClick={() => removeFromCart(product.id)} className={styles.cartRemove}><TiDelete/></button>
            </div>
          ))}
          <div className={styles.cartResume}>
            <h1>Resumo do Carrinho</h1>
          </div>
        </div>
      )}
    </div>
  )
}
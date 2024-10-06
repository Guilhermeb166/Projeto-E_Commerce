import { useContext } from 'react'
import formatCurrency from '../../../patterns/FormatCurrency'
import styles from './Cart.module.css'
import Context from '../../../../Context/Context'
import { useNavigate } from 'react-router-dom'
import { TiDelete } from 'react-icons/ti'
import { FaCaretSquareLeft, FaCaretSquareRight } from 'react-icons/fa'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateCart } = useContext(Context);

  const totalPrice = () => {
    return cart.reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
  }

  const moreQuantity = (product) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(updatedCart); // Chama a função do contexto
  };

  const lessQuantity = (product) => {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCart(updatedCart); // Chama a função do contexto
  };
  const cartImgClass = (product) => {
    if (Array.isArray(product.category)) {
        // Verifica se o array de categorias inclui "Notebook"
        if (product.category.some(category => category.toLowerCase() === 'notebook')) {
          return styles.notebookCartImg;
        } 
        // Verifica se o array de categorias inclui "Acessorios"
        else if (product.category.some(category => category.toLowerCase() === 'acessorios')) {
          return styles.accessoryCartImg;
        }
        else if(product.category.some(category => category.toLowerCase() === 'smartphone')){
          return styles.smartphoneCartImg
        }
      }
    
    return''
};

  return (
    <main className={styles.cartContainer}>
      <h1 className={styles.pageTitle}>Carrinho de Compras</h1>
      {Array.isArray(cart) && cart.length === 0 ? (
        navigate('/')
      ) : (
        <div className={styles.cartWrapper}>
          <table className={styles.tableContainer}>
            <thead>
              <tr className={styles.tableTitles}>
                <th></th>
                <th className={styles.tableTitle}>Produto</th>
                <th className={styles.tableTitle}>Preço</th>
                <th className={styles.tableTitle}>Quantidade</th>
                <th className={styles.tableTitle}>Subtotal</th>
              </tr>
            </thead>
            <tbody className={styles.cartItemContainer}>
              {cart.map((product) => (
                <tr className={styles.cartItem} key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} className={`${styles.productImg} ${cartImgClass(product)}`} />
                  </td>
                  <td>
                    <h2 className={styles.cartName}>{product.name}</h2>
                  </td>
                  <td>
                    <p className={styles.cartPrice}>{formatCurrency(product.price, 'BRL')}</p>
                  </td>
                  <td>
                    <div className={styles.amount}>
                      <FaCaretSquareLeft className={styles.amountBtn} onClick={() => lessQuantity(product)} />
                      <p className={styles.cartAmount}>{product.quantity}</p>
                      <FaCaretSquareRight className={styles.amountBtn} onClick={() => moreQuantity(product)} />
                    </div>
                  </td>
                  <td>
                    <div className={styles.subTotal}>
                      <p className={styles.cartSubTotal}>{formatCurrency(product.price * product.quantity, 'BRL')}</p>
                    </div>
                  </td>
                  <td>
                    <button onClick={() => removeFromCart(product.id)} className={styles.cartRemove}><TiDelete className={styles.removeIcon} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.cartResume}>
            <h1 className={styles.cartResumeTitle}>Resumo do Carrinho</h1>
            <p className={styles.totalPrice}>Total: {formatCurrency(totalPrice(), 'BRL')}</p>
            <button className={styles.paymentBtn}>Forma de Pagamento</button>
          </div>
        </div>
      )}
    </main>
  )
}
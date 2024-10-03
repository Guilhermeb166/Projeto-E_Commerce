import {useContext} from 'react'
import formatCurrency from '../../../patterns/FormatCurrency'
import Context from '../../../../Context/Context'

export default function Cart () {
    const {cart, removeFromCart } = useContext(Context);
    return (
        <div>
        <h1>Seu Carrinho</h1>
        {Array.isArray(cart) &&cart.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                <h2>{product.name}</h2>
                <p>{formatCurrency(product.price, 'BRL')}</p>
                <p>Quantidade: {product.quantity}</p> 
                <button onClick={() => removeFromCart(product.id)}>Remover</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
}
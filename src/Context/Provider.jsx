import Context from "./Context";
import propTypes from 'prop-types';
import { useState, useEffect } from "react";

export default function Provider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sincronizar o carrinho com o localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Função para adicionar produtos ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item.id === product.id);
      if (productExists) {
        return prevCart.map((item)=>
            item.id === product.id
                ? {...item, quantity: item.quantity + 1}
                : item
        )     
    }
      return [...prevCart,{...product, quantity: 1}];
    });
  };

  // Função para remover produtos do carrinho
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Prover os valores no contexto
  const value = {
    selectedProduct,
    setSelectedProduct,
    cart,
    addToCart,
    removeFromCart
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.any.isRequired
};

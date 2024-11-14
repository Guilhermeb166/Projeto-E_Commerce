import Context from "./Context";
import propTypes from 'prop-types';
import { useState, useEffect,useCallback } from "react";

export default function Provider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [cartBtn,setCartBtn] = useState(false)
  const [selectedFabricators,setSelectedFabricators] = useState([])
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showTable,setShowTable] = useState(window.innerWidth >= 481);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

    
    // Função para calcular o total de produtos e o valor total
  // UseCallback para memorizar a função e evitar re-criação
  const calculateCartTotals = useCallback(() => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalAmount(total);
    setTotalQuantity(quantity);
  }, [cart]);

  // Sincronizar o carrinho com o localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateCartTotals();
  }, [cart, calculateCartTotals]);

  // Função para adicionar produtos ao carrinho
  const addToCart = (product) => {
    if (!product) return; // Não faça nada se o produto for indefinido

    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item.id === product.id);
      if (productExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Função para remover produtos do carrinho
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

   // Função para atualizar o carrinho com um novo estado
   const updateCart = (newCart) => {
    setCart(newCart);
  };


  // Função para controlar a exibição do botão do carrinho com base no tamanho da tela
  const showCartBtn = () => {
    if (window.innerWidth < 481) {
      setCartBtn(true);
    }else if (window.innerWidth<=835 && window.innerWidth>=481){
      setCartBtn(true);
    } else {
      setCartBtn(false);
    }
  };
   // UseEffect para monitorar mudanças no tamanho da janela
   useEffect(() => {
    // Define o estado inicial
    showCartBtn();

    // Adiciona um listener de resize
    const handleResize = () => {
      showCartBtn();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup do event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // Prover os valores no contexto
  const value = {
    selectedProduct,
    setSelectedProduct,
    cart,
    addToCart,
    removeFromCart,
    updateCart,
    showCartBtn,
    cartBtn,
    setCartBtn,
    showTable,
    setShowTable,
    selectedCategories, setSelectedCategories,
    errorMessage, setErrorMessage,
    selectedFabricators,setSelectedFabricators,
    totalAmount,     // valor total do carrinho
    totalQuantity,   // quantidade total de produtos no carrinho
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

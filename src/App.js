import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Pages/Home/Home";
import Provider from "./Context/Provider";
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import ProductListPage from './productsList/ProductsList'
import SearchResultsPage from "./Components/Layout/NavBar/SearchResultsPage";
import Footer from "./Components/Layout/Footer/Footer";
import Login from "./Components/Pages/Login/Login";
import BestSellersPage from "./Components/Pages/bestSellers/bestSellers";
import ProductPage from "./Components/Pages/Products/ProductPage/ProductPage";
import Cart from "./Components/Pages/Products/Cart/Cart";

function App() {
  return (
    <Provider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<ProductListPage/>}/>
          <Route path="/search" element={<SearchResultsPage/>}/>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/best-sellers" element={<BestSellersPage/>}/>
          <Route path="/productPage" element={<ProductPage/>}/>
          <Route path="/cart" element={<Cart />}/>
        </Routes>
       <Footer/>
      </Router> 
    </Provider>
      
    
  );
}

export default App;

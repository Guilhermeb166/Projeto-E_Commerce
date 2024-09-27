import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Pages/Home/Home";
import Provider from "./Context/Provider";
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import ProductListPage from './productsList/ProductsList'
import SearchResultsPage from "./Components/Layout/NavBar/SearchResultsPage";
import Footer from "./Components/Layout/Footer/Footer";
import Login from "./Components/Pages/Login/Login";

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
          
        </Routes>
       <Footer/>
      </Router> 
    </Provider>
      
    
  );
}

export default App;

import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Pages/Home/Home";
import Provider from "./Context/Provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResultsPage from "./Components/Layout/NavBar/SearchResultsPage";
import Footer from "./Components/Layout/Footer/Footer";
import Login from "./Components/Pages/Login/Login";
import BestSellersPage from "./Components/Pages/bestSellers/bestSellers";
import ProductPage from "./Components/Pages/Products/ProductPage/ProductPage";
import Cart from "./Components/Pages/Products/Cart/Cart";
import Contact from "./Components/Pages/Contact/Contact";
import Payment from "./Components/Pages/Payment/Payment";

function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/best-sellers" element={<BestSellersPage />} />
          <Route path="/productPage" element={<ProductPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;

import Header from "./Components/Layout/Header/Header";
import Home from "./Components/Pages/Home/Home";
import Provider from "./Context/Provider";
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'

function App() {
  return (
    <Provider>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          
        </Routes>
      </Router>
    </Provider>
      
    
  );
}

export default App;

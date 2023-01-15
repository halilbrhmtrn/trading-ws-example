import './App.css';
import SymbolForm from './SymbolForm'
import MarketPriceListing from './MarketPriceListing'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SymbolForm/>} />
          <Route path="/market-prices" element={<MarketPriceListing/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarketPriceListing() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios.get('/prices')
      .then(res => setPrices(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Market Price Listing</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Market Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map(price => (
            <tr key={price._id}>
              <td>{price.pair}</td>
              <td>{price.marketSymbol}</td>
              <td>{price.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarketPriceListing;

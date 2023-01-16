const request = require("request");

function getSymbolPrice(symbol) {
    return new Promise((resolve, reject) => {
      const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`;
  
      request(url, {json: true}, (err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(body.price);
      });
    });
}

module.exports = {
    getSymbolPrice
}

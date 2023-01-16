const axios = require('axios');

const getPrice = async (symbol) => {
    try {
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
        const { data } = await axios.get(url);
        return data.price;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getPrice
}

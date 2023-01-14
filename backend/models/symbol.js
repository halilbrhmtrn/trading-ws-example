const mongoose = require('mongoose');
const {db1, db2} = require('../connections.js')


const symbolSchema = new mongoose.Schema({
    pair: { type: String, required: true },
    marketSymbol: { type: String, required: true },
    position: { type: String, default: null },
    price: { type: Number, default: null },
    action: { type: String, default: null }
});

module.exports = db2.model('symbol', symbolSchema);

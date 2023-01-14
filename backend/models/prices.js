const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {db1, db2} = require('../connections.js')

const pricesSchema = new Schema({
  marketSymbol: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = db1.model("Prices", pricesSchema);

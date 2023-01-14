const mongoose = require("mongoose");
const {db1, db2} = require('../connections.js')


const PositionSchema = new mongoose.Schema({
  pair: {
    type: String,
    required: true,
  },
  marketSymbol: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  entry_price: {
    type: Number,
    required: true,
  },
  exit_price: {
    type: Number,
    default: null,
  },
  qty: {
    type: Number,
    required: true,
  },
  pnl: {
    type: Number,
    default: 0,
  },
  pnl_usdt: {
    type: Number,
    default: 0,
  },
  profit: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = db1.model("position", PositionSchema);

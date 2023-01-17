
const express = require('express');
const router = express.Router();
const Symbol = require('../models/symbol');
const Position = require("../models/position");
const { getSymbolPrice } = require('../binanceAPI');

router.post('/symbol', async (req, res) => {
    try {
        const symbol = await Symbol.find({marketSymbol: req.body.marketSymbol});
        if (symbol.length) {
          res.status(404).json({ message: "Symbol is already in track." });
        }
        const price = await getSymbolPrice(req.body.marketSymbol);
        const newSymbol = new Symbol({ 
            pair: req.body.pair,
            marketSymbol: req.body.marketSymbol,
            price: price
        });
        await newSymbol.save();
        res.json(newSymbol);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/position", async (req, res) => {
  try {
    const symbol = await Symbol.findById(req.body._id);
    if (!symbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }
    const newPosition = new Position({
      pair: req.body.pair,
      marketSymbol: req.body.marketSymbol,
      symbolId: req.body._id,
      position: req.body.position,
      entry_price: req.body.entry_price,
      qty: 1,
    });
    symbol.positions.push(newPosition);
    await symbol.save();
    await newPosition.save();
    res.json(newPosition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/symbols", async (req, res) => {
  try {
    const symbols = await Symbol.find();
    res.json(symbols);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/symbols/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {action} = req.body;
    const updatedSymbol = await Symbol.findOneAndUpdate({_id: id}, {...req.body, position: action});
    await updatedSymbol.save();
    res.json(updatedSymbol);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/positions", async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/positions/:id", async (req, res) => {
  try {
    const symbol = await Symbol.findById(req.params.id);
    if (!symbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }
    for (let i = 0; i < symbol.positions.length; i++) {
      const position = await Position.findById(symbol.positions[i]);
      if (position.position === "LONG" || position.position === "SHORT") {
        res.json(position);
        return;
      } else {
        return res.status(404).json({ message: "Position is already closed!" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/positions/:id", async (req, res) => {
  try {
    const symbol = await Symbol.findById(req.params.id);
    if (!symbol) {
      return res.status(404).json({ message: "Symbol not found" });
    }
    for (let i = 0; i < symbol.positions.length; i++) {
      const position = await Position.findById(symbol.positions[i]);
      if (position.position === "LONG" || position.position === "SHORT") {
        position.exit_price = req.body.exit_price;
        position.profit = req.body.profit;
        position.pnl = req.body.pnl_percent;
        position.pnl_usdt = req.body.pnl_usdt;
        position.position = req.body.position;

        await position.save();
        await symbol.save();
        res.json(position);
        return;
      }
    }
    res.status(404).json({ message: "Position not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

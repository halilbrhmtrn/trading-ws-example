
const express = require('express');
const router = express.Router();
const Symbol = require('../models/symbol');
const Position = require("../models/position");
const Prices = require("../models/prices");
const { getSymbolPrice } = require('../binanceAPI');




router.post('/symbol', async (req, res) => {
    try {
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
  const newPosition = new Position({
    pair: req.body.pair,
    marketSymbol: req.body.marketSymbol,
    position: req.body.position,
    entry_price: req.body.entry_price,
    qty: 1,
  });

  try {
    await newPosition.save();
    res.json(newPosition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all symbols
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

// Get all positions
router.get("/positions", async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/positions/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const updatedPosition = await Symbol.findOneAndUpdate({_id: id}, {...req.body});
    await updatedPosition.save();
    res.json(updatedPosition);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/prices", async (req, res) => {
  try {
    const prices = await Prices.find();
    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

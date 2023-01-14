
const express = require('express');
const router = express.Router();
const Symbol = require('../models/symbol');
const Position = require("../models/position");


router.post('/addsymbol', async (req, res) => {
    try {
        const newSymbol = new Symbol({ 
            pair: req.body.pair,
            marketSymbol: req.body.marketSymbol
        });
        await newSymbol.save();
        res.json({ message: 'Symbol added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/addposition", async (req, res) => {
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

// Get all positions
router.get("/positions", async (req, res) => {
  try {
    const positions = await Position.find();
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

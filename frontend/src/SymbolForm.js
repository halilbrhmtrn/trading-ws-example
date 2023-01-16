import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SymbolListing from './SymbolListing';

const SymbolForm = () => {
  const [formData, setFormData] = useState({
    pair: '',
    marketSymbol: '',
    action: '',
    position: '',
    price: null,
    _id: ''
  });

  const [symbols, setSymbols] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/symbol', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({
          pair: '', marketSymbol: '',
          action: '',
          position: '',
          price: null,
          _id: ''
        });
        fetchSymbols();
        alert('Symbol added successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleLong = async (symbol) => {
    try {
      await axios.put(`/symbols/${symbol._id}`, { ...symbol, action: 'LONG' });
      const newPosition = {
        pair: symbol.pair,
        marketSymbol: symbol.marketSymbol,
        position: 'LONG',
        entry_price: symbol.price,
        qty: 1,
        createdAt: Date.now()
    }
    await axios.post('/position', newPosition);
    fetchSymbols();
    } catch (err) {
      console.error(err);
    }
  }

  const handleShort = async (symbol) => {
    try {
      await axios.put(`/symbols/${symbol._id}`, { ...symbol, action: 'SHORT' });
      const newPosition = {
        pair: symbol.pair,
        marketSymbol: symbol.marketSymbol,
        position: 'SHORT',
        entry_price: symbol.price,
        qty: 1,
        createdAt: Date.now()
    }
    await axios.post('/position', newPosition);
      fetchSymbols();
    } catch (err) {
      console.error(err);
    }
  }

  const handleClose = async (symbol) => {
    try {
      await axios.put(`/symbols/${symbol._id}`, { action: 'CLOSED' });
      const updatedPosition = {
        exit_price: symbol.price,
        closedAt: Date.now()
    }
    await axios.put(`/positions/${symbol._id}`, updatedPosition);
      fetchSymbols();
    } catch (err) {
      console.error(err);
    }
  }

  const fetchSymbols = async () => {
    try {
      const res = await axios.get('/symbols');
      setSymbols(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchSymbols();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center">
      <form onSubmit={handleSubmit} className="col-md-3">
        <div className="form-group">
          <label>Pair</label>
          <input type="text" className="form-control" name="pair" value={formData.pair} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Market Symbol</label>
          <input type="text" className="form-control" name="marketSymbol" value={formData.marketSymbol} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>

      <div className="col-md-9 mt-4">
        {<SymbolListing handleClose={handleClose} handleLong={handleLong} handleShort={handleShort} symbols={symbols} />}
      </div>
    </div>
  );
}

export default SymbolForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SymbolListing from './SymbolListing';

const SymbolForm = () => {
  const [formData, setFormData] = useState({
    pair: '',
    marketSymbol: ''
  });

  const [symbols, setSymbols] = useState([]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/addsymbol', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormData({ pair: '', marketSymbol: '' });
        fetchSymbols();
        alert('Symbol added successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleLong = async (id) => {
    try {
      await axios.put(`/api/symbols/${id}`, { action: 'LONG' });
      fetchSymbols();
    } catch (err) {
      console.error(err);
    }
  }

  const handleShort = async (id) => {
    try {
      await axios.put(`/symbols/${id}`, { action: 'SHORT' });
      fetchSymbols();
    } catch (err) {
      console.error(err);
    }
  }

  const handleClose = async (id) => {
    try {
      await axios.put(`/symbols/${id}`, { action: 'CLOSED' });
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
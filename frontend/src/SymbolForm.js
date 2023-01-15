import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PositionListing from './PositionListing';

const SymbolForm = () => {
  const [formData, setFormData] = useState({
    pair: '',
    marketSymbol: ''
  });

  const [positions, setPositions] = useState([]);
  const [showPositions, setShowPositions] = useState(false);


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
        fetchPositions();
        alert('Symbol added successfully');
        setShowPositions(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = async (id) => {
    try {
        await axios.put(`/positions/${id}`, { action: 'CLOSED' });
        fetchPositions();
    } catch (err) {
        console.error(err);
    }
  }

  const fetchPositions = async () => {
    try {
        const res = await axios.get('/positions');
        setPositions(res.data);
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(() => {
    fetchPositions();
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
        {showPositions ? <PositionListing handleClose={handleClose} positions={positions} /> : null}
        </div>
    </div>  
);
}

export default SymbolForm;
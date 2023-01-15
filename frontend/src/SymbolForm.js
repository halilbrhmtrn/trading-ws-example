import React, { useState } from 'react';

const SymbolForm = () => {
  const [formData, setFormData] = useState({
    pair: '',
    marketSymbol: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //make a post request to the backend to add the symbol to the database
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
        //clear the form and show a success message
        setFormData({ pair: '', marketSymbol: '' });
        alert('Symbol added successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
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
    </div>  
  );
};

export default SymbolForm;

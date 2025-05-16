// AddOffering.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddOffering = () => {
  const [newOffering, setNewOffering] = useState('');

  const handleChange = (e) => {
    setNewOffering(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/offerings', { name: newOffering });
      alert('Offering added successfully!');
      setNewOffering('');
    } catch (error) {
      console.error('Error adding offering:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Offering</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Offering Name"
            value={newOffering}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Offering
        </button>
      </form>
    </div>
  );
};

export default AddOffering;

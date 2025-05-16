import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/customer-queries');
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching customer queries:', error);
      }
    };
    fetchQueries();
  }, []);

  const handleResolveQuery = async (queryId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/resolve-query/${queryId}`);
      setQueries(queries.filter(query => query._id !== queryId)); // Remove resolved query
    } catch (error) {
      console.error('Error resolving query:', error);
    }
  };

  return (
    <div className="customer-queries">
      <h1>Customer Queries</h1>
      <ul>
        {queries.map((query) => (
          <li key={query._id}>
            {query.message}
            <br/>
            {query.name}
            <br />
            {query.email}
            <button onClick={() => handleResolveQuery(query._id)}>Resolve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerQueries;

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/categories">View Categories</Link></li>
          <li><Link to="/products">View Products</Link></li>
          <li><Link to="/customer-queries">View Customer Queries</Link></li>
          <li><Link to="/collab-queries">View Collaboration Queries</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

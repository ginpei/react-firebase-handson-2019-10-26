import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="HomePage">
      <h1>Home</h1>
      <Link to="/about">About</Link>
    </div>
  );
};

export default HomePage;

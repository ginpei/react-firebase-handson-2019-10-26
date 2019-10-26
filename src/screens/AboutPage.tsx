import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="AboutPage">
      <Link to="/">Home</Link>
      <h1>About</h1>
      <p>Lorem ipsum ...</p>
    </div>
  );
}

export default AboutPage;

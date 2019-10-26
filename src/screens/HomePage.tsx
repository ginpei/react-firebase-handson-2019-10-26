import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const firestore = firebase.firestore();
    const doc = firestore.collection('items').doc('S3GcZi61hk8XrzGjvkch');
    return doc.onSnapshot({
      next(ss) {
        const data = ss.data() || {};
        setMessage(data.message);
      },
    });
  }, []);

  const onUpdateClick = async () => {
    const newMessage = window.prompt('New message?', message);
    if (!newMessage) {
      return;
    }

    const firestore = firebase.firestore();
    const doc = firestore.collection('items').doc('S3GcZi61hk8XrzGjvkch');
    const data = { message: newMessage };
    await doc.set(data);
  };

  return (
    <div className="HomePage">
      <h1>Home</h1>
      <Link to="/about">About</Link>
      <p>
        {'Message: '}
        {message}
      </p>
      <button onClick={onUpdateClick}>Update</button>
    </div>
  );
};

export default HomePage;

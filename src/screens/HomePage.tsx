import NiceMarkdown from '@ginpei/react-nice-markdown';
import firebase from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../basics/DefaultLayout';

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
    <DefaultLayout className="HomePage">
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/notes">Note list</Link>
        </li>
      </ul>
      <p>
        {'Message: '}
        {message}
      </p>
      <button onClick={onUpdateClick}>Update</button>
      <NiceMarkdown content={`
# Hello Markdown World!

## Usage

1. Import

\`\`\`js
import NiceMarkdown from '@ginpei/react-nice-markdown';
\`\`\`

2. Invoke as a component

\`\`\`js
<NiceMarkdown content={\`# Hello Markdown World!\`} />
\`\`\`
`} />
    </DefaultLayout>
  );
};

export default HomePage;

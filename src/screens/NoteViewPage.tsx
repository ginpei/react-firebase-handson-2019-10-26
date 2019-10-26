import NiceMarkdown from '@ginpei/react-nice-markdown';
import firebase from 'firebase/app';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import DefaultLayout from '../basics/DefaultLayout';
import { useNote } from '../models/Notes';
import ErrorScreen from './ErrorScreen';
import LoadingScreen from './LoadingScreen';
import NotFoundScreen from './NotFoundScreen';

const NoteViewPage: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const noteId = props.match.params.id;

  const [note, noteReady, noteError] = useNote(firebase.firestore(), noteId);

  if (noteError) {
    return (
      <ErrorScreen error={noteError} />
    );
  }

  if (!noteReady) {
    return (
      <LoadingScreen />
    );
  }

  if (!note) {
    return (
      <NotFoundScreen />
    );
  }

  return (
    <DefaultLayout className="NoteViewPage">
      <h1>NoteViewPage</h1>
      <p>
        <Link to="/notes">List</Link>
      </p>
      <p>
        <Link to={`/notes/${note.id}/edit`}>Edit</Link>
      </p>
      <NiceMarkdown content={note.content} />
    </DefaultLayout>
  );
}

export default NoteViewPage;

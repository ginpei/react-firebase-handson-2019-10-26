import firebase from 'firebase/app';
import React from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../basics/DefaultLayout';
import { pickNoteTitle, useNoteList } from '../models/Notes';
import ErrorScreen from './ErrorScreen';
import LoadingScreen from './LoadingScreen';

const NoteListPage: React.FC = () => {
  const [notes, notesReady, notesError] = useNoteList(firebase.firestore());

  if (notesError) {
    return (
      <ErrorScreen error={notesError} />
    );
  }

  if (!notesReady) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <DefaultLayout className="NoteListPage">
      <h1>NoteListPage</h1>
      <p>
        <Link to="/notes/create">Create</Link>
      </p>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{pickNoteTitle(note)}</Link>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  );
}

export default NoteListPage;

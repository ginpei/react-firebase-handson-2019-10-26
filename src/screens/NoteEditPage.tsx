import firebase from 'firebase/app';
import React, { useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import DefaultLayout from '../basics/DefaultLayout';
import NoteForm from '../independents/NoteForm';
import { Note, useNote, saveNote } from '../models/Notes';
import ErrorScreen from './ErrorScreen';
import LoadingScreen from './LoadingScreen';
import NotFoundScreen from './NotFoundScreen';

const NoteEditPage: React.FC<RouteComponentProps<{ id: string }>> = (props) => {
  const noteId = props.match.params.id;

  const [note, noteReady, noteError] = useNote(firebase.firestore(), noteId);
  const [saveError, setSaveError] = useState<Error | null>(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (newNote: Note) => {
    setSaving(true);
    try {
      await saveNote(firebase.firestore(), newNote);

      // to avoid memory leak, wait until calling back finish before locating
      const nextPath = `/notes/${note!.id}`;
      window.setTimeout(() => props.history.push(nextPath), 1);
    } catch (error) {
      console.error(error);
      setSaveError(error);
    } finally {
      setSaving(false);
    }
  };

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
    <DefaultLayout className="NoteEditPage">
      <h1>NoteEditPage</h1>
      <p>
        <Link to={`/notes/${note.id}`}>Back</Link>
      </p>
      <NoteForm
        disabled={saving}
        error={saveError}
        note={note}
        onSubmit={onSubmit}
      />
    </DefaultLayout>
  );
}

export default NoteEditPage;

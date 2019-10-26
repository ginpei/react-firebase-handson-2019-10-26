import firebase from 'firebase/app';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import DefaultLayout from '../basics/DefaultLayout';
import NoteForm from '../independents/NoteForm';
import { Note, createNewNote } from '../models/Notes';
import { useUserId } from '../models/Users';
import { Link } from 'react-router-dom';

const NoteCreatePage: React.FC<RouteComponentProps> = (props) => {
  const emptyNote = { content: '', id: '', userId: '' };

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const [userId /*, userIdReady, userIdError */] = useUserId(firebase.auth());

  const onSubmit = async (newNote: Note) => {
    setSaving(true);
    try {
      const doc = await createNewNote(
        firebase.firestore(),
        { ...newNote, userId },
      );
      const nextPath = `/notes/${doc.id}`;
      props.history.push(nextPath);
    } catch (error) {
      console.error(error);
      setSaveError(error);
      setSaving(false);
    }
  };

  if (!userId) {
    return (
      <DefaultLayout className="NoteCreatePage">
        <h1>NoteCreatePage</h1>
        <p>
          <Link to="/">Log in to create a note</Link>
        </p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout className="NoteCreatePage">
      <h1>NoteCreatePage</h1>
      <NoteForm
        disabled={saving}
        error={saveError}
        note={emptyNote}
        onSubmit={onSubmit}
      />
    </DefaultLayout>
  );
};

export default NoteCreatePage;

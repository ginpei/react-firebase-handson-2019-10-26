import firebase from 'firebase/app';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import DefaultLayout from '../basics/DefaultLayout';
import NoteForm from '../independents/NoteForm';
import { Note } from '../models/Notes';

const NoteCreatePage: React.FC<RouteComponentProps> = (props) => {
  const emptyNote = { content: '', id: '', userId: '' };
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const onSubmit = async (newNote: Note) => {
    setSaving(true);
    try {
      const ss = await firebase.firestore().collection('notes').add(newNote);
      const nextPath = `/notes/${ss.id}`;
      props.history.push(nextPath);
    } catch (error) {
      console.error(error);
      setSaveError(error);
      setSaving(false);
    }
  };

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

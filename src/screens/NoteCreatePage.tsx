import firebase from 'firebase/app';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import DefaultLayout from '../basics/DefaultLayout';
import NoteForm from '../independents/NoteForm';
import { Note, createNewNote } from '../models/Notes';

const NoteCreatePage: React.FC<RouteComponentProps> = (props) => {
  const emptyNote = { content: '', id: '', userId: '' };

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);

  const onSubmit = async (newNote: Note) => {
    setSaving(true);
    try {
      const doc = await createNewNote(firebase.firestore(), newNote);
      const nextPath = `/notes/${doc.id}`;
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

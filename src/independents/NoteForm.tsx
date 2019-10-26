import React, { useState } from 'react';
import styled from 'styled-components';
import { Note } from '../models/Notes';

const NoteContent = styled.textarea`
  min-height: 10em;
  width: 100%;
`;

const NoteForm: React.FC<{
  disabled: boolean;
  error: Error | null;
  note: Note;
  onSubmit: (newNote: Note) => void;
}> = (props) => {
  const [note, setNote] = useState<Note>(props.note);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit(note);
  };

  const onChange = (updated: Partial<Note>) => {
    const newNote: Note = {
      ...note,
      ...updated,
    };
    setNote(newNote);
  };

  return (
    <form onSubmit={onSubmit}>
      {props.error && (
        <p>Error: {props.error.message}</p>
      )}
      <p>
        <label>
          Content:
          <br/>
          <NoteContent
            disabled={props.disabled}
            onChange={(event) => onChange({ content: event.currentTarget.value })}
            value={note.content}
          />
        </label>
      </p>
      <p>
        <button
          disabled={props.disabled}
          type="submit"
        >
          {note.id ? 'Update' : 'Create'}
        </button>
      </p>
    </form>
  );
}

export default NoteForm;

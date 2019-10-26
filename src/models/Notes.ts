import { useEffect, useState } from "react";

export type Note = {
  content: string;
  id: string;
  userId: string;
}

export function useNote(
  firestore: firebase.firestore.Firestore,
  noteId: string,
): [Note | null, boolean, Error | null] {
  const [note, setNote] = useState<Note | null>(null);
  const [noteError, setNoteError] = useState<Error | null>(null);
  const [noteReady, setNoteReady] = useState(false);

  useEffect(() => {
    const doc = getColl(firestore).doc(noteId);
    return doc.onSnapshot({
      next(ss) {
        if (ss.exists) {
          const note = ssToNote(ss);
          setNote(note);
        }
        setNoteReady(true);
      },
      error(error) {
        setNoteError(error);
        setNoteReady(true);
      }
    })
  }, [firestore, noteId]);

  return [note, noteReady, noteError];
}

export function useNoteList(
  firestore: firebase.firestore.Firestore,
): [Note[], boolean, Error | null] {
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesError, setNotesError] = useState<Error | null>(null);
  const [notesReady, setNotesReady] = useState(false);

  useEffect(() => {
    const coll = getColl(firestore);
    return coll.onSnapshot({
      next(ss) {
        const newNotes = ss.docs.map((docSs) => ssToNote(docSs));
        setNotes(newNotes);
        setNotesReady(true);
      },
      error(error) {
        setNotesError(error);
        setNotesReady(true);
      }
    })
  }, [firestore]);

  return [notes, notesReady, notesError];
}

export async function createNewNote(
  firestore: firebase.firestore.Firestore,
  note: Note,
) {
  if (note.id) {
    throw new Error('New note must not have ID');;
  }

  return await getColl(firestore).add(note);
}

export async function saveNote(
  firestore: firebase.firestore.Firestore,
  note: Note,
) {
  if (!note.id) {
    throw new Error('Existing note must have ID');;
  }

  const doc = getColl(firestore).doc(note.id);
  await doc.set(note);
}

export function pickNoteTitle(note: Note) {
  const { content } = note;

  const iEOL = content.indexOf('\n');
  const line = iEOL >= 0
    ? content.slice(0, iEOL)
    : content;

  if (line.startsWith('# ')) {
    return line.match('^#\\s+(.*)')![1];
  }

  return line || '(Untitled)';
}

function getColl(firestore: firebase.firestore.Firestore) {
  return firestore.collection('notes');
}

function ssToNote(ss: firebase.firestore.DocumentSnapshot): Note {
  const data = ss.data() || {};

  const note: Note = {
    content: data.content || '',
    id: ss.id,
    userId: data.userId || '',
  };
  return note;
}

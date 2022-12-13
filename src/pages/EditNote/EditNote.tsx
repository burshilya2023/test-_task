import { NoteForm } from "../../components/NoteForm/NoteForm";
import { useNote } from "../../components/NoteLayout";
import { NoteData, Tag } from "../../type";

import styles from "./editNote.module.scss";
type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void; //post/put API
  availableTags: Tag[];
};

export function EditNote({ onSubmit, availableTags }: EditNoteProps) {
  const note = useNote(); //current data for note
  return (
    <>
      <h1 className={styles.editNote}>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        availableTags={availableTags}
      />
    </>
  );
}

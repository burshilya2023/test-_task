import { NoteForm } from "../../components/NoteForm/NoteForm";
import { useNote } from "../../components/NoteLayout";
import { NoteData, Tag } from "../../type";

import styles from "./editNote.module.scss";
type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void; //post API
  onAddTag: (tag: Tag) => void; //the function is adding tags in the selector to be stored in localStorage and not locally in the component
  availableTags: Tag[]; //the entire array of tags for the options selector
};

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote(); //current data
  return (
    <>
      <h1 className={styles.editNote}>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        onAddTag={onAddTag}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        availableTags={availableTags}
      />
    </>
  );
}

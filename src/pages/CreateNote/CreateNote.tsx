import { FC } from "react";
import { NoteForm } from "../../components/NoteForm/NoteForm";
import { NoteData, Tag } from "../../type";
export type Item = {
  id: string;
  label: string;
};

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const CreateNote: FC<NewNoteProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps) => {
  return (
    <div>
      <h1 style={{ padding: "3rem 0" }}>create notes</h1>

      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
        // onSubmit={(data) => onSubmit(note.id, data)}
        // onAddTag={onAddTag}
        // tags={note.tags}
      />
    </div>
  );
};

export default CreateNote;

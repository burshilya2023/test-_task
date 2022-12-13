import { FC } from "react";
import { NoteForm } from "../../components/NoteForm/NoteForm";
import { NoteData, Tag } from "../../type";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  availableTags: Tag[];
};

const RawNoteData: FC<NewNoteProps> = ({
  onSubmit,
  availableTags,
}: NewNoteProps) => {
  return (
    <div>
      <h1 style={{ padding: "3rem 0" }}>create notes</h1>
      <NoteForm onSubmit={onSubmit} availableTags={availableTags} />
    </div>
  );
};

export default RawNoteData;

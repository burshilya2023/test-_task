import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NoteLayout } from "./components/NoteLayout";
import { AppNotes } from "./pages/AppNotes/AppNotes";
import CreateNote from "./pages/CreateNote/CreateNote";
import { EditNote } from "./pages/EditNote/EditNote";
import { NotePost } from "./pages/Note/NotePost";
import { NoteData, RawNote } from "./type";
import { notesAPI } from "./api/notesService";

function App() {
  const { data: notes = [], isLoading } = notesAPI.useFetchAllNotesQuery(100);
  const { data: tags = [] } = notesAPI.useFetchAllTagsQuery(100);

  const [createNoteApi, {}] = notesAPI.useCreateNoteMutation();
  const [updateNoteApi, {}] = notesAPI.useUpdateNoteMutation();

  const notesWithTags = useMemo(() => {
    return notes.map((note: RawNote) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  async function onCreateNote({ tags, ...data }: NoteData) {
    const dateAddServer = { ...data, tagIds: tags.map((tag) => tag.id) };
    await createNoteApi(dateAddServer);
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    const update = () => {
      if (id) {
        return { id, ...data, tagIds: tags.map((tag) => tag.id) };
      }
    };
    const updateResult = update();
    // @ts-ignore
    updateNoteApi(updateResult);
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <AppNotes
              isPending={isLoading}
              notes={notesWithTags}
              availableTags={tags}
            />
          }
        />
        <Route
          path="/new"
          element={<CreateNote onSubmit={onCreateNote} availableTags={tags} />}
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NotePost />} />
          <Route
            path="edit"
            element={<EditNote onSubmit={onUpdateNote} availableTags={tags} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

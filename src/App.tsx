import axios from "axios";
import { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import ApiService, { API_NOTES, API_TAGS } from "./api/MockApi";
import { NoteLayout } from "./components/NoteLayout";
import { AppNotes } from "./pages/AppNotes/AppNotes";
import CreateNote from "./pages/CreateNote/CreateNote";
import { EditNote } from "./pages/EditNote/EditNote";
import { Note } from "./pages/Note/Note";
import { NoteData, RawNote, Tag, TagCreate } from "./type";
import { useLocalStorage } from "./hooks/useLocationStore";
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useState<Tag[]>([]);

  const [isPending, setisPending] = useState(false);
  const fetchAllNotes = async () => {
    setisPending(true);
    const response = await ApiService.getAllNotes();
    setNotes(response.data);
    setisPending(false);
  };
  const fetchAllTags = async () => {
    setisPending(true);
    const response = await ApiService.getAllTags();
    setTags(response.data);
    setisPending(false);
  };

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
    axios
      .post(`${API_NOTES}`, dateAddServer)
      .then((resp) => {
        console.log("notes create", resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        fetchAllNotes();
        fetchAllTags();
      });
    //!example without API
    // setNotes((prevNotes) => {
    //   return [
    //     ...prevNotes,
    //     { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
    //   ];
    // });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    const update = () => {
      if (id) {
        return { id, ...data, tagIds: tags.map((tag) => tag.id) };
      }
    };
    const updateResult = update();
    axios
      .put(`${API_NOTES}${id}`, {
        ...updateResult,
      })
      .then((resp) => {
        console.log("notes update success", resp.data);
      })
      .catch((err) => {
        console.log(err, "error with update note");
      })
      .then(() => {
        fetchAllNotes();
      });
    // !expample without API
    // setNotes((prevNotes) => {
    //   return prevNotes.map((note) => {
    //     if (note.id === id) {
    //       return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
    //     } else {
    //       return note;
    //     }
    //   });
    // });
  }

  function onDeleteNote(id: string) {
    axios
      .delete(`${API_NOTES}${id}`)
      .then((respo) => {
        console.log(respo.data);
      })

      .then(() => {
        fetchAllNotes();
      });

    // !example without API
    // setNotes((prevNotes) => {
    //   return prevNotes.filter((note) => note.id !== id);
    // });
  }

  function addTag(tag: TagCreate) {
    axios
      .post(`${API_TAGS}`, tag)
      .then((resp) => {
        console.log("tags create success", resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        fetchAllTags();
      });

    // !example without API
    // setTags((prev) => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    axios
      .put(`${API_TAGS}${id}`, {
        label,
      })
      .then((resp) => {
        console.log("tags update success", resp.data);
      })
      .catch((err) => {
        console.log(err, "error with update tags");
      })
      .then(() => {
        fetchAllTags();
      });

    // !example without API
    // setTags((prevTags) => {
    //   return prevTags.map((tag) => {
    //     if (tag.id === id) {
    //       return { ...tag, label };
    //     } else {
    //       return tag;
    //     }
    //   });
    // });
  }

  function deleteTag(id: string) {
    console.log(id, "delete tags");
    axios
      .delete(`${API_TAGS}${id}`)
      .then(() => {
        console.log(`tag-${id} delete`);
      })
      .then(() => {
        fetchAllTags();
      });

    // !example without API
    // setTags((prevTags) => {
    //   return prevTags.filter((tag) => tag.id !== id);
    // });
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <AppNotes
              isPending={isPending}
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <CreateNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

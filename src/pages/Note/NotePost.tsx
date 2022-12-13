import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../../components/NoteLayout";
import ReactMarkdown from "react-markdown";
import styles from "./note.module.scss";
import { notesAPI } from "../../api/notesService";
export function NotePost() {
  const note = useNote();
  const navigate = useNavigate();
  const [deleteNoteApi, {}] = notesAPI.useDeleteNoteMutation();
  return (
    <>
      <div className={styles.note}>
        <div>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {note.tags.map((tag) => (
                <div key={tag.id} className="tags" style={{ margin: "1rem" }}>
                  {tag.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="button-group">
            <Link to={`/${note.id}/edit`}>
              <button className="button primary">Edit</button>
            </Link>
            <button
              onClick={() => {
                deleteNoteApi(note);
                navigate("/");
              }}
              className="button delete"
            >
              Delete
            </button>
            <Link to="/">
              <button className="button default">Back</button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </>
  );
}

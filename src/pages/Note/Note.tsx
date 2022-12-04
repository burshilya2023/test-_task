import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../../components/NoteLayout";
import ReactMarkdown from "react-markdown";
import styles from "./note.module.scss";
import { TextAreaLight } from "../../until/LightTextToFilter";
import { useCallback } from "react";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote(); //can be replaced with axios.get(url, id)
  // well, in principle,  do not need to do this, because there will always be up-to-date data from the server, because of useEffect
  const navigate = useNavigate();

  const light = useCallback(
    (titleCard: any) => {
      return (
        <TextAreaLight titleCard={titleCard} titleFilter={note.markdown} />
      );
    },
    [note.markdown]
  );

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
                onDelete(note.id);
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

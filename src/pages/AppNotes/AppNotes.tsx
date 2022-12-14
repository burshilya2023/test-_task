import { useCallback, useMemo, useState } from "react";

import { Link } from "react-router-dom";
import ReactSelect from "react-select";

import { Skeleton } from "../../components/skeleton";
import { Tag, TagCreate } from "../../type";
import { FilterText } from "../../until/LightTextToFilter";
import { motion } from "framer-motion";
import styles from "./appNotes.module.scss";
import { EditTagsModal } from "./editTags.module";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id?: string;
  titleFilter?: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  isPending: boolean;
};

export function AppNotes({ availableTags, notes, isPending }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<TagCreate[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
  const skeletons = [1, 2, 3, 4, 5, 6].map((_, index) => (
    <Skeleton key={index} />
  ));
  const NotesMap = filteredNotes
    .map((note) => (
      <motion.div key={note.id}>
        <Link to={`/${note.id}`} className={styles.noteCard}>
          <NoteCard title={note.title} tags={note.tags} titleFilter={title} />
        </Link>
      </motion.div>
    ))
    .reverse();

  return (
    <>
      <div className={styles.appNotes}>
        <div className={styles.appNotes__header}>
          <h1>Notes</h1>
          <div className={styles.appNotes__create_editTags}>
            <Link to="/new">
              <button className="button primary">Create</button>
            </Link>
            <button
              className="button default"
              onClick={() => setEditTagsModalIsOpen(true)}
            >
              Edit Tags
            </button>
          </div>
        </div>

        <div className={styles.appNotes__search_select}>
          <div className={styles.appNotes__search}>
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.appNotes__tags}>
            <ReactSelect
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
            />
          </div>
        </div>
        {/* //!displaying notes or Skeletons loader*/}
        <motion.div className={styles.appNotes__noteCardWrapper}>
          {!isPending ? NotesMap : skeletons}
        </motion.div>
        <EditTagsModal
          show={editTagsModalIsOpen}
          handleClose={() => setEditTagsModalIsOpen(false)}
        />
      </div>
    </>
  );
}

function NoteCard({ title, tags, titleFilter }: SimplifiedNote) {
  // fucntion for light text
  const light = useCallback(
    (titleCard: string) => {
      return <FilterText titleCard={titleCard} titleFilter={titleFilter} />;
    },
    [titleFilter]
  );
  return (
    <div className={`${styles.noteCard__link}`}>
      <div>
        <div>
          <span>{light(title)}</span>
          {tags.length > 0 && (
            <div className={styles.noteCard__tagsWrapper}>
              {tags.map((tag) => (
                <span className="tags" key={tag.id}>
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

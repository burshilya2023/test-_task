import {
  FormEvent,
  useEffect,
  useCallback,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";

import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../../type";

import styles from "./noteForm.module.scss";
import { TextAreaLight } from "../../until/LightTextToFilter";
type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>; // optional field if editing is used

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  // current data of the note title
  const titleRef = useRef<HTMLInputElement>(null);
  // current data of the description of the note
  //!const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [valueTextarea, setValueTextarea] = useState<string>(markdown);
  const [tagsTask, setTagsTask] = useState<string | undefined>("#");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      // markdown: markdownRef.current!.value + " ",
      markdown: valueTextarea,
      tags: selectedTags,
    });
    navigate(".."); //navigate to '/'
  }

  const ChangeValueArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValueTextarea(event?.target.value);
    const parseMarkDown = event?.target.value.match(/#.+?\w+/g);
    const parse = parseMarkDown?.toString().replace(/\,+/g, " ");
    setTagsTask(parse);
  };

  // !for light text task*(I couldn't make it edited in the textarea)
  const light = useCallback(
    (editText: string | undefined) => {
      return <TextAreaLight editText={editText} tagsTask={tagsTask} />;
    },
    [tagsTask]
  );

  return (
    <form onSubmit={handleSubmit} className={styles.noteForm}>
      <div className={styles.noteForm__title_tags}>
        {/* //!name note */}
        <div className={styles.noteForm__input_title}>
          <label>Title</label>

          <input
            ref={titleRef}
            required
            className="input"
            defaultValue={title}
          />
        </div>

        {/* //!tags */}
        <div>
          <label>Tags</label>
          {/*//?library for creating and selecting selector elements  */}
          <CreatableReactSelect
            required //required field
            className={styles.noteForm__multiSelectot}
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              // @ts-ignore
              onAddTag(newTag); // post api
              // @ts-ignore
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            // only those that were created when editing or creating a note
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            // all available tags
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            // instant creation, deletion
            onChange={(tags) => {
              setSelectedTags(
                // @ts-ignore
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti //multiple choice version
          />
        </div>
      </div>
      <label>Body</label>

      <p>{light(tagsTask)}</p>
      {/* //!description note */}

      <textarea
        required
        // defaultValue={markdown}
        className={styles.noteForm__textarea}
        rows={5}
        value={valueTextarea}
        onChange={ChangeValueArea}
      ></textarea>
      {/*//! light text task */}
      <p style={{ color: "red" }} className={styles.neteForm__textarea_p}>
        {light(valueTextarea)}
      </p>

      <div className={styles.noteForm__button_group}>
        <button type="submit" className="button primary">
          Save
        </button>

        <Link to="..">
          <button type="button" className="button default">
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}

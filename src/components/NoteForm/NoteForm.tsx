import { FormEvent, useCallback, useRef, useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../../type";
import styles from "./noteForm.module.scss";
import { TextAreaLight } from "../../until/LightTextToFilter";
import { notesAPI } from "../../api/notesService";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  availableTags: Tag[];
} & Partial<NoteData>; // optional field if editing is used

export function NoteForm({
  onSubmit,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [valueTextarea, setValueTextarea] = useState<string>(markdown);
  const [tagsTask, setTagsTask] = useState<string | undefined>("#");
  const [createTagApi, {}] = notesAPI.useCreateTagsMutation();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: valueTextarea,
      tags: selectedTags,
    });
    navigate("..");
  }

  const ChangeValueArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValueTextarea(event?.target.value);
    const parseMarkDown = event?.target.value.match(/#.+?\w+/g);
    const parse = parseMarkDown?.toString().replace(/\,+/g, " ");
    setTagsTask(parse);
  };

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
          <CreatableReactSelect
            required
            className={styles.noteForm__multiSelectot}
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              createTagApi(newTag);
              //  @ts-ignore
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                // @ts-ignore
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
          />
        </div>
      </div>

      <label>Body</label>
      <p>{light(tagsTask)}</p>
      {/* //!description note */}
      <textarea
        required
        defaultValue={markdown}
        className={styles.noteForm__textarea}
        rows={5}
        value={valueTextarea}
        onChange={ChangeValueArea}
      />
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

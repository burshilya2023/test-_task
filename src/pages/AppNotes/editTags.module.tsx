import { debounce } from "lodash";
import { FC, useState, useEffect, useRef } from "react";
import { notesAPI } from "../../api/notesService";
import ModalWinod from "../../components/ModalWindow";
import { Tag } from "../../type";
import styles from "./editTag.module.scss";
import { CiEdit } from "react-icons/ci";
type EditTagsModalProps = {
  show: boolean;
  handleClose: () => void;
};
type EditTagProps = {
  tag: Tag;
  id: string;
  idname: string;
  label: string;
};
export function EditTagsModal({ handleClose, show }: EditTagsModalProps) {
  const { data: tags = [] } = notesAPI.useFetchAllTagsQuery(100);

  return (
    <ModalWinod show={show} onHide={handleClose}>
      <div className={styles.editTagsModal}>
        <h1>edit tags</h1>
        {tags.length > 1 ? (
          tags.map((tag) => (
            <div key={tag.id} className={styles.editTagsModal__tagWrapper}>
              <EditTag
                tag={tag}
                id={tag.id}
                idname={tag.idname}
                label={tag.label}
              />
            </div>
          ))
        ) : (
          <h2 style={{ padding: "10px", color: "black" }}>
            create note to view tags
          </h2>
        )}
      </div>
      <button className="button"> update</button>
    </ModalWinod>
  );
}

const EditTag: FC<EditTagProps> = ({ tag, id, idname, label }) => {
  const [updateTagApi, {}] = notesAPI.useUpdateTagsMutation();
  const [deleteTagApi, {}] = notesAPI.useDeleteTagsMutation();

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    deleteTagApi(tag);
  };

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt(`название тега ${label}`) || "";
    updateTagApi({ id, idname, label: title });
  };

  return (
    <div className={styles.editTag}>
      <div>
        <p className="tags">{label}</p>
      </div>
      <div className={styles.editTag__edit_delete}>
        <h3 onClick={handleUpdate}>
          <CiEdit />
        </h3>
        <button
          className="button delete"
          onClick={handleRemove}
          style={{ marginLeft: "10px" }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

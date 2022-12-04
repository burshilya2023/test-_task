import ModalWinod from "../../components/ModalWindow";
import { Tag } from "../../type";
import styles from "./appNotes.module.scss";

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

export function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <ModalWinod show={show} onHide={handleClose}>
      <div className={styles.editTagsModal}>
        <h1>edit tags</h1>
        {availableTags.map((tag) => (
          <div key={tag.id} className={styles.editTagsModal__tagWrapper}>
            <input
              required
              type="text"
              className="input"
              value={tag.label}
              onChange={(e) => {
                if (e.target.value === "") {
                  onDeleteTag(tag.idname);
                }
                onUpdateTag(tag.idname, e.target.value);
              }}
            />

            <button
              className="button delete"
              style={{ marginLeft: "10px" }}
              onClick={() => onDeleteTag(tag.idname)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ModalWinod>
  );
}

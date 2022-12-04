import { FC } from "react";
import { motion } from "framer-motion";
export type Item = {
  id: string;
  label: string;
};
type EditTagsModalProps = {
  children: any;
  show: boolean;
  onHide: (show: boolean) => void;
};
const ModalWinod: FC<EditTagsModalProps> = ({ children, show, onHide }) => {
  return (
    <>
      {show ? (
        <div onClick={() => onHide(!show)} className="modalWindow">
          <motion.div
            initial={{
              y: -200,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            onClick={(e) => e.stopPropagation()}
            className="modalWindow__body"
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </>
  );
};
export default ModalWinod;

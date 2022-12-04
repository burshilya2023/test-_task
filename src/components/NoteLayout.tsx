import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../type";

type NoteLayoutProps = {
  notes: Note[];
};

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  // покажи только 1 заметку по id из парамс поэтому find а не filter
  const note = notes.find((n) => n.id === id);

  // если нету заметок вернись на главную
  if (note == null) return <Navigate to="/" replace />;
  // и передаем один объект из массива

  // теперь в нашем контексте есть данные одного объекта актуальные для note:id
  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<Note>();
}

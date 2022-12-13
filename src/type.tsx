//for update and delete notes API
export type Note = {
  id: string;
} & NoteData;
// for props in noteForm (update/create)
export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
//note from mockApi
export type RawNote = {
  id: string;
} & RawNoteData;
// for create note
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
//for get tags API
export type Tag = {
  id: string;
  idname: string; //automatically created on the server
  label: string;
};
// for create tags
export type TagCreate = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

// не оработанные заметки
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
  //сами теги мы тут не храним
};

export type NoteData = {
  title: string;
  // название заметки
  markdown: string;
  // описание заметки
  tags: Tag[];
  // теги заметки
};

export type Tag = {
  id: string;
  idname: string; //automatically created on the server
  label: string;
};

export type TagCreate = {
  id: string;
  label: string;
};

export type CreateNote = {
  tagIds: string[];
  title: string;
  markdown: string;
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Note, RawNote } from "../type";

const BASE_URL = "https://6389dc504eccb986e89ca5b4.mockapi.io/api";

// с помощью RTK query не нужно создавать extraReducer and reducer in principle
// 1 options it's ID
// 2 baseQuery baseUrl
// хук кеширует данные и лишние запросы не пойдут на сервер
// теги нужны что бы Query понимал, от какой зависимости нужно делать запрос данных
export const notesAPI = createApi({
  reducerPath: "notesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllNotes: build.query<RawNote[], number>({
      query: (limit: number = 100) => ({
        url: `/notes`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Post"],
    }),
    createNote: build.mutation<RawNote, Note>({
      query: (note) => ({
        url: `/notes`,
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["Post"],
    }),
    updateNote: build.mutation<RawNote, Note>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "PUT",
        body: note,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteNote: build.mutation<RawNote, Note>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

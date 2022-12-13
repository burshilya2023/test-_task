import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { Tag,RawNote, Note, TagCreate, RawNoteData } from '../type'



const BASE_URL='https://6389dc504eccb986e89ca5b4.mockapi.io/api'


export const notesAPI= createApi({
        reducerPath:'notesAPI',
        baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
        tagTypes:['Post'],
        endpoints:(build)=> ({
            // =====================*NOTES*=============================
            // !get notes
            fetchAllNotes:build.query<RawNote[],number>({
                query:(limit:number=100)=>({   
                    url:`/notes`,
                    params:{
                        _limit:limit
                    }
                }),
                providesTags: result=>['Post']
            }),
            // !create note
            createNote: build.mutation<RawNoteData, RawNoteData>({
                query:(note)=>({
                    url:`/notes`,
                   method:'POST',
                   body:note
                }),
                invalidatesTags:['Post']
            }),
             // !update note
            updateNote: build.mutation<Note, Note>({
                query:(note)=>({
                    url:`/notes/${note.id}`,
                   method:'PUT',
                   body:note
                }),
                invalidatesTags:['Post']
            }),
            // !delete note
            deleteNote: build.mutation<Note, Note>({
                query:(note)=>({
                    url:`/notes/${note.id}`,
                   method:'DELETE',
                }),
                invalidatesTags:['Post']
            }),

            // =====================*TAGS*=============================
            // ! GET TAGS
            fetchAllTags:build.query<Tag[],number>({
                query:(limit:number=100)=>({   
                    url:`/tags`,
                    params:{
                        _limit:limit
                    }
                }),
                providesTags: result=>['Post']
            }),
            // ! POST TAGS
            createTags: build.mutation<Tag, TagCreate>({
                query:(tag)=>({
                    url:`/tags`,
                   method:'POST',
                   body:tag
                }),
                invalidatesTags:['Post']
            }),
            // ! UPDATE TAGS
            updateTags: build.mutation<Tag, Tag>({
                query:(tag)=>({
                    url:`/tags/${tag.idname}`,
                   method:'PUT',
                   body:tag
                }),
                invalidatesTags:['Post']
            }),
            // ! DELETE TAGS
            deleteTags: build.mutation<Tag, Tag>({
                query:(tag)=>({
                    url:`/tags/${tag.idname}`,
                   method:'DELETE',
                }),
                invalidatesTags:['Post']
            }),
        })
        
})

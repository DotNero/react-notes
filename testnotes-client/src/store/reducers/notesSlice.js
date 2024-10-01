import { createSlice } from '@reduxjs/toolkit';
import { fetchAll } from '../../components/Requests';

const initialState = {
  ids: null,
  entities: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
      addNote(state, action){
        const {note} = action.payload;
        state.entities[note.id] = note;
        state.ids.push(note.id)
      },
      updateNote(state, action){
        const {noteId, data} = action.payload;
        Object.assign(state.entities[noteId], data);
      },
      removeNote(state, action){
        const {note_id} = action.payload;
        delete state.entities[note_id];
        state.ids = state.ids.filter((id) => id !== note_id);
      },
      //определить, будет ли полностью этот редьюсер сносить хранилище, пока не сносит, но добавляет без учета содержимого
      loadUserNotes(state, action){
        const {token, user_id} = action.payload;
        let data = fetchAll(user_id, token)
        
        for (let note of data){
            state.entities[note.id] = note;
            state.ids.push(note.id)
        }

      }
    },
  });
  
  export const { addNote, updateNote, removeNote, loadUserNotes} = notesSlice.actions;
  export default notesSlice.reducer;
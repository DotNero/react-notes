import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchAll, saveNote, errorUtils} from '../../components/Requests';


export const loadUserNotes = createAsyncThunk(
  'notes/loadUserNotes',
  async ({ user_id, token }) => {
    const response = await fetchAll(user_id, token);
    return response;
  }
);

//TODO: доделать
export const saveUserNote = createAsyncThunk(
  'notes/saveUserNote',
  async ({user_id, token, data}) => {
    try{
    console.log(data)
    console.log(user_id)
    console.log(token)
    const response = await saveNote(user_id, token, data);
    console.log(response)
    return response
    }
    catch(e){
      return errorUtils.getError(e)
    }
  }
)

const initialState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null, 
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
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadUserNotes.pending, (state) => {
        state.status = 'loading';
      })
        .addCase(loadUserNotes.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const notes = action.payload;
          state.ids = [];
          Object.values(notes).map((note) => {
            state.entities[note.id] = note;
            state.ids.push(note.id);
          })
        })
          
        .addCase(loadUserNotes.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action?.error.message;
        })
        .addCase(saveUserNote.pending, (state) => {
          state.status = 'loading';
        })
        // TODO возможно нужно что-то добавить на успех и ошибку
        .addCase(saveUserNote.fulfilled, (state) => {
          state.status = 'succeeded';
        })
        .addCase(saveUserNote.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action?.error.message;
        })
    }
  });
  
  export const { addNote, updateNote, removeNote} = notesSlice.actions;
  export default notesSlice.reducer;
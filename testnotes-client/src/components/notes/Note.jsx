import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { loadUserNotes, saveUserNote, updateNote } from '../../store/reducers/notesSlice';

export default function Note(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { noteId } = useParams();
    
    const notes = useSelector(state => state.notes.entities)
    const status = useSelector(state => state.notes.status)
    const token = useSelector(state => state.auth.token)
    const user_id = useSelector(state => state.auth.user_id)
    const error = useSelector(state => state.notes.error)
    // const [updatedLabel, setUpdatedLabel] = useState(null);
    // const [updatedBody, setUpdatedBody] = useState(null);
    
    let note = null;
    
    useEffect(()=>{
        if(token != null && user_id != null){
            dispatch(loadUserNotes({token: token, user_id: user_id}))
            
        }
        else{
            navigate("/login");
        }
        
    }, [dispatch, token, user_id])

    useEffect(() => {
        return ()=>{
            let noteForUpdate = null;
            for(let temp of Object.values(notes)){
                if(temp.id == noteId){
                    noteForUpdate = temp;
                }
            }
            if (noteForUpdate != null){
                dispatch(saveUserNote({token: token, user_id: user_id, data: noteForUpdate}))
            }
        }
    },[dispatch])

    // useEffect(()=>{
        
    // }, [dispatch, note])

    // function handleChange(event){
        
    // }
    
    for(let temp of Object.values(notes)){
        if(temp.id == noteId){
            note = temp;
        }
        console.log(temp.id == noteId)
    }
    if(note == null){
        return <div>Ошибка поиска зметки</div>
    }

    function updateLabel(label){
        dispatch(updateNote({noteId: noteId, data: {label: label}}))
    }

    function updateBody(body){
        dispatch(updateNote({noteId: noteId, data: {body: body}}))
    }
    
    // let note = Object.values(notes).find((temp) => temp.id === noteId);
    

    return(
    <div>
        {/* <input placeholder = {note.label} type = "text" value = {updatedLabel} onChange = {e => setUpdatedLabel(e.target.value)}></input>
        <textarea placeholder = {note.body} type = "text" value = {updatedBody} onChange = {e => setUpdatedBody(e.target.value)}></textarea> */}
        <input placeholder = {note.label} type = "text" value = {note.label} onChange = {e => updateLabel(e.target.value)}></input>
        <textarea placeholder = {note.body} type = "text" value = {note.body} onChange = {e => updateBody(e.target.value)}></textarea>
        <label>
            DateTime: {note.datetime}
        </label>
        <label>
            Id: {note.id}
        </label>
        <button type = 'button'>Сохранить</button>
        <button type = 'button'>Удалить</button>
    </div>)

};
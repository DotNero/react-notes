import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserNotes } from '../store/reducers/notesSlice';
import TextCard from './notes/TextCard';
import { useNavigate } from 'react-router';

export default function MyNotes(){
    const navigate = useNavigate();
    const notes = useSelector(state => state.notes.entities)
    const noteIds = useSelector(state => state.notes.ids)
    const user_id = useSelector(state => state.auth.user_id)
    const token = useSelector(state => state.auth.token)
    const status = useSelector(state => state.notes.status)
    const error = useSelector(state => state.notes.error)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(token != null && user_id != null){
            dispatch(loadUserNotes({token: token, user_id: user_id}))
        }
        else{
            navigate("/login");
        }
    }, [dispatch, token, user_id, navigate])

    function renderNotes(data){
        console.log(Object.values(data))
        if(data && Object.keys(data).length > 0){
            let notes = Object.values(data).map(note => (
                <li key = {note.id}>
                    <TextCard id = {note.id} label = {note.label} datetime = {note.datetime}/>
                </li>
            ));

            console.log(notes)
            return notes;
        }
        else{
            return <p>No cards</p>
        }
    }
    
    if (status === 'loading'){
        return <p>Loading ...</p>
    }
    if (status === 'failed'){
        return <p>Error: {error}</p>
    }

    return (
        <>
            <div>
                <ul>
                    {renderNotes(notes)}
                </ul>
            </div>
        </>
    )
}
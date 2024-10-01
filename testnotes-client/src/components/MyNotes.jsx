import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserNotes } from '../store/reducers/notesSlice';
import TextCard from './notes/TextCard';
import { useNavigate } from 'react-router';

export default function MyNotes(){
    const navigate = useNavigate();
    const notes = useSelector((state) => state.notes.entities)
    const noteIds = useSelector((state) => state.notes.ids)
    const user_id = useSelector((state) => state.auth.user_id)
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(token != null && user_id != null){
            dispatch(loadUserNotes({token: token, user_id: user_id}))
        }
        else{
            navigate("/login");
        }
    })

    function Notes(data){
        if(data){
        const notes = data.map((note) => 
        {
            <TextCard id = {note.id} label = {note.label} datetime = {note.datetime} />
        })
        return notes}
        else{
            return <p>No cards</p>
        }
    }
    return(
        <>
            <div>
                {Notes(notes)}
            </div>
        </>
    )
}
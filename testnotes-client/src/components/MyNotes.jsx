import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserNotes } from '../store/reducers/notesSlice';
import TextCard from './notes/TextCard';
import { useNavigate } from 'react-router';
import { Fragment } from 'react';

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

    
    if (status === 'loading'){
        return <p>Loading ...</p>
    }
    if (status === 'failed'){
        return <p>Error: {error}</p>
    }

    if (notes && Object.keys(notes).length > 0){
        return (Object.values(notes).map(note => (<div key = {note.id}><TextCard id = {note.id} label = {note.label} datetime = {note.datetime}/></div>)))
        // return (Object.values(notes).map(note => (<div key = {note.id}>{note.id}, {note.label}</div>)))
        // console.log(notesList)
        // console.log(Array.isArray(notesList))
        //     return (
        //         <>
        //             { notesList }
        //         </>
        //     )
    }
}
import { useState, useEffect } from 'react';
import {React} from "react";
import {Link} from "react-router-dom";
import {logout} from "./Requests.js";
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '../store/reducers/authSlice.js'


export default function Navbar(){

    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.token);
    const user_id = useSelector(state => state.auth.user_id);


    const handleLogout = async () => {
        let response = await logout(token)
        if(response){
            dispatch(clearAuth());
        }
    }

    return(
        <>
            <div id = "navbar">
                <div>
                    <nav className = "nav-links">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            {
                                (token != null && user_id != null) ? (
                                    <>
                                    <li>
                                        <button type = "button" onClick = {handleLogout}>Logout</button>
                                    </li>
                                    <li>
                                        <Link to="/mynotes">My Notes</Link>
                                    </li>
                                    </>
                                ):(
                                    <>
                                        <li><Link to="/login">Login</Link></li>
                                        <li><Link to="/reg">Registration</Link></li>
                                    </>
                                )}  
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
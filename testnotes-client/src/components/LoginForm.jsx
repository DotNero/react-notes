import {login} from "./Requests"
import { useState} from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUserId} from '../store/reducers/authSlice';

export default function LoginForm(){

    
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data_json = JSON.stringify(formData)
        console.log(data_json)
        let response = await login(formData.email, formData.password)
        let auth_token = response.data.auth_token
        let user_id = response.data.id
        dispatch(setToken(auth_token));
        dispatch(setUserId(user_id));
        
        console.log(user_id, auth_token)
    }
    return(
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <label>email</label>
                    <input type = "email" name = "email" value = {formData.email} onChange = {handleChange}></input>
                </div>
                <div>
                    <label>password</label>
                    <input type = "password" name = "password" value = {formData.password} onChange = {handleChange}></input>
                </div>
                <div>
                    <input type = "submit"></input>
                </div>
            </form>
        </div>
        </>
    )
}
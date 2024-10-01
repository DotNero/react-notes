import {reg} from "./Requests"
import { useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setToken, setUserId} from '../store/reducers/authSlice'

export default function RegistrationForm(){

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
        let response = await reg(formData.email, formData.password)
        console.log(response)
    }
    return(
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Registration</h1>
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
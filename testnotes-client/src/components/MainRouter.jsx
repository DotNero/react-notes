
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./Navbar";
import Main from "./Main";
import LoginForm from "./LoginForm";
import MyNotes from "./MyNotes";
import RegistrationForm from "./RegistrationForm"
import {fetchAll} from './Requests';


export default function MainRouter(){
    return(
    <BrowserRouter>
        <Navbar />
        <div>
        <Routes>
            <Route path = "/" exact element = {<Main />}/>
            <Route path ="/about" element = {<div>about</div>}/>
            <Route path ="/login" element = {<LoginForm />}/>
            <Route path ="/reg" element ={<RegistrationForm/>}/>
            <Route path = "/mynotes" loader = {fetchAll} element = {<MyNotes/>}/>
            <Route path = "/notes/:noteId" ></Route>
        </Routes>
        </div>
    </BrowserRouter>
    )
}
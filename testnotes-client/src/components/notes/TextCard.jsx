import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom";

export default function TextCard(
    id,
    label,
    datetime
){  const navigate = useNavigate();
    <div>
        <h1><Link to = {`/note/${id}`} >{label}</Link></h1>
        <label>{datetime}</label>
    </div>
}
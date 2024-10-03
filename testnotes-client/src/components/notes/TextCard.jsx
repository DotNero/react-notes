import { useNavigate } from 'react-router-dom'
import {Link} from "react-router-dom";

export default function TextCard(
    key,
    id,
    label,
    datetime
){  const navigate = useNavigate();
    return(
        <div key = {key}>
            <Link to = {`/note/${id}`} >{label}</Link>
            <label>{datetime}</label>
        </div>
    )
}
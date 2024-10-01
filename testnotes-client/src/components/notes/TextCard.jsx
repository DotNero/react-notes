import { useNavigate } from 'react-router-dom'
function CardClick(){
    
}
export default function TextCard(
    id,
    label,
    body,
    datetime
){  const navigate = useNavigate();
    <div onClick = {navigate(`/note/${id}`)}>
        <h1>{label}</h1>
        <body>{body}</body>
        <label>{datetime}</label>
    </div>
}
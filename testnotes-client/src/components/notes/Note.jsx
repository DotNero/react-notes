

export default function Note(
    id,
    label,
    body,
    datetime
){
    <div>
        <h1>
            Label: {label}
        </h1>
        <p>
            Body: {body}
        </p>
        <label>
            DateTime: {datetime}
        </label>
        <label>
            Id: {id}
        </label>
    </div>

};
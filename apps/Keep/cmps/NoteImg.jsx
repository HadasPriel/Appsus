export function NoteImg({ info, keepId, onRemoveKeep }) {

    return (
        <div className='note note-img'>
            <p>{info.title}</p>
            <img src={info.url} />
            <button onClick={() => { onRemoveKeep(keepId) }}>Remove</button>
        </div>
    )
}
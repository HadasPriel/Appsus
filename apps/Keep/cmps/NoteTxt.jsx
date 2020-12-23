


export function NoteTxt({ info, keepId, onRemoveKeep }) {

    return (
        <div className='note-txt'>
            <input placeholder='Add your text' />
            <p>{info.txt}</p>
            <button onClick={() => { onRemoveKeep(keepId) }}>Remove</button>
        </div>
    )
}
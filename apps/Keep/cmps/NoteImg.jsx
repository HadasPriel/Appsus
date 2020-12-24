const { Link } = ReactRouterDOM;


export function NoteImg({ info, keepId, onRemoveKeep }) {

    return (
        <div className='note note-img'>
            <Link to={`/keep/edit/${keepId}`}>
                <p>{info.title}</p>
                <img src={info.url} />
            </Link>

            <button onClick={() => { onRemoveKeep(keepId) }}>Remove</button>
        </div>
    )
}


const { Link } = ReactRouterDOM;


export function NoteTxt({ info, keepId, onRemoveKeep }) {

    return (
        <div className='note note-txt'>
            <Link to={`/keep/edit/${keepId}`}>
                <p>{info.txt}</p>
            </Link>

            <button onClick={() => { onRemoveKeep(keepId) }}>Remove</button>
        </div>
    )
}
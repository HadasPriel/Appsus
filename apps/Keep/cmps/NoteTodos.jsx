const { Link } = ReactRouterDOM;


export function NoteTodos({ info, keepId, onRemoveKeep }) {

    return (
        <div className='note note-todos'>
            <Link to={`/keep/edit/${keepId}`}>
                <p>{info.lable}</p>
                <input placeholder='Add your todo' />
                {info.todos.map((todo, idx) => <p key={idx}>
                    {todo.txt}
                </p>)}
            </Link>
            <button onClick={() => { onRemoveKeep(keepId) }}>Remove</button>
        </div>
    )
}
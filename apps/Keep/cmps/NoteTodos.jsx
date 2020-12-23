export function NoteTodos({ info, keepId, onRemoveKeep }) {

    return (
        <div className='note-todos'>
            <p>{info.lable}</p>
            <input placeholder='Add your todo' />
            {info.todos.map((todo, idx) => <p key={idx}>
                {todo.txt}
            </p>)}
            <button onClick={() => { onRemoveKeep(keepId) }}>Remove</button>
        </div>
    )
}
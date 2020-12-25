import { TodoPreview } from './TodoPreview.jsx'

export function TodoList({ todos, keepId, updateTodo, deleteTodo }) {

    return (
        <ul className="todo-list">
            {todos.map(todo => {
                return <TodoPreview key={todo.id} todo={todo} keepId={keepId} updateTodo={updateTodo} deleteTodo={deleteTodo} />;
            })
            }
        </ul>
    );
}
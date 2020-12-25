import { TodoAdd } from './TodoAdd.jsx'
import { TodoList } from './TodoList.jsx'
import { keepService } from "../services/keepService.js";

export class NoteTodos extends React.Component {

    state = {
        keep: {
            type: 'NoteTodos',
            info: {
                label: 'List',
                todos: []
            }
        },

        isEdit: false

    };



    componentDidMount() {
        const { keep } = this.props
        this.setState({ keep })
    }

    toggleEdit = () => {
        this.setState(isEdit === !this.state.edit)
    }

    addTodo = (txt, id) => {
        keepService.addTodo(txt, id)
            .then(savedKeep => {
                this.setState({ savedKeep })
            })
    }

    updateTodo = (todo,id) =>{
        keepService.updateTodo(todo,id)
        .then(updatedKeep => {
            this.setState({ updatedKeep })
        })
    }

    deleteTodo = (todo,id) =>{
        keepService.deleteTodo(todo,id)
        .then(savedKeep => {
            console.log(savedKeep)
            this.setState({ savedKeep })
        })
    }



    render() {
        const keep = { ...this.state.keep };
        const todos = keep.info.todos

        return (

            <div className='note note-todos' >
                <TodoAdd id={keep.id} addTodo={this.addTodo} />
                <TodoList todos={todos} keepId={keep.id} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
                <button onClick={() => { this.props.onRemoveKeep(keep.id) }}>Remove</button>
                <button onClick={this.toggleEdit}>Edit</button>
            </div>
        )

    }
}





{/* <p>{keep.info.lable}</p>
                    <input placeholder='Add your todo' />
                    {keep.info.todos.map((todo) => <p key={todo.id}>
                        {todo.txt}
                    </p>)} */}
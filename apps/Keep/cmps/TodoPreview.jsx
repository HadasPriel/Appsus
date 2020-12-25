export class TodoPreview extends React.Component {

    state = {
        todo: {
            id: '12345',
            txt: '',
            doneAt: null
        }

    };



    componentDidMount() {
        const { todo } = this.props
        this.setState({ todo })
    }

    onMarkTodo = () => {
        const { todo } = { ...this.state }
        const doneAt = todo.doneAt
        let updatedDone = (doneAt) ? null : Date.now()
        todo.doneAt = updatedDone
        this.props.updateTodo(todo, this.props.keepId)


    }

    onDeleteTodo = () => {
        const { todo } = { ...this.state }
        this.props.deleteTodo(todo, this.props.keepId)
    }



    render() {
        const todo = { ...this.state.todo };
        const classCross = (todo.doneAt) ? 'done' : 'active'

        return (

            <li className={`todo-preview ${classCross}`} >
                <span onClick={this.onMarkTodo}>{todo.txt}</span>
                <button type='button' onClick={this.onDeleteTodo}>Delete</button>
            </li>
        )

    }
}
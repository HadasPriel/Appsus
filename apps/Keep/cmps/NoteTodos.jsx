import { TodoAdd } from './TodoAdd.jsx'
import { TodoList } from './TodoList.jsx'
import { keepService } from "../services/keepService.js";
import { NoteColorPicker } from "./NoteColorPicker.jsx";

export class NoteTodos extends React.Component {

    state = {
        keep: {
            type: 'NoteTodos',
            info: {
                label: 'List',
                todos: []
            }
        },

        isEdit: false,
        isColor: false

    };



    componentDidMount() {
        const { keep } = this.props
        this.setState({ keep })
    }

    toggleColor = () => {
        this.setState({ isColor: !this.state.isColor })
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

    updateTodo = (todo, id) => {
        keepService.updateTodo(todo, id)
            .then(updatedKeep => {
                this.setState({ updatedKeep })
            })
    }

    deleteTodo = (todo, id) => {
        keepService.deleteTodo(todo, id)
            .then(savedKeep => {
                console.log(savedKeep)
                this.setState({ savedKeep })
            })
    }

    onSetColor = (color) => {
        const { keep } = { ...this.state }
        const keepCopy = JSON.parse(JSON.stringify(keep))
        keepCopy.style.backgroundColor = color
        keepService.update(keepCopy).then(savedKeep => {
            this.setState({ keep: savedKeep });
        })
    }


    render() {
        const keep = { ...this.state.keep };
        const todos = keep.info.todos

        return (

            <div className='note note-todos' style={keep.style}>
                <TodoAdd id={keep.id} addTodo={this.addTodo} />
                <TodoList todos={todos} keepId={keep.id} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                <button onClick={() => { this.props.onRemoveKeep(keep.id) }}>Remove</button>
                <button onClick={this.toggleColor}>Color</button>
                {this.state.isColor && <NoteColorPicker toggleColor={this.toggleColor} onSetColor={this.onSetColor} />}

            </div>
        )

    }
}






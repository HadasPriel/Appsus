const { Link } = ReactRouterDOM;

export class NoteTodos extends React.Component {

    state = {
        keep: {
            type: 'NoteTodos',
            info: {
                label: 'List',
                todos: []
            }
        },

        isEdit:false

    };



    componentDidMount() {
        const { keep } = this.props
        this.setState({ keep })
    }

    toggleEdit=()=>{
        this.setState(isEdit===!this.state.edit) 
    }
    

    render() {
        const keep = { ...this.state.keep };


        return (
            <div className='note note-todos'>
               
                    <p>{keep.info.lable}</p>
                    <input placeholder='Add your todo' />
                    {keep.info.todos.map((todo, idx) => <p key={idx}>
                        {todo.txt}
                    </p>)}
               
                <button onClick={() => { this.props.onRemoveKeep(keep.id) }}>Remove</button>
                <button onClick={this.toggleEdit}>Edit</button>
            </div>
        )

    }
}

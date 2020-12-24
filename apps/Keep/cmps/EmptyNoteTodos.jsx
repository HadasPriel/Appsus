export class EmptyNoteTodos extends React.Component {

    state = {
        keep: {
            type: 'NoteTodos',
            info: {
                label: 'List',
                todos: []
            }
        },

    };



    componentDidMount() {
        const { keep } = this.props
        const todoForDisplay = keep.info.todos.map((todo)=>{
            return todo.txt
        })
        keep.info.todos=todoForDisplay.join(',')
        this.setState({ keep })
    }


    onSaveChanges = (ev) => {
        ev.preventDefault()
        this.props.onSubmit(this.state.keep)
    }

    onInputChange = (ev) => {//on input change
        const value = ev.target.value;
        const keep = { ...this.state.keep };
        keep.info[ev.target.name] = value;
        this.setState({
            keep
        });
    };

    render() {
        const keep = { ...this.state.keep };


        return (
            <form onSubmit={this.onSaveChanges}>
                <input value={keep.info.label}
                    placeholder="title" type="text" name="label"
                    onChange={this.onInputChange} />


                <input value={keep.info.todos}
                    placeholder="Your Text" type="text" name="todos"
                    onChange={this.onInputChange} />
                
                <button>Update</button>
            </form >
        )

    }
}

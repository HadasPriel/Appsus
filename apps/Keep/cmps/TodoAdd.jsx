

export class TodoAdd extends React.Component {

    state = {
        txt: ''

    };

    refInput = React.createRef();

    componentDidMount() {

        this.refInput.current.focus();
    }

    onSaveTodo = (ev) => {//on submit
        ev.preventDefault();
        const txt = this.state.txt
        const keepId = this.props.id
        this.props.addTodo(txt, keepId)
    };


    onInputChange = (ev) => {
        console.log(ev.target.value)
        const value = ev.target.value
        this.setState({
            txt: value
        });
        console.log(this.state.txt)
    };


    render() {
        return (
            <form className="todo-add" onSubmit={this.onSaveTodo}>
                <div className="row">
                    <input value={this.state.txt} ref={this.refInput}
                        placeholder="add your todo" type="text" name='txt' autoComplete="off"
                        onChange={this.onInputChange} />

                </div>
                <button className="save" type='submit'>Save</button>


            </form>
        );
    }
}

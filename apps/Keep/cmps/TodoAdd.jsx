

export class TodoAdd extends React.Component {

    state = {
        txt: ''

    };





    onSaveTodo = (ev) => {//on submit
        ev.preventDefault();
        const txt = this.state.txt
        const keepId = this.props.id
        this.props.addTodo(txt, keepId)
        this.setState({
            txt: ''
        });
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
            <form className="todo-add flex align-center space-between" onSubmit={this.onSaveTodo}>
                <div className="row">
                    <input value={this.state.txt}
                        placeholder="Add your todo" type="text" name='txt' autoComplete="off"
                        onChange={this.onInputChange} />

                </div>
                <button className="save" title="Add your todo" type='submit'></button>


            </form>
        );
    }
}



export class EmptyNoteTxt extends React.Component {

    state = {
        keep: {
            type: 'NoteText',
            info: {
                txt: ''
            }
        }
    };



    componentDidMount() {
        const { keep } = this.props
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

                <input value={keep.info.txt}
                    placeholder="Name" type="text" name="txt"
                    onChange={this.onInputChange} />

                <button>Update</button>
            </form>
        )

    }
}

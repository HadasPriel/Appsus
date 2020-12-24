
export class EmptyNoteImg extends React.Component {

    state = {
        keep: {
            type: 'NoteImg',
            info: {
                url: '',
                title: 'Image'
            },
            style: {
                backgroundColor: '#00d'
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
                <input value={keep.info.title}
                    placeholder="title" type="text" name="title"
                    onChange={this.onInputChange} />

                <input value={keep.info.url}
                    placeholder="url" type="text" name="url"
                    onChange={this.onInputChange} />
                <button>Update</button>

            </form>
        )

    }
}
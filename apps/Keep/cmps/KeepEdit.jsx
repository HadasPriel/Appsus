

export class KeepEdit extends React.Component {

    state = {

        label:'',
        txt: 'Your text'

    };

    componentDidMount() {
        const { label, txt } = this.props
        this.setState( { label, txt })
    }

    onSaveInputChanges=()=>{
        const { label, txt } = this.state
        this.props.onSaveChange(label,txt)
        this.setState( { 
            label:'', 
            txt :'Your text'})
        this.props.toggleEdit()
    }
    onInputChange = (ev) => {
        const value = ev.target.value;
        this.setState({
            [ev.target.name]:value
        });
    };

    render() {
    
        return (
            <section className='keep-edit'>

                {this.state.label && <input value={this.state.label}
                    placeholder="Edit label" type="text" name="label" autoComplete="off"
                    onChange={this.onInputChange} />}

                <input value={this.state.txt} required
                    placeholder="Edit text" type="text" name="txt" autoComplete="off"
                    onChange={this.onInputChange} />
                <button onClick={this.props.toggleEdit}>Cancel Changes</button>
                <button type='button'onClick={this.onSaveInputChanges}>Save Changes</button>

            </section>
        );
    }
}



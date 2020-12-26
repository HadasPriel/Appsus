

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
            <section className='keep-edit flex align-center'>

                {this.state.label && <input value={this.state.label} title="Title"
                    placeholder="Edit label" type="text" name="label" autoComplete="off"
                    onChange={this.onInputChange} /> }

                <input className="edit-input" value={this.state.txt} title="Your Change"
                    placeholder="Edit text" type="text" name="txt" autoComplete="off"
                    onChange={this.onInputChange} />
               <div className ='btn-container'>
                <button className='cancel' title="Cancel Change" onClick={this.props.toggleEdit}></button>
                <button className='save' title="Save Change"type='button'onClick={this.onSaveInputChanges}></button>
                </div>

            </section>
        );
    }
}



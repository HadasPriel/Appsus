import { keepService } from "../services/keepService.js";

export class KeepAdd extends React.Component {

    state = {
        keep: {
            type: 'NoteText',
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        wellcomeMsg: 'What is on your mind',
        key: 'txt'

    };

    refInput = React.createRef();

    componentDidMount() {

        this.refInput.current.focus();

        keepService.getTemplateKeep('NoteText').then(({ keep, wellcomeMsg, key }) => {
            this.setState({ keep, wellcomeMsg, key });
        });
    }

    onChooseKeepType = (type) => {
        
        keepService.getTemplateKeep(type).then(({ keep, wellcomeMsg, key }) => {
            this.setState({ keep, wellcomeMsg, key });
        })
    }

    onSaveKeep = (ev) => {//on submit
        ev.preventDefault();

        if (!this.state.keep.info) {
            return;
        }

        keepService.save(this.state.keep)
        .then(savedKeep => {
            console.log('Saves succesfully', savedKeep );
            
        })

    };

    // /keepService.turnToToDos(ev.target.value)

    onInputChange = (ev) => {
        const keep = { ...this.state.keep };

        const value = ev.target.value
        keep.info[ev.target.name] = value
        this.setState({
            keep
        });
    };


    render() {
        return (
            <form onSubmit={this.onSaveKeep}>

                <input value={this.state.keep.info[this.state.key]} ref={this.refInput}
                    placeholder={this.state.wellcomeMsg} type="text" name={this.state.key}
                    onChange={this.onInputChange} />
                <button type='button' onClick={() => this.onChooseKeepType('NoteText')}>Text</button>
                <button  type='button'onClick={() => this.onChooseKeepType('NoteImg')}>Image</button>
                <button  type='button' onClick={() => this.onChooseKeepType('NoteTodos')}>List</button>
                <button type='submit'>Save</button>


            </form>
        );
    }
}

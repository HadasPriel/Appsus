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
        })
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
        // not sure about it
        keepService.add(this.state.keep)
            .then(savedKeep => {
                console.log('Saves succesfully', savedKeep);

            }).then(this.props.loadKeeps())
            .then(keepService.getTemplateKeep('NoteText').then(({ keep, wellcomeMsg, key }) => {
                this.setState({ keep, wellcomeMsg, key });
            }))

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
            <form className="keep-add" onSubmit={this.onSaveKeep}>
                <div className="row">
                    <input value={this.state.keep.info[this.state.key]} ref={this.refInput}
                        placeholder={this.state.wellcomeMsg} type="text" name={this.state.key}
                        onChange={this.onInputChange} />
                    <div className="bar">
                        <button className="txt" type='button' onClick={() => this.onChooseKeepType('NoteText')}></button>
                        <button className="img" type='button' onClick={() => this.onChooseKeepType('NoteImg')}></button>
                        <button className="list" type='button' onClick={() => this.onChooseKeepType('NoteTodos')}></button>
                    </div>
                </div>
                <button className="save" type='submit'></button>


            </form>
        );
    }
}

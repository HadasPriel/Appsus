import { KeepEdit } from "./KeepEdit.jsx";
import { keepService } from "../services/keepService.js";



export class NoteTxt extends React.Component {

    state = {
        keep: {
            type: 'NoteText',
            info: {
                txt: ''
            }
        },

        isEdit: false
    };



    componentDidMount() {
        const { keep } = this.props
        this.setState({ keep })
    }

    toggleEdit = () => {

        this.setState({ isEdit: !this.state.isEdit })
    }

    onSaveChange = (label, txt) => {//on submit
        const {keep} = { ...this.state }
        console.log(keep)

        if ('label' in keep.info) {
            keep.info.label = label
        }
        keep.info.txt = txt

        keepService.update(keep).then(savedKeep => {
            console.log('Saves succesfully', savedKeep);
        }).then(this.props.loadKeeps)

    };


    render() {
        const keep = { ...this.state.keep }

        return (
            <div className='note note-txt'>
                <p>{keep.info.txt}</p>
                <button onClick={() => { this.props.onRemoveKeep(keep.id) }}>Remove</button>
                <button onClick={this.toggleEdit}>Edit</button>
                {this.state.isEdit && <KeepEdit txt={keep.info.txt} toggleEdit={this.toggleEdit} label={null} onSaveChange={this.onSaveChange} />}
            </div>
        )

    }
}

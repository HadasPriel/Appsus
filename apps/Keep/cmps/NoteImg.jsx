const { Link } = ReactRouterDOM;
import { KeepEdit } from "./KeepEdit.jsx";
import { keepService } from "../services/keepService.js";

export class NoteImg extends React.Component {
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
        },

        isEdit: false
    };

    componentDidMount() {
        const { keep } = this.props
        this.setState({ keep })
    }

    onSaveChange = (title, url) => {//on submit
        const { keep } = { ...this.state }
        console.log(keep)
        keep.info.title = title
        keep.info.url = url
        keepService.update(keep).then(savedKeep => {
            console.log('Saves succesfully', savedKeep);
        }).then(this.props.loadKeeps)

    };


    toggleEdit = () => {

        this.setState({ isEdit: !this.state.isEdit })
    }
    render() {
        const keep = { ...this.state.keep };

        return (
            <div className='note note-img'>

                <p>{keep.info.title}</p>
                <img src={keep.info.url} />
                <button onClick={() => { this.props.onRemoveKeep(keep.id) }}>Remove</button>
                <button onClick={this.toggleEdit}>Edit</button>
                {this.state.isEdit && <KeepEdit txt={keep.info.url} toggleEdit={this.toggleEdit} label={keep.info.title} onSaveChange={this.onSaveChange} />}
            </div>
        )

    }

}


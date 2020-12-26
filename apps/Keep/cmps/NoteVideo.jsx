
import { KeepEdit } from "./KeepEdit.jsx";
import { keepService } from "../services/keepService.js";
import { NoteColorPicker } from "./NoteColorPicker.jsx";
import { mailService } from "../../Mail/services/mailService.js"
import {eventBusService} from "../../../services/eventBusService.js"

export class NoteVideo extends React.Component {
    state = {
        keep: {
            type: 'NoteVideo',
            info: {
                url: '',
                title: 'Image'
            },
            style: {
                backgroundColor: '#00d'
            }
        },

        isEdit: false,
        isColor: false
    };

    componentDidMount() {
        const { keep } = this.props
        this.setState({ keep })
    }

    onSaveChange = (title, url) => {//on submit
        const { keep } = { ...this.state }
        console.log(keep)
        keep.info.title = title
        keep.info.url = keepService.turnToEmbedeVideo(url)
        keepService.update(keep).then(savedKeep => {
            this.setState({ keep: savedKeep });
        })

    }

    toggleColor = () => {
        this.setState({ isColor: !this.state.isColor })
    }

    toggleEdit = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }

    onSetColor = (color) => {
        const { keep } = { ...this.state }
        const keepCopy = JSON.parse(JSON.stringify(keep))
        keepCopy.style.backgroundColor = color
        keepService.update(keepCopy).then(savedKeep => {
            this.setState({ keep: savedKeep });
        })
    }

    onSendMail = () => {
        const { keep } = { ...this.state }
        const keepToSend = {
            title: keep.info.title,
            body: keepService.turnToYouTubeVideo(keep.info.url)
        }
        mailService.getKeep(keepToSend)
        eventBusService.showBusMsg('Sent To Mail')

    }

    render() {
        const keep = { ...this.state.keep };

        return (
            <div className='note note-video' style={keep.style}>

                <p>{keep.info.title}</p>
                <iframe width='200' height='200' src={keep.info.url} />
                <button onClick={() => { this.props.onRemoveKeep(keep.id) }}>Remove</button>
                <button onClick={this.toggleEdit}>Edit</button>
                <button onClick={this.toggleColor}>Color</button>
                <button onClick={this.onSendMail}>Send Mail</button>
                {this.state.isEdit && <KeepEdit txt={keep.info.url} toggleEdit={this.toggleEdit} label={keep.info.title} onSaveChange={this.onSaveChange} />}
                {this.state.isColor && <NoteColorPicker toggleColor={this.toggleColor} onSetColor={this.onSetColor} />}
            </div>
        )

    }

}


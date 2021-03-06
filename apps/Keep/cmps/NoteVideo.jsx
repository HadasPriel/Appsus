
import { KeepEdit } from "./KeepEdit.jsx";
import { keepService } from "../services/keepService.js";
import { NoteColorPicker } from "./NoteColorPicker.jsx";
import { mailService } from "../../Mail/services/mailService.js"
import { eventBusService } from "../../../services/eventBusService.js"

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
        if (keep.info.url !== url) {
            keep.info.url = keepService.turnToEmbedeVideo(url)
        } else {
            keep.info.url = url
        }

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
            <div className='note note-video flex align-center space-between' style={keep.style}>

                <h4>{keep.info.title}</h4>
                <iframe width='200' height='200' src={keep.info.url} />
                <div className='note btn-container flex'>
                    <button className='delete' title="Delete Note" onClick={() => { this.props.onRemoveKeep(keep.id) }}></button>
                    <button className='edit' title="Edit Note" onClick={this.toggleEdit}></button>
                    <button className='color' title="Change Note Color" onClick={this.toggleColor}></button>
                    <button className='mail' title="Send Note As Mail" onClick={this.onSendMail}></button>
                </div>
                {this.state.isEdit && <KeepEdit txt={keep.info.url} toggleEdit={this.toggleEdit} label={keep.info.title} onSaveChange={this.onSaveChange} />}
                {this.state.isColor && <NoteColorPicker toggleColor={this.toggleColor} onSetColor={this.onSetColor} />}
            </div>
        )

    }

}


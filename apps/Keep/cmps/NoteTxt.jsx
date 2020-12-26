import { KeepEdit } from "./KeepEdit.jsx";
import { keepService } from "../services/keepService.js";
import { NoteColorPicker } from "./NoteColorPicker.jsx";
import { mailService } from "../../Mail/services/mailService.js"
import { eventBusService } from "../../../services/eventBusService.js"



export class NoteTxt extends React.Component {

    state = {
        keep: {
            type: 'NoteText',
            info: {
                txt: ''
            }
        },

        isEdit: false,
        isColor: false
    };

    componentDidMount() {
        const { keep } = this.props
        this.setState({ keep })
    }

    toggleEdit = () => {

        this.setState({ isEdit: !this.state.isEdit })
    }
    toggleColor = () => {

        this.setState({ isColor: !this.state.isColor })
    }

    onSaveChange = (label, txt) => {//on submit
        const { keep } = { ...this.state }
        console.log(keep)

        if ('label' in keep.info) {
            keep.info.label = label
        }
        keep.info.txt = txt

        keepService.update(keep).then(savedKeep => {
            this.setState({ keep: savedKeep });
        })

    };

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
            title: 'Note from Keep',
            body: keep.info.txt
        }
        mailService.getKeep(keepToSend)
        eventBusService.showBusMsg('Sent To Mail')

    }




    render() {
        const keep = { ...this.state.keep }

        return (
            <section className='note note-txt flex align-center space-between ' style={keep.style}>
                <div>{keep.info.txt}</div>
                <div className='note btn-container flex'>
                    <button className='delete' onClick={() => { this.props.onRemoveKeep(keep.id) }}></button>
                    <button className='edit' onClick={this.toggleEdit}></button>
                    <button className='color' onClick={this.toggleColor}></button>
                    <button className='mail' onClick={this.onSendMail}></button>
                </div>

                {this.state.isEdit && <KeepEdit txt={keep.info.txt} toggleEdit={this.toggleEdit} label={null} onSaveChange={this.onSaveChange} />}
                {this.state.isColor && <NoteColorPicker toggleColor={this.toggleColor} onSetColor={this.onSetColor} />}
            </section>
        )

    }
}

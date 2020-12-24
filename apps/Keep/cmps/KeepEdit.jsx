import { keepService } from "../services/keepService.js";
import { EmptyNoteTodos } from "./EmptyNoteTodos.jsx"
import { EmptyNoteTxt } from "./EmptyNoteTxt.jsx"
import { EmptyNoteImg } from "./EmptyNoteImg.jsx"

export class KeepEdit extends React.Component {

    state = {
        keep: {
            type: null,
            info: null
        }
    };



    componentDidMount() {
        const { keepId } = this.props.match.params;
        if (!keepId) return;
        keepService.getKeepById(keepId).then(keep => {
            this.setState({ keep });
        });
    }

    onSaveKeep = (keep) => {
        keepService.save(keep).then(savedKeep => {
            console.log('Saves succesfully', savedKeep);
        }).then(this.props.history.push('/keep'))

    }


    render() {
        const keep = { ...this.state.keep };
        return (
            <section className='keep-edit'>
                <DynamicEmptyCmp keep={keep} onSubmit={this.onSaveKeep} />
            </section>
        );
    }
}


function DynamicEmptyCmp({ keep, onSubmit }) {
    switch (keep.type) {
        case 'NoteText':
            return <EmptyNoteTxt keep={keep} onSubmit={onSubmit} />
        case 'NoteImg':
            return <EmptyNoteImg keep={keep} onSubmit={onSubmit} />
        case 'NoteTodos':
            return <EmptyNoteTodos keep={keep} onSubmit={onSubmit} />
    }
    return <p>UNKNWON</p>
}
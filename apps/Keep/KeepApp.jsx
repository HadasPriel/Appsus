import { keepService } from "./services/keepService.js";
import { NoteTxt } from "./cmps/NoteTxt.jsx"
import { NoteTodos } from "./cmps/NoteTodos.jsx"
import { NoteImg } from "./cmps/NoteImg.jsx"
import { NoteFilter } from "./cmps/NoteFilter.jsx"

const { Link } = ReactRouterDOM;

export class KeepApp extends React.Component {

    state = {
        keeps: [],
        filterBy: {
            txt: '',
            type: 'All'
        }
    };

    componentDidMount() {
        this.loadKeeps();
    }

    loadKeeps = () => {
        keepService.query().then(keeps => {
            this.setState({ keeps });
        });
    }
    getKeepsForDisplay = () => {
        const { keeps, filterBy } = this.state
        if (!filterBy.txt && filterBy.type==='All') return keeps
        else {
            const filterRegex = new RegExp(filterBy.txt, 'i')
            return keeps.filter(keep => {
                if (keep.type === 'NoteText') return filterRegex.test(keep.info.txt)
                if (keep.type === 'NoteTodos') return filterRegex.test(keep.info.label) || ( keep.info.todos.find(todo => filterRegex.test(todo.txt)))
   
            })
        }
    }
    onRemoveKeep = (keepId) => {
        keepService.remove(keepId).then(() => {
            this.loadKeeps()
        })
    }

    onSetFilter = (filterBy) => {
        console.log('filterBy:', filterBy);
        this.setState({ filterBy });
    }

    render() {
        const keeps = this.getKeepsForDisplay()
        return (
            <section className="keep-app">
                <h1>Keeps</h1>
                <NoteFilter setFilter={this.onSetFilter} />
                <section className="notes-container">
                    {keeps.map((keep, idx) => <div key={idx}>
                        <DynamicSurveyCmp currCmp={keep.type} keepId={keep.id} info={keep.info} onRemoveKeep={this.onRemoveKeep} />
                    </div>)}
                </section>
            </section>
        );
    }

}


function DynamicSurveyCmp({ currCmp, info, keepId, onRemoveKeep }) {
    switch (currCmp) {
        case 'NoteText':
            return <NoteTxt info={info} keepId={keepId} onRemoveKeep={onRemoveKeep} />
        case 'NoteImg':
            return <NoteImg info={info} keepId={keepId} onRemoveKeep={onRemoveKeep} />
        case 'NoteTodos':
            return <NoteTodos info={info} keepId={keepId} onRemoveKeep={onRemoveKeep} />
    }
    return <p>UNKNWON</p>
}




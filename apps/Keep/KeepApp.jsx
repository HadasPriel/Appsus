import { keepService } from "./services/keepService.js";
import { NoteTxt } from "./cmps/NoteTxt.jsx"
import { NoteTodos } from "./cmps/NoteTodos.jsx"
import { NoteImg } from "./cmps/NoteImg.jsx"
import { NoteFilter } from "./cmps/NoteFilter.jsx"
import { KeepAdd } from "./cmps/KeepAdd.jsx";


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
        if (!filterBy.txt && filterBy.type === 'All') return keeps
        else if (filterBy.txt) {
            const filterRegex = new RegExp(filterBy.txt, 'i')
            return keeps.filter(keep => {
                if (keep.type === 'NoteText') return filterRegex.test(keep.info.txt)
                if (keep.type === 'NoteTodos') return filterRegex.test(keep.info.label) || (keep.info.todos.find(todo => filterRegex.test(todo.txt)))

            })
        } else if (filterBy.type !== 'All') {
            const filterRegex = new RegExp(filterBy.type, 'i')
            return keeps.filter(keep => filterRegex.test(keep.type))

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
            <section className="keep-app main-layout">
                <KeepAdd loadKeeps={this.loadKeeps} />
                <NoteFilter setFilter={this.onSetFilter} />
                <section className="notes-container">
                    {keeps.map((keep) => <div key={keep.id}>
                        <DynamicCmp keep={keep} onRemoveKeep={this.onRemoveKeep} loadKeeps={this.loadKeeps} />
                    </div>)}
                </section>
            </section>
        );
    }

}


function DynamicCmp({ keep, onRemoveKeep, loadKeeps }) {
    switch (keep.type) {
        case 'NoteText':
            return <NoteTxt keep={keep} onRemoveKeep={onRemoveKeep} loadKeeps={loadKeeps} />
        case 'NoteImg':
            return <NoteImg keep={keep} onRemoveKeep={onRemoveKeep} loadKeeps={loadKeeps} />
        case 'NoteTodos':
            return <NoteTodos keep={keep} onRemoveKeep={onRemoveKeep} loadKeeps={loadKeeps} />
    }
    return <p>UNKNWON</p>
}




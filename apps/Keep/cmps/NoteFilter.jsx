export class NoteFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            type: 'All'
        }
    };

    handleChange = (ev) => {
        const callback = () => {
            this.props.setFilter(this.state.filterBy);
        };

        const filterBy = { ...this.state.filterBy }
        filterBy[ev.target.name] = ev.target.value;

        this.setState({ filterBy }, callback);
    };

    render() {
        return <section className="keep-filter">
            <input type="text" name="txt"
                value={this.state.filterBy.txt}
                placeholder="Filter by text"
                autoComplete="off"
                onChange={this.handleChange} />
            <select value={this.state.filterBy.type} onChange={this.handleChange} name='type' >
                <option value='All'>All</option>
                <option value='NoteText'>Text</option>
                <option value='NoteImg'>Images</option>
                <option value='NoteTodos'>Lists</option>
            </select>
        </section>;
    }

}
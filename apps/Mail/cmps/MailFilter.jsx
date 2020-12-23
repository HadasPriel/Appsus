export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            isRead: null,
            folder: null
        }
    };

    handleChange = (ev) => {
        const filterBy = { ...this.state.filterBy }
        var value = ev.target.value
        if (ev.target.name === 'isRead') value = JSON.parse(value.toLowerCase())

        filterBy[ev.target.name] = value

        this.setState({ filterBy }, () => {
            this.props.setFilter(this.state.filterBy);
        });
    };

    // handleFolder = (folder) => {
    //     const filterBy = { ...this.state.filterBy }
    //     filterBy.folder = folder
    //     this.setState({ filterBy }, () => {
    //         this.props.setFilter(this.state.filterBy);
    //     });
    // }

    render() {
        return (
            <section className="mail-filter">
                <input type="text" name="txt" placeholder="Search mail"
                    autoComplete="off" onChange={this.handleChange} />
                <select type="text" name="isRead" onChange={this.handleChange} >
                    <option value="null">All</option>
                    <option value="true">Read</option>
                    <option value="false">Unread</option>
                </select>
                {/* <ul>
                    <li onClick={() => { this.handleFolder(all) }}>all</li>
                    <li onClick={() => { this.handleFolder(read) }}>read only</li>
                    <li onClick={() => { this.handleFolder(unread) }}>unread only</li>
                </ul> */}
            </section>
        )


    }

}
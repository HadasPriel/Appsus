export class MailFolder extends React.Component {

    state = {
        filterBy: {
            txt: '',
            isRead: null,
            folder: null
        }
    }

    handleChange = (ev) => {
        const filterBy = { ...this.state.filterBy }
        var value = ev.target.value
        if (value === 'All') value = null
        if (value === 'Read') value = true
        if (value === 'Unread') value = false
        // if (ev.target.name === 'isRead') value = JSON.parse(value.toLowerCase())

        filterBy[ev.target.name] = value

        this.setState({ filterBy }, () => {
            this.props.setFilter(this.state.filterBy);
        })
    }

    render() {
        return (
            <div className="folders">
                <span> <label className="pic"></label><input className="folder" type="button" name="isRead" value="All" onClick={this.handleChange} /></span>
                <span> <label className="pic"></label><input className="folder" type="button" name="isRead" value="Read" onClick={this.handleChange} /></span>
                <span> <label className="pic"></label><input className="folder" type="button" name="isRead" value="Unread" onClick={this.handleChange} /></span>
            </div>
        )
    }
}
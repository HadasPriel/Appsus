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
        if (value === 'All') value = null
        if (value === 'Read') value = true
        if (value === 'Unread') value = false
        console.log(ev);
        // if (ev.target.name === 'isRead') value = JSON.parse(value.toLowerCase())

        filterBy[ev.target.name] = value

        this.setState({ filterBy }, () => {
            this.props.setFilter(this.state.filterBy);
        });
    };

    render() {
        return (
            <section className="mail-filter">
                <input type="text" name="txt" placeholder="Search mail"
                    autoComplete="off" onChange={this.handleChange} />

                <input type="button" name="isRead" value="All" onClick={this.handleChange} />
                <input type="button" name="isRead" value="Read" onClick={this.handleChange} />
                <input type="button" name="isRead" value="Unread" onClick={this.handleChange} />
            </section>
        )


    }

}

export class MailCompose extends React.Component {

    state = {
        mail: {
            subject: '',
            body: '',
        }
    }
    refInput = React.createRef()

    componentDidMount() {
        this.refInput.current.focus()

    }

    onInputChange = (ev) => {
        const mail = { ...this.state.mail }
        mail[ev.target.name] = ev.target.value
        this.setState({
            mail: {
                subject: '',
                body: '',
            }
        });
    };

    onSaveMail = (ev) => {
        ev.preventDefault()

        if (!this.state.mail.subject) {
            let ans = confirm('Send this message without a subject?')
            if (!ans) return;
        }

        mailService.save(this.state.mail)
        this.setState({
            mail
        });
    }

    render() {
        return (
            <section>
                <form onSubmit={this.onSaveMail}>

                    <input value={this.state.mail.subject} ref={this.refInput}
                        placeholder="Subject" type="text" name="subject"
                        onChange={this.onInputChange} />

                    <input value={this.state.mail.body}
                        placeholder="Write your mail here..." type="text" name="body"
                        onChange={this.onInputChange} />

                    <button type="button" onClick={this.onAnimate}>Send</button>
                </form>
            </section>
        )
    }
}

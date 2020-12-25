import { mailService } from "../services/mailService.js"

export class MailCompose extends React.Component {

    state = {
        mail: {
            subject: '',
            body: '',
        }
    }
    refInput = React.createRef()

    componentDidMount() {
        console.log(this.props);
        const mailIdToEdit = this.props.match.params.mailId
        if (mailIdToEdit) {
            mailService.getById(mailIdToEdit)
                .then(mail => {
                    const copymail = { subject: 'Re: ' + mail.subject, body: mail.body }
                    this.setState({ mail: copymail })
                })
        }
        this.refInput.current.focus()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            console.log('UPDATE', this.props);
            this.loadPet()
        }
    }


    onInputChange = (ev) => {
        const mail = { ...this.state.mail }
        mail[ev.target.name] = ev.target.value
        this.setState({ mail })

    }

    onSaveMail = (ev) => {
        ev.preventDefault()

        if (!this.state.mail.subject) {
            let ans = confirm('Send this message without a subject?')
            if (!ans) return;
        }
        mailService.save(this.state.mail)

        this.setState({
            mail: {
                subject: '',
                body: '',
            }
        });
        this.props.history.push('/mail')
    }

    render() {
        return (
            <section className="mail-compose">
                <form onSubmit={this.onSaveMail}>

                    <input value={this.state.mail.subject} ref={this.refInput}
                        placeholder="Subject" type="text" name="subject"
                        onChange={this.onInputChange} />

                    <input value={this.state.mail.body}
                        placeholder="Write your mail here..." type="text" name="body"
                        onChange={this.onInputChange} />

                    <button>Send</button>
                </form>
            </section>
        )
    }
}

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
            this.loadMail()
        }
        this.refInput.current.focus()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            if (!this.props.match.params.mailId) {
                this.loadEmptyMail()
            } else {
                console.log('UPDATE', this.props);
                this.loadMail()
            }
        }
    }

    loadMail = () => {
        const mailIdToEdit = this.props.match.params.mailId
        mailService.getById(mailIdToEdit)
            .then(mail => {
                const copymail = { subject: 'Re: ' + mail.subject, body: mail.body }
                this.setState({ mail: copymail })
            })
    }

    loadEmptyMail = () => {
        this.setState({
            mail: {
                subject: '',
                body: '',
            }
        })
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
        this.loadEmptyMail()
        this.props.history.push('/mail')
    }

    close = () => {
        this.props.history.push('/mail')
    }

    render() {
        return (
            <section className="mail-compose main-layout">
                <form onSubmit={this.onSaveMail}>
                    <header><span>New Massage</span><span className="close" onClick={this.close}>x</span></header>

                    <input className="subject" value={this.state.mail.subject} ref={this.refInput}
                        placeholder="Subject" type="text" name="subject"
                        onChange={this.onInputChange} autoComplete="off" />

                    <textarea className="input body" value={this.state.mail.body}
                        placeholder="Write your mail here..." type="text" name="body"
                        onChange={this.onInputChange} rows="15" />

                    <button className="send">send </button>
                </form>
            </section>
        )
    }
}

import { mailService } from "../services/mailService.js";
const { Link } = ReactRouterDOM;


export class MailDetails extends React.Component {

    state = {
        mail: null
    };


    componentDidMount() {
        this.loadMail()
    }

    loadMail() {
        const { mailId } = this.props.match.params
        mailService.markAsRead(mailId)
        mailService.getById(mailId)
            .then(mail => { this.setState({ mail }) })
    }

    onBack = () => {
        this.props.history.goBack()
    };

    onRemove = () => {
        mailService.remove(this.state.mail.id)
        this.props.history.goBack()
    }

    onMove = (diff) => {
        const { mailId } = this.props.match.params
        mailService.getNextPrev(mailId, diff)
            .then(nextPrevMail => {
                this.props.history.push(`/mail/${nextPrevMail.id}`)
                this.setState({ mail: nextPrevMail })
            })
    }

    get mailDate() {
        let mailDate = new Date(this.state.mail.sentAt)
        return mailDate.toLocaleString()
    }


    render() {
        if (!this.state.mail) return <div>Loading..</div>
        const { id, subject, body } = this.state.mail
        var time = this.mailDate
        return (
            <article className="mail-details main-layout">
                <Link className="back" to={'/mail'}> back to inbox</Link>
                <h1 className="subject">{subject}</h1>
                <button className="delete" onClick={this.onRemove}></button>
                <Link className="edit" to={`/mail/edit/${this.state.mail.id}`}></Link>

                <h2 className="date">sent at: {time}</h2>
                <p className="body">{body}</p>
                <button onClick={() => { this.onMove(-1) }}>← Previous</button>
                <button onClick={() => { this.onMove(1) }}>Next →</button>


            </article>
        )
    }
}

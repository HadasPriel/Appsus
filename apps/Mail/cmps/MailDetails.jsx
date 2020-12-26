import { mailService } from "../services/mailService.js";
const { Link } = ReactRouterDOM;


export class MailDetails extends React.Component {

    state = {
        mail: null
    };


    componentDidMount() {
        console.log('here');
        this.loadMail()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            console.log('UPDATE', this.props);
            this.loadMail()
        }
    }

    loadMail() {
        const { mailId } = this.props.match.params
        console.log(this.props);
        mailService.markAsRead(mailId)
        mailService.getById(mailId)
            .then(mail => { this.setState({ mail }) })
    }

    onBack = () => {
        this.props.history.goBack()
    };

    onRemove = () => {
        mailService.remove(this.state.mail.id)
        this.props.history.push('/mail')
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
            <section className="mail-details main-layout">
                <nav>
                    <Link className="back" to={'/mail'}> back to inbox</Link>
                    <span className="nextprev">
                        <button className="prev" onClick={() => { this.onMove(-1) }}></button>
                        <button className="next" onClick={() => { this.onMove(1) }}></button>
                    </span>
                </nav>
                <article className="mail-body">
                    <h1 className="subject">{subject}</h1>
                    <Link className="edit" to={`/mail/edit/${this.state.mail.id}`}></Link>
                    <button className="delete" onClick={this.onRemove}></button>

                    <h2 className="date">sent at: {time}</h2>
                    <p className="body">{body}</p>
                    {/* <img src={`${this.state.mail.img}`}></img> */}

                </article>
            </section>
        )
    }
}

import { mailService } from "../services/mailService.js";
const { Link } = ReactRouterDOM;


export class MailDetails extends React.Component {

    state = {
        mail: null
    };

    // componentDidUpdate(prevProps) {
    //     console.log('UPDATE', this.props);
    //     if (prevProps.match.params.petId !== this.props.match.params.petId) {
    //         this.loadPet()
    //     }
    // }
    componentDidMount() {
        console.log('props', this.props)
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

    get mailDate() {
        let mailDate = new Date(this.state.mail.sentAt)
        console.log(mailDate.toLocaleString());
        return mailDate.toLocaleString()
    }


    render() {
        if (!this.state.mail) return <div>Loading..</div>
        const { id, subject, body } = this.state.mail
        var time = this.mailDate
        return (
            <article className="mail-details">
                <h1>{subject}</h1>
                <h2>sent at: {time}</h2>
                <p>{body}</p>

                <button onClick={this.onRemove}>delete email</button>

                <Link to={'/mail'}> inbox </Link>
            </article>
        )
    }
}

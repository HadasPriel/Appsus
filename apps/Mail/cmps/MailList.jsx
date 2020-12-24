// import { mailService } from "../services/mailService.js"
// import { MailStatus } from "./MailStatus.jsx";
import { MailPreview } from "./MailPreview.jsx";

export class MailList extends React.Component {
    // export function MailList({ mails, onRemove }) {
    state = {
        // readPercentage: null
    }

    componentDidMount() {
        // mailService.getReadPercentage()
        //     .then(readPercentage => { this.setState({ readPercentage }) })
    }



    render() {
        const { mails, onRemove } = this.props
        // const { readPercentage } = this.state
        return (
            <section className="mail-list">
                {mails.map(mail => {
                    return <MailPreview key={mail.id} mail={mail} onRemove={onRemove} />
                })}
                {/* <MailStatus readPercentage={readPercentage} /> */}
            </section>
        )
    }

}
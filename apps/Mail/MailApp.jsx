import { mailService } from "./services/mailService.js";
import { MailList } from './cmps/MailList.jsx';
import { MailFilter } from './cmps/MailFilter.jsx';
// import { MailCompose } from './cmps/MailCompose.jsx';
const { Link } = ReactRouterDOM;


export class MailApp extends React.Component {

    state = {
        mails: [],
        filterBy: {
            txt: '',
            isRead: null,
            folder: null
        }
    }

    componentDidMount() {
        this.loadMails()
    }


    loadMails = () => {
        mailService.query().then(mails => {
            this.setState({ mails })
        });
    }


    onRemoveMail = (mailId) => {
        mailService.remove(mailId).then(() => {
            this.loadMails()
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    }


    get mailsForDisplay() {
        // const { filterBy } = this.state;
        // const filterRegex = new RegExp(filterBy.txt, 'i');
        // return this.state.mails.filter(mail => filterRegex.test(mail.subject));


        const { mails, filterBy } = this.state
        const filterRegex = new RegExp(filterBy.txt, 'i')
        return mails.filter(mail => {
            let isTxtFit = filterRegex.test(mail.subject)
            let isReadFit = mail.isRead === filterBy.isRead

            if (!filterBy.txt) isTxtFit = true
            if (filterBy.isRead === null) isReadFit = true
            return isTxtFit && isReadFit
        });

    }


    render() {
        const mailsForDisplay = this.mailsForDisplay
        return (
            <section className="mail-app">
                <MailFilter setFilter={this.onSetFilter} />
                <Link to="/mail/edit">Compose</Link>
                <MailList mails={mailsForDisplay} onRemove={this.onRemoveMail} />
                {/* <MailCompose /> */}

            </section>
        );
    }
}
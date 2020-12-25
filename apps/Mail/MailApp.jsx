import { mailService } from "./services/mailService.js";
import { MailList } from './cmps/MailList.jsx';
import { MailFilter } from './cmps/MailFilter.jsx';
import { MailStatus } from "./cmps/MailStatus.jsx";
import { MailFolder } from "./cmps/MailFolder.jsx";
import { MailDetails } from './cmps/MailDetails.jsx'
import { MailCompose } from './cmps/MailCompose.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Link, Switch } = ReactRouterDOM;
// import { MailCompose } from './cmps/MailCompose.jsx';


export class MailApp extends React.Component {

    state = {
        mails: [],
        filterBy: {
            txt: '',
            isRead: null,
            folder: null
        },
        readPercentage: null

    }

    componentDidMount() {
        this.loadMails()
        this.getReadStatus()

    }
    componentDidUpdate(prevProps) {
        if (prevProps.match !== this.props.match) {
            this.loadMails()
            this.getReadStatus()
            if (!prevProps.match.params.mailId) return
            console.log('UPDATE', this.props);
            // this.loadMail()
        }
    }

    getReadStatus = () => {
        mailService.getReadPercentage()
            .then(readPercentage => { this.setState({ readPercentage }) })
    }

    loadMails = () => {
        mailService.query().then(mails => {
            this.setState({ mails })
        })
    }


    onRemoveMail = (mailId) => {
        mailService.remove(mailId).then(() => {
            this.loadMails()
        })
        this.getReadStatus()
    }

    onToggleRead = (mailId) => {
        mailService.toggleMark(mailId).then(() => {
            this.loadMails()
        })
        this.getReadStatus()
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy });
    }



    get mailsForDisplay() {
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
        const { readPercentage } = this.state
        const mailsForDisplay = this.mailsForDisplay
        return (
            <section className="mail-app main-layout">
                <MailFilter setFilter={this.onSetFilter} />
                <div className="bar-main">
                    <div className="bar-seconde">
                        <Link className="edit-btn" to="/mail/edit"> + Compose</Link>
                        <MailFolder setFilter={this.onSetFilter} />
                        <MailStatus readPercentage={readPercentage} />
                    </div>
                    <MailList mails={mailsForDisplay} onRemove={this.onRemoveMail} onToggleRead={this.onToggleRead} />
                </div>
                {/* <MailCompose /> */}
                <Router>
                    <Switch>
                        <Route path="/mail/edit/:mailId?" component={MailCompose} />
                        <Route path="/mail/:mailId" component={MailDetails} />
                    </Switch>
                </Router>
            </section>
        );
    }
}
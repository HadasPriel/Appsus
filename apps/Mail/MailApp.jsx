import { mailService } from "./services/mailService.js";
import { MailList } from './cmps/MailList.jsx';

export class MailApp extends React.Component {

    state = {
        mails: [],
        // filterBy: {
        //     subject: '',
        //     isRead: null,
        //     sentAt: null
        // },
    };

    componentDidMount() {
        this.loadMails();
    }

    // componentWillUnmount() {
    // }

    loadMails = () => {
        mailService.query().then(mails => {
            this.setState({ mails });
        });
    }


    onRemoveMail = (mailId) => {
        mailService.remove(mailId).then(() => {
            this.loadMails()
        })
    }

    // getPetsForDisplay = () => {
    //     const { filterBy } = this.state;
    //     const filterRegex = new RegExp(filterBy.name, 'i');
    //     return this.state.pets.filter(pet => filterRegex.test(pet.name));

    //     // Another way of doing filter
    //     // const txt = filterBy.name.toLowerCase()
    //     // return this.state.pets.filter(pet => {
    //     //     return pet.name.toLowerCase().includes(txt);
    //     // });
    // }

    get mailsForDisplay() {
        // const { filterBy } = this.state;
        // const filterRegex = new RegExp(filterBy.subject, 'i');
        // return this.state.mails.filter(mail => filterRegex.test(mail.subject));
        return this.state.mails
    }

    // onSetFilter = (filterBy) => {
    //     console.log('filterBy:', filterBy);
    //     this.setState({ filterBy });
    // }

    render() {
        // const petsForDisplay = this.getPetsForDisplay()
        const mailsForDisplay = this.mailsForDisplay;
        return (
            <section className="mail-app">

                In Mail App
                {/* <PetFilter setFilter={this.onSetFilter} /> */}
                {/* <Link className="btn" to="/pet/edit">Add Pet</Link>
                <h2>My Pets</h2> */}
                <MailList mails={mailsForDisplay} onRemove={this.onRemoveMail} />
            </section>
        );
    }
}
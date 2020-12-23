import { mailService } from "./services/mailService.js";

export class MailApp extends React.Component {

    state = {
        mails: [],
        // filterBy: {
        //     name: '',
        //     power: null
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


    // onRemovePet = (petId) => {
    //     petService.remove(petId).then(() => {
    //         this.loadPets()
    //     })
    // }

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

    // get petsForDisplay() {
    //     const { filterBy } = this.state;
    //     const filterRegex = new RegExp(filterBy.name, 'i');
    //     return this.state.pets.filter(pet => filterRegex.test(pet.name));
    // }

    // onSetFilter = (filterBy) => {
    //     console.log('filterBy:', filterBy);
    //     this.setState({ filterBy });
    // }

    render() {
        // const petsForDisplay = this.getPetsForDisplay()
        // const petsForDisplay = this.petsForDisplay;
        return (
            <section className="mail-app">

                In Mail App hadassasasa
                {/* <PetFilter setFilter={this.onSetFilter} />
                <Link className="btn" to="/pet/edit">Add Pet</Link>
                <h2>My Pets</h2>
                <PetList pets={petsForDisplay} onRemove={this.onRemovePet} /> */}
            </section>
        );
    }
}

const { Link } = ReactRouterDOM;

export class KeepApp extends React.Component {

    state = {
        pets: [],
        filterBy: {
            name: '',
            power: null
        },
    };

    // componentDidMount() {
    //    this.loadPets(); 
    // }

    // componentWillUnmount() {
    // }

    // loadPets = () => {
    //     petService.query().then(pets => {
    //         this.setState({ pets });
    //     });
    // }


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
            <section className="keep-app">
                {/* <PetFilter setFilter={this.onSetFilter} />
                <Link className="btn" to="/pet/edit">Add Pet</Link> */}
               In Keep App Sandra changed
                {/* <PetList pets={petsForDisplay} onRemove={this.onRemovePet} /> */}
            </section>
        );
    }
}
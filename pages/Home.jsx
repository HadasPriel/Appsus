

export class Home extends React.Component {
    
    state = {
        user: {
            score: 10,
            age: 20,
        },

        color: 'red'
    }

  

    render() {
        return (
            <section>
                <h2>Home Sweet Home</h2>
                <h3>{this.state.user.score}</h3>
             
            </section>
        )
    }
}
const { Link, NavLink } = ReactRouterDOM;

export class AppHeader extends React.Component {

    state = {
        display: false
    }

    toggle = () => {
        this.setState({ display: !this.state.display })
    }

    render() {
        var display = (this.state.display) ? '' : 'hide'
        return (
            <header className="app-header">
                <div className="header-content main-layout flex space-between align-center">
                    <Link className="logo" to={'/'}>Coogle</Link>
                    <nav>
                        <ul className={`header-nav clean-list flex ${display}`}>
                            <li><NavLink className="item home" exact to="/" title="Home" onClick={this.toggle}></NavLink></li>
                            <li><NavLink className="item mail" to="/mail" title="Mail" onClick={this.toggle}></NavLink></li>
                            <li><NavLink className="item keep" to="/keep" title="Keep" onClick={this.toggle}></NavLink></li>
                            <li className="item books" title="Books" onClick={this.toggle}></li>
                            <li className="item map disable" title="Map"></li>
                            <li className="item calander disable" title="Calander"></li>
                            <li className="item news disable" title="News"></li>
                            <li className="item photos disable" title="Photos"></li>
                            <li className="item contacts disable" title="Contacts"></li>
                        </ul>
                    </nav>
                    <button onClick={this.toggle} className="grid"></button>
                </div>
            </header >
        )
    }

}


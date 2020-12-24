const { Link, NavLink, withRouter } = ReactRouterDOM;



class _AppHeader extends React.Component {

    state = {
        msg: ''
    }


    render() {
        return <header className="app-header">
            <div className="header-content main-layout flex space-between align-center">
                <Link className="logo" to={'/'}></Link>
                <nav>
                    <ul className="header-nav clean-list flex align-center">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/mail">Mail</NavLink></li>
                        <li><NavLink to="/keep">Keep</NavLink></li>

                    </ul>
                </nav>
            </div>
        </header>
    }
}


export const AppHeader = withRouter(_AppHeader);
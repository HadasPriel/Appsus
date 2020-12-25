const { Link, NavLink } = ReactRouterDOM;


export function AppHeader() {

    //     function close() {
    // console.log('');
    //     }

    return (
        <header className="app-header">
            <div className="header-content main-layout flex space-between align-center">
                <Link className="logo" to={'/'}>logo</Link>
                <nav>
                    <ul className="header-nav clean-list flex">
                        <li><NavLink className="item home" exact to="/"></NavLink></li>
                        <li><NavLink className="item mail" to="/mail"></NavLink></li>
                        <li><NavLink className="item keep" to="/keep"></NavLink></li>
                        <li className="item"></li>
                        <li className="item"></li>
                        <li className="item"></li>
                        <li className="item"></li>
                        <li className="item"></li>
                        <li className="item"></li>
                    </ul>
                </nav>
                <button className="grid"></button>
                {/* <button onClick={this.close} className="grid"></button> */}
            </div>
        </header>
    )
}


const { NavLink, withRouter } = ReactRouterDOM;



class _AppHeader extends React.Component {

    state = {
        msg : ''
    }
 
   
    render() {
        return <header className="app-header">
            <nav>
                <ul>
                    <li><NavLink activeClassName="my-active" exact to="/">Home</NavLink></li>
                    <li><NavLink to="/mail">Mail</NavLink></li>
                    <li><NavLink to="/keep">Keep</NavLink></li>
                
                </ul>
                <div className="center">
                    <h1>My Appsus</h1>
                
                </div>
            </nav>
    
        </header>
    }
}


export const AppHeader = withRouter(_AppHeader);
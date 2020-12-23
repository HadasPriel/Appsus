
import { AppHeader } from './cmps/AppHeader.jsx';
import { KeepApp } from './apps/Keep/KeepApp.jsx'
import { MailApp } from './apps/Mail/MailApp.jsx'
import { Home } from './pages/Home.jsx'
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

// Simple React Component
export class RootCmp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <AppHeader />
                    <Switch>
                        <Route path="/keep" component={KeepApp} />
                        {/* <Route path="/mail/:mailId" component={MailDetails} /> */}
                        <Route path="/mail" component={MailApp} />
                        <Route path="/" component={Home} />
                    </Switch>

                </section>
            </Router>
        );
    }
}





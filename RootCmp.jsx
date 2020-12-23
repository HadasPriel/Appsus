
import { AppHeader } from './cmps/AppHeader.jsx';
import { KeepApp } from './apps/Keep/KeepApp.jsx'
import { MailApp } from './apps/Mail/MailApp.jsx'
import { MailDetails } from './apps/Mail/cmps/MailDetails.jsx'
import { MailCompose } from './apps/Mail/cmps/MailCompose.jsx';
import { Home } from './pages/Home.jsx'
const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;


export class RootCmp extends React.Component {

    render() {
        return (
            <Router>
                <section className="app">
                    <AppHeader />
                    <Switch>
                        <Route path="/keep" component={KeepApp} />
                        <Route path="/mail/edit" component={MailCompose} />
                        <Route path="/mail/:mailId" component={MailDetails} />
                        <Route path="/mail" component={MailApp} />
                        <Route path="/" component={Home} />
                    </Switch>

                </section>
            </Router>
        );
    }
}






import { AppHeader } from './cmps/AppHeader.jsx';
import { KeepApp } from './apps/Keep/KeepApp.jsx'
import { MailApp } from './apps/Mail/MailApp.jsx'
import { Home } from './pages/Home.jsx'
import { eventBusService } from "./services/eventBusService.js";
import { UserMsg } from './cmps/UserMsg.jsx';

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;


export class RootCmp extends React.Component {
    state = {
        msg: '',
        display: 'none'
    }

    componentDidMount() {
        this.unsubscribe = eventBusService.on('showMsg', (msg) => {
            this.setState({ msg });
        });
        this.unsubscribe = eventBusService.on('display', (display) => {
            this.setState({ display });
        });
    }

    render() {
        const { msg, display } = this.state;

        return (
            <Router>
                <section className="app">
                    <AppHeader />
                    <UserMsg msg={msg} display={display} />
                    <Switch>

                        <Route path="/keep" component={KeepApp} />
                        <Route path="/mail" component={MailApp} />
                        <Route path="/" component={Home} />
                    </Switch>

                </section>
            </Router>
        );
    }
}





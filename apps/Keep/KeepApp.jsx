import { keepService } from "./services/keepService.js";
import {NoteTxt} from "./cmps/NoteTxt.jsx"
import {NoteTodos} from "./cmps/NoteTodos.jsx"
import {NoteImg} from "./cmps/NoteImg.jsx"

const { Link } = ReactRouterDOM;

export class KeepApp extends React.Component {

    state = {
        keeps: [],
      
    };

    componentDidMount() {
       this.loadKeeps(); 
    }

    loadKeeps = () => {
        keepService.query().then(keeps => {
            this.setState({ keeps });
        });
    }

    render() {
        const { keeps } = this.state;
        return (
            <section className="keep-app">
                <h1>Keeps</h1>

                <form>
                   {keeps.map((keep, idx) => <div key={idx}>
                        <DynamicSurveyCmp currCmp={keep.type} info={keep.info} />
                    </div>)}
                </form>
            </section>
        );
    }
    
}


function DynamicSurveyCmp({ currCmp, info}) {
    switch (currCmp) {
        case 'NoteText':
            return <NoteTxt info={info}/>
        case 'NoteImg':
            return   <NoteImg info={info}/>
        case 'NoteTodos':
            return <NoteTodos info={info}/>
    }
    return <p>UNKNWON</p>
}



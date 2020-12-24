export class UserMsg extends React.Component {

    render() {
        return (
            <section className={`user-msg ${this.props.display}`}>
                <p className="msg">{this.props.msg}</p>
            </section>
        )
    }
}
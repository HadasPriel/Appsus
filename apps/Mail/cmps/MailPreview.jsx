import { eventBusService } from "../../../services/eventBusService.js";

const { Link } = ReactRouterDOM;


export function MailPreview({ mail, onRemove, onToggleRead }) {


    function remove() {
        onRemove(mail.id)
        eventBusService.emit('showMsg', 'mail deleted')
        eventBusService.emit('display', '')
        setTimeout(() => {
            eventBusService.emit('showMsg', '')
            eventBusService.emit('display', 'none')
        }, 2000)
    }


    const readClass = (mail.isRead) ? 'read' : 'unread'
    return (
        <article className={`mail-preview ${readClass} flex space-between`}>
            <Link to={`/mail/${mail.id}`}>
                <span className="subject">{mail.subject} </span>
                <span className="body">{mail.body.substring(0, 79)}</span>
            </Link>
            <div className="bar">
                <Link className="edit" to={`/mail/edit/${mail.id}`}></Link>
                <button className="read-sign" onClick={() => { onToggleRead(mail.id) }}></button>
                <button className="delete" onClick={remove} ></button>
            </div>

        </article>
    )

}


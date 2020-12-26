import { eventBusService } from "../../../services/eventBusService.js";
import { keepService } from "../../Keep/services/keepService.js";

const { Link } = ReactRouterDOM;


export function MailPreview({ mail, onRemove, onToggleRead }) {


    function remove() {
        onRemove(mail.id)
        eventBusService.showBusMsg('Mail Deleted')
    }



    function onSendKeep() {
        const mailToKeep = {
            subject: mail.subject,
            body: mail.body
        }
        keepService.getMail(mailToKeep)
        eventBusService.showBusMsg('Sent To Keep')
    }

    const readClass = (mail.isRead) ? 'read' : 'unread'
    return (
        <article className={`mail-preview ${readClass} flex space-between`}>
            <Link className="txt" to={`/mail/${mail.id}`}>
                <span className="subject">{mail.subject} </span>
                <span className="body">{mail.body.substring(0, 79)}</span>
            </Link>
            <div className="bar">
                <Link className="edit" to={`/mail/edit/${mail.id}`}></Link>
                <button className="read-sign" onClick={() => { onToggleRead(mail.id) }}></button>
                <button className="delete" onClick={remove} ></button>
                <button className="keep" onClick={onSendKeep} ></button>
            </div>

        </article>
    )

}


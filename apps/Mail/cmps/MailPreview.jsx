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
    // const date = JSON.parse(mail.sentAt)
    // console.log(date);
    // const currDate = getMonth(date) + ', ' + date.getYear()
    return (
        <article className={`mail-preview ${readClass} flex space-between`}>
            <Link className="txt" to={`/mail/${mail.id}`}>
                <span className="subject">{mail.subject} </span>
                <span className="body">{mail.body.substring(0, 79)}</span>
            </Link>
            {/* <span>{currDate}</span> */}
            <div className="bar">
                <button><Link className="edit" title="Replay" to={`/mail/edit/${mail.id}`}></Link></button>
                <button className="read-sign" title="Mark as read" onClick={() => { onToggleRead(mail.id) }}></button>
                <button className="delete" title="Delete" onClick={remove} ></button>
                <button className="keep" title="Save as Keep" onClick={onSendKeep} ></button>
            </div>

        </article>
    )

}


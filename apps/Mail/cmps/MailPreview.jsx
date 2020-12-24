const { Link } = ReactRouterDOM;


export function MailPreview({ mail, onRemove }) {

    const readClass = (mail.isRead) ? 'read' : 'unread'
    return (
        <article className={`mail-preview ${readClass} flex space-between`}>
            <Link to={`/mail/${mail.id}`}>
                <div>{mail.subject} </div>
            </Link>
            <div className="bar">
                <button className="delete" onClick={() => { onRemove(mail.id) }} ></button>
                <button className={`read-sign`}></button>
            </div>

        </article>
    )

}


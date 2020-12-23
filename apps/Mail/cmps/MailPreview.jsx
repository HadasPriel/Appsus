const { Link } = ReactRouterDOM;


export function MailPreview({ mail, onRemove }) {

    const readClass = (mail.isRead) ? '' : 'unread'
    return (
        <article className={`mail-preview ${readClass}`}>
            <Link to={`/mail/${mail.id}`}>
                <div>{mail.subject} </div>
            </Link>
            <div>
                {/* <Link to={`/pet/edit/${pet.id}`}>Edit Pet</Link> */}
                <button onClick={() => { onRemove(mail.id) }} >Remove</button>
            </div>

        </article>
    )

}


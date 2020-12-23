import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemove }) {

    return (
        <section className="mail-list">
            {mails.map(mail => {
                return <MailPreview key={mail.id} mail={mail} onRemove={onRemove} />;
            })
            }
        </section>
    );
}
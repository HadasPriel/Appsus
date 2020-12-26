

// export class MailStatus extends React.Component {
export function MailStatus({ readPercentage }) {

    const colorClass = (readPercentage > 20) ? 'bright' : 'dark'
    return (
        <div className={`status ${colorClass}`} style={{ background: `linear-gradient(110deg, rgb(185, 164, 148) ${readPercentage}%, rgba(204, 185, 171, 0.109) ${readPercentage + 10}%)` }}>
            {readPercentage}%</div>
    )
}

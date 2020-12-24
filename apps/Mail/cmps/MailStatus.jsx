

// export class MailStatus extends React.Component {
export function MailStatus({ readPercentage }) {

    const colorClass = (readPercentage > 20) ? 'bright' : 'dark'
    return (
        <div className={`status ${colorClass}`} style={{ background: `linear-gradient(110deg, rgba(18,43,63,1) ${readPercentage}%, rgba(203,222,233,1) ${readPercentage + 10}%)` }}>
            {readPercentage}%</div>
    )
}

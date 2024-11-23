export function parseTime(dateString: string): React.ReactNode {
    // //console.log(dateString);
    const date = new Date(dateString);
    const options = {
        // timeZone: 'America/Chicago', // CST time zone
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    }
    const formatDate = date.toLocaleString('en-US', options)
    return formatDate
}
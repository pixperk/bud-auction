import {differenceInDays, differenceInHours, differenceInMinutes} from "date-fns"

export function formatDate(date: Date) {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
            return formatter.format(-count, interval.label as Intl.RelativeTimeFormatUnit);
        }
    }

    return 'just now';
}

export function formatTimeDifference(date: Date): string {
    const now = new Date();

    // Calculate days, hours, and minutes differences
    const days = differenceInDays(now, date);
    const hours = differenceInHours(now, date) % 24;
    const minutes = differenceInMinutes(now, date) % 60;

    const formattedParts = [
        days > 0 ? `${days}d` : '',
        hours > 0 ? `${hours}h` : '',
        minutes > 0 ? `${minutes}m` : '',
    ].filter(Boolean);

    return formattedParts.join(' ') || '0m';
}



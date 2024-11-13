import { formatDistance } from 'date-fns'

export function formatDate(date: Date) {
    return formatDistance(date, new Date(), { addSuffix: true })
}

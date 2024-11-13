export function toDollars (cents:number){
    return Number((cents/100).toFixed(2))
}
export abstract class DateProvider {
  abstract compareInHours(start_date: Date, end_date: Date): number
  abstract dateNow(): Date
  abstract compareInDays(start_date: Date, end_date: Date): number
  abstract addDays(days: number): Date
  abstract addHours(hours: number): Date
  abstract compareIfBefore(start_date: Date, end_date: Date): boolean
}

import { Injectable } from '@nestjs/common'
import * as dayjs from 'dayjs'

import { DateProvider } from '../date.provider'

@Injectable()
export class DayjsDateProvider implements DateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    return dayjs(start_date).diff(end_date, 'hours')
  }

  dateNow(): Date {
    return dayjs().toDate()
  }

  compareInDays(start_date: Date, end_date: Date): number {
    return dayjs(start_date).diff(end_date, 'days')
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date)
  }
}

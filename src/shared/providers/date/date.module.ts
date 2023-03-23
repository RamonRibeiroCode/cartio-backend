import { Module } from '@nestjs/common'
import { DayjsDateProvider } from './implementations/dayjs.provider'
import { DateProvider } from './date.provider'

@Module({
  exports: [{ provide: DateProvider, useClass: DayjsDateProvider }],
  providers: [{ provide: DateProvider, useClass: DayjsDateProvider }],
})
export class DateModule {}

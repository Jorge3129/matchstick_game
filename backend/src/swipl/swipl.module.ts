import { Global, Module } from '@nestjs/common';
import { SwiplService } from './swipl.service';

@Global()
@Module({
  providers: [SwiplService],
  exports: [SwiplService],
})
export class SwiplModule {}

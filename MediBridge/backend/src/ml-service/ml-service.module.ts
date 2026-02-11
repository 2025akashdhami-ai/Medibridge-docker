import { Module } from '@nestjs/common';
import { MlServiceService } from './ml-service.service';
import { MlServiceController } from './ml-service.controller';

@Module({
  controllers: [MlServiceController],
  providers: [MlServiceService],
  exports: [MlServiceService],
})
export class MlServiceModule {}



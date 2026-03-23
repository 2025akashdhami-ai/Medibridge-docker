import { Controller, Post, Body } from '@nestjs/common';
import { MlServiceService } from './ml-service.service';

@Controller('ml')
export class MlServiceController {
  constructor(private mlService: MlServiceService) {}

  @Post('predict')
  async predict(@Body() body: { symptoms: string }) {
    return this.mlService.predictDisease(body.symptoms);
  }
}



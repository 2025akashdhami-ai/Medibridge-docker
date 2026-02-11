import { Controller, Get, Put, Body, UseGuards, Request, Param } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateResourcesDto } from './dto/hospitals.dto';

@Controller('hospitals')
export class HospitalsController {
  constructor(private hospitalsService: HospitalsService) {}

  @Get()
  async getAllHospitals() {
    return this.hospitalsService.findAll();
  }

  @Get(':id')
  async getHospital(@Param('id') id: string) {
    return this.hospitalsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('hospital')
  @Put('resources')
  async updateResources(@Request() req, @Body() updateDto: UpdateResourcesDto) {
    // Find hospital by email from JWT token
    const hospital = await this.hospitalsService.findByEmail(req.user.email);
    if (!hospital) {
      throw new Error('Hospital not found');
    }
    return this.hospitalsService.updateResources(hospital._id.toString(), updateDto);
  }
}


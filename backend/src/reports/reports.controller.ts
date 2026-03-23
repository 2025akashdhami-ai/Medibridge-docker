import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateReportDto } from './dto/reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  async createReport(@Request() req, @Body() createDto: CreateReportDto) {
    return this.reportsService.create({
      ...createDto,
      user_id: req.user.userId,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get('my-reports')
  async getMyReports(@Request() req) {
    return this.reportsService.findByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('hospital')
  @Get('all')
  async getAllReports() {
    return this.reportsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getReport(@Param('id') id: string) {
    return this.reportsService.findById(id);
  }
}



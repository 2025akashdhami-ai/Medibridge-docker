import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Report, ReportDocument } from '../schemas/report.schema';

@Injectable()
export class ReportsService {
  constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) {}

  async create(reportData: Partial<Report>) {
    const report = new this.reportModel(reportData);
    return report.save();
  }

  async findByUserId(userId: string) {
    return this.reportModel.find({ user_id: userId }).sort({ createdAt: -1 }).exec();
  }

  async findAll() {
    return this.reportModel.find().populate('user_id', 'name email age').sort({ createdAt: -1 }).exec();
  }

  async findById(id: string) {
    return this.reportModel.findById(id).populate('user_id', 'name email age').exec();
  }
}



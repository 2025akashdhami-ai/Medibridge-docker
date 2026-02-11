import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hospital, HospitalDocument } from '../schemas/hospital.schema';

@Injectable()
export class HospitalsService {
  constructor(@InjectModel(Hospital.name) private hospitalModel: Model<HospitalDocument>) {}

  async findAll() {
    return this.hospitalModel.find().exec();
  }

  async findById(id: string) {
    return this.hospitalModel.findById(id).exec();
  }

  async updateResources(id: string, resources: Partial<Hospital>) {
    return this.hospitalModel.findByIdAndUpdate(id, resources, { new: true }).exec();
  }

  async findByEmail(email: string) {
    return this.hospitalModel.findOne({ email }).exec();
  }
}



import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { ReportsModule } from './reports/reports.module';
import { MlServiceModule } from './ml-service/ml-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/medibridge'),
    AuthModule,
    UsersModule,
    HospitalsModule,
    ReportsModule,
    MlServiceModule,
  ],
})
export class AppModule {}



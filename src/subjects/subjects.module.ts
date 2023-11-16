import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subject]), TeachersModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}

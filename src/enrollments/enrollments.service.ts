import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Enrollment } from './entities/enrollment.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    private subjectsServices: SubjectsService,
  ) {}
  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { subjectId, ...enrollmentData } = createEnrollmentDto;
    const subject = await this.subjectsServices.findOne(subjectId);
    // this.subjectsServices.findOne
    // console.log(subjectId, subject);
    const newEnrollment = this.enrollmentsRepository.create({
      ...enrollmentData,
      subject: subject,
    });
    return this.enrollmentsRepository.save(newEnrollment);
  }

  findAll() {
    return this.enrollmentsRepository.find({relations: ['subject']});
  }

  findOne(id: number) {
    return this.enrollmentsRepository.findOne({ where: { id } });
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}

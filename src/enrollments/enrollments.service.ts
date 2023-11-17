import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Enrollment } from './entities/enrollment.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    private subjectsService: SubjectsService,
    private studentsService: StudentsService,
  ) {}
  async create(createEnrollmentDto: CreateEnrollmentDto) {
    // funciona para cursos y matricula
    // const { subjectId, semester } = createEnrollmentDto;
    // const subject = await this.subjectsServices.findOne(subjectId);
    // console.log(subject);
    // const newEnrollment = this.enrollmentsRepository.create({
    //   semester,
    //   subjects: [subject],
    // });
    // return this.enrollmentsRepository.save(newEnrollment);

    const { subjectsId, semester, studentId } = createEnrollmentDto;
    const subjects = await this.subjectsService.findMany(subjectsId);

    const student = await this.studentsService.findOne(studentId);
    const newEnrollment = this.enrollmentsRepository.create({
      semester,
      subjects,
      student,
    });
    return this.enrollmentsRepository.save(newEnrollment);

    // const { subjectId, ...enrollmentData } = createEnrollmentDto;
    // const subject = await this.subjectsServices.findOne(subjectId);
    // // this.subjectsServices.findOne
    // // console.log(subjectId, subject);
    // const newEnrollment = this.enrollmentsRepository.create({
    //   ...enrollmentData,
    //   subject: subject,
    // });
    // return this.enrollmentsRepository.save(newEnrollment);
  }

  findAll() {
    return this.enrollmentsRepository.find({ relations: ['student'] });
  }

  findOne(id: number) {
    return this.enrollmentsRepository.findOne({
      where: { id },
      relations: ['student'],
    });
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}

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
    const { subjectsId, semester, studentId } = createEnrollmentDto;
    const subjects = await this.subjectsService.findMany(subjectsId);

    const student = await this.studentsService.findOne(studentId);
    const newEnrollment = this.enrollmentsRepository.create({
      semester,
      subjects,
      student,
    });
    return this.enrollmentsRepository.save(newEnrollment);
  }

  findAll() {
    return this.enrollmentsRepository.find({ relations: ['student', 'subjects'] });
  }

  findOne(id: number) {
    return this.enrollmentsRepository.findOne({
      where: { id },
      relations: ['student', 'subjects'],
    });
  }
  private convertSemester(number) {
    const yearPart = String(number).slice(0, 4);
    const monthPart = String(number).slice(-1);
    return `${yearPart}-${monthPart}`;
  }
  async findEnrollmentSubjects(id: number, semester: number) {
    const student = await this.studentsService.findOne(id);
    const enrollment = await this.enrollmentsRepository.findOne({
      relations: { subjects: true },
      where: { semester: this.convertSemester(semester), student: { id } },
    });
    return { student, enrolled_courses: enrollment.subjects };
  }
  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}

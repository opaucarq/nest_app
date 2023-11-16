import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}
  create(createStudentDto: CreateStudentDto) {
    const newStudent = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(newStudent);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const foundStudent = await this.studentsRepository.findOne({
      where: { id },
    });
    if (!foundStudent) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.studentsRepository.merge(foundStudent, updateStudentDto);
    return this.studentsRepository.save(foundStudent);
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}

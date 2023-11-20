import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  private async findStudentById(id: number): Promise<Student> {
    const foundStudent = await this.studentsRepository.findOne({
      where: { id },
    });
    if (!foundStudent) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return foundStudent;
  }
  private async findStudentByEmail(email: string): Promise<Student> {
    const foundStudent = await this.studentsRepository.findOne({
      where: { email },
    });
    return foundStudent;
  }

  async create(createStudentDto: CreateStudentDto) {
    const { firstname, lastname, email } = createStudentDto;
    if (!firstname || !lastname) {
      throw new HttpException('Invalid input data', HttpStatus.BAD_REQUEST);
    }
    const existingStudent = await this.findStudentByEmail(email);
    if (existingStudent) {
      throw new HttpException(
        'Student with the same email already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newStudent = this.studentsRepository.create(createStudentDto);
    return this.studentsRepository.save(newStudent);
  }

  findAll() {
    return this.studentsRepository.find({
      select: ['id', 'firstname', 'lastname', 'email'],
    });
  }

  async findOne(id: number) {
    return await this.findStudentById(id);
  }

  async findEnrollments(id: number) {
    return this.studentsRepository.findOne({
      where: { id },
      select: ['id', 'firstname', 'lastname'],
      relations: ['enrollments'],
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const foundStudent = await this.findStudentById(id);
    console.log(foundStudent.email, updateStudentDto.email);
    if (
      updateStudentDto.email &&
      foundStudent.email !== updateStudentDto.email
    ) {
      const existingStudent = await this.studentsRepository.findOne({
        where: { email: updateStudentDto.email },
      });
      if (existingStudent) {
        throw new HttpException(
          'Email address already registered for another student',
          HttpStatus.CONFLICT,
        );
      }
    }
    await this.studentsRepository.update(id, updateStudentDto);
    const updatedStudent = await this.findStudentById(id);

    return updatedStudent;
  }

  async remove(id: number) {
    await this.findStudentById(id);
    const deletedUser = await this.studentsRepository.delete({ id });
    if (deletedUser.affected) {
      throw new HttpException('Student deleted successfully', HttpStatus.OK);
    }
  }
}

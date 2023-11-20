import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}
  async findTeacherById(id: number): Promise<Teacher> {
    const existingTeacher = await this.teachersRepository.findOne({
      where: { id },
    });
    if (!existingTeacher) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return existingTeacher;
  }
  async create(createTeacherDto: CreateTeacherDto) {
    try {
      const { fullname } = createTeacherDto;
      if (fullname === undefined) {
        throw new HttpException('Fill fullname input', HttpStatus.BAD_REQUEST);
      }
      if (!fullname || fullname.trim().length === 0) {
        throw new HttpException(
          'Fullname should not be empty',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newTeacher = this.teachersRepository.create(createTeacherDto);
      return this.teachersRepository.save(newTeacher);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.teachersRepository.find();
  }

  findOne(id: number) {
    return this.teachersRepository.findOne({
      where: { id },
      relations: ['subjects'],
    });
  }
}

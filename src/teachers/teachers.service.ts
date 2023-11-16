import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTeacherDto } from './dto/create-teacher.dto';
// import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}
  async create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = this.teachersRepository.create(createTeacherDto);
    return this.teachersRepository.save(newTeacher);
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

  // update(id: number, updateTeacherDto: UpdateTeacherDto) {
  //   return `This action updates a #${id} teacher`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} teacher`;
  // }
}

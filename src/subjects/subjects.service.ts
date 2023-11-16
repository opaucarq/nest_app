import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
// import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
    private teachersService: TeachersService,
  ) {}
  async create(createSubjectDto: CreateSubjectDto) {
    const { teacherId, ...subjectData } = createSubjectDto;
    const teacher = await this.teachersService.findOne(teacherId);
    const newSubject = this.subjectsRepository.create({
      ...subjectData,
      teacher: teacher,
    });
    return this.subjectsRepository.save(newSubject);
  }

  findAll() {
    return this.subjectsRepository.find();
  }

  findOne(id: number) {
    return this.subjectsRepository.findOne({
      where: { id },
      relations: ['teacher'],
    });
  }

  // update(id: number, updateSubjectDto: UpdateSubjectDto) {
  //   return `This action updates a #${id} subject`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} subject`;
  // }
}

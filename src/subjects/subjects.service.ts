import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
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
    const teacher = await this.teachersService.findTeacherById(teacherId);
    const newSubject = this.subjectsRepository.create({
      ...subjectData,
      teacher,
    });
    const savedSubject = await this.subjectsRepository.save(newSubject);
    const simplifiedSubject = {
      id: savedSubject.id,
      name: savedSubject.name,
    };
    return simplifiedSubject;
  }

  findAll() {
    return this.subjectsRepository.find();
  }

  findOne(id: number) {
    return this.findSubjectById(id);
  }
  findMany(ids: number[]) {
    return this.subjectsRepository.findByIds(ids);
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const { teacherId } = updateSubjectDto;
    if (teacherId === undefined) {
      throw new HttpException('Fill teacherId input', HttpStatus.BAD_REQUEST);
    }
    const teacher = await this.teachersService.findTeacherById(teacherId);
    await this.findOne(id);
    await this.subjectsRepository.update(id, { teacher });
    const updatedSubject = await this.findOne(id);

    return updatedSubject;
  }
  private async findSubjectById(id: number): Promise<Subject> {
    const foundSubject = await this.subjectsRepository.findOne({
      where: { id },
      relations: ['teacher'],
    });
    if (!foundSubject) {
      throw new HttpException('Subject not found', HttpStatus.NOT_FOUND);
    }
    return foundSubject;
  }
}

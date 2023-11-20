import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly studentsService: StudentsService,
  ) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const createdStudent = await this.studentsService.create(createStudentDto);
    await this.cacheManager.del('students_all');
    return createdStudent;
  }

  @Get()
  async findAll() {
    const cachedData = await this.cacheManager.get('students_all');
    if (cachedData) return cachedData;
    const students = await this.studentsService.findAll();
    await this.cacheManager.set('students_all', students);
    return students;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cachedData = await this.cacheManager.get(`student_${id}`);
    if (cachedData) return cachedData;
    const student = await this.studentsService.findOne(id);
    await this.cacheManager.set(`student_${id}`, student);
    return student;
  }

  @Get(':id/enrollments')
  findEnrollments(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findEnrollments(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.remove(id);
  }
}

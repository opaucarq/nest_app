import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly teachersService: TeachersService,
  ) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    const createdTeacher = await this.teachersService.create(createTeacherDto);
    await this.cacheManager.del('teachers_all');
    return createdTeacher;
  }

  @Get()
  async findAll() {
    const cachedData = await this.cacheManager.get('teachers_all');
    if (cachedData) return cachedData;

    const teachers = await this.teachersService.findAll();
    await this.cacheManager.set('teachers_all', teachers);
    return teachers;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cachedData = await this.cacheManager.get(`teacher_${id}`);
    if (cachedData) return cachedData;
    const teacher = await this.teachersService.findOne(id);
    await this.cacheManager.set(`teacher_${id}`, teacher);
    return teacher;
  }
}

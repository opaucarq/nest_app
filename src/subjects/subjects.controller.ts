import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly subjectsService: SubjectsService,
  ) {}

  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    const createdSubject = await this.subjectsService.create(createSubjectDto);
    await this.cacheManager.del('subjects_all');
    return createdSubject;
  }

  @Get()
  async findAll() {
    const cachedData = await this.cacheManager.get('subjects_all');
    if (cachedData) return cachedData;

    const subjects = await this.subjectsService.findAll();
    await this.cacheManager.set('subjects_all', subjects);
    return subjects;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cachedData = await this.cacheManager.get(`subject_${id}`);
    if (cachedData) return cachedData;
    const subject = await this.subjectsService.findOne(id);
    await this.cacheManager.set(`subject_${id}`, subject);
    return subject;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectsService.update(id, updateSubjectDto);
  }
}

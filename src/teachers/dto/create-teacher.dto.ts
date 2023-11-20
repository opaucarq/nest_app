import { Subject } from 'src/subjects/entities/subject.entity';

export class CreateTeacherDto {
  fullname: string;
  subjects?: Subject[];
}

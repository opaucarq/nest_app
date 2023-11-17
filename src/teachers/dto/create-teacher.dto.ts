import { Subject } from 'src/subjects/entities/subject.entity';

export class CreateTeacherDto {
  name: string;
  subjects?: Subject[];
}

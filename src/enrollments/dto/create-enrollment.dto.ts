import { Subject } from 'src/subjects/entities/subject.entity';

export class CreateEnrollmentDto {
  semester: string;
  studentId: number;
  subjectsId?: number[];
  // subjects?: Subject[];
}

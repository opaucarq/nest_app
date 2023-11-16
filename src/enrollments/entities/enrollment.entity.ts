import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Subject } from 'src/subjects/entities/subject.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  semester: string;
  @ManyToOne(() => Subject, (subject) => subject.enrollments)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;
}

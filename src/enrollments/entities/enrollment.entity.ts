import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Subject } from 'src/subjects/entities/subject.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  semester: string;
  @OneToMany(() => Subject, (subject) => subject.enrollment)
  subjects: Subject[];
  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}

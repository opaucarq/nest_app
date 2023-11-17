import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Enrollment } from 'src/enrollments/entities/enrollment.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;
  @ManyToOne(() => Enrollment, (enrollment) => enrollment.subjects)
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: Enrollment;
}

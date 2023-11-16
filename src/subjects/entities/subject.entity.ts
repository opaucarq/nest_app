import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Teacher } from 'src/teachers/entities/teacher.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;
}

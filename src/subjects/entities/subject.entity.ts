import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Teacher } from 'src/teachers/entities/teacher.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
  teacher: Teacher;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Subject } from 'src/subjects/entities/subject.entity';

@Entity({ name: 'teachers' })
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects: Subject[];
}

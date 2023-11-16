import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

import { Enrollment } from 'src/enrollments/entities/enrollment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column({ unique: true })
  email: string;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @OneToMany(() => Enrollment, (enrollment) => enrollment.student, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  enrollments: Enrollment[];
}

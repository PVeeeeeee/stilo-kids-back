import { 
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
 } from "typeorm";

@Entity('clothing_types')
export class Clothing_types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, name: 'type' })
  name: string;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
import { 
  Column,
  Entity,
  PrimaryGeneratedColumn,
 } from "typeorm";

@Entity('clothing_sizes')
export class Clothing_sizes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, name: 'size' })
  name: string;

}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: true })
  name: string;

  @Column('text')
  phone: string;

  @Column('uuid')
  uuid: string;

  @Column('text', { nullable: true })
  confirmationCode: string;

  @Column('boolean', { default: false })
  isConfirmed: boolean;
}

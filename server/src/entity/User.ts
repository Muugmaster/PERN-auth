import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text', select: false })
  password: string

  @Column({ type: 'timestamp', default: new Date() })
  createdAt: number

  @Column('int', { default: 0 })
  tokenVersion: number
}

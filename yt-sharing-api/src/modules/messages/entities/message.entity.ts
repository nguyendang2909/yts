import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CommonEntity } from '../../../commons/entities/common.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Message extends CommonEntity {
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ type: 'varchar', nullable: false })
  url!: string;

  @Column({ name: 'title', type: 'varchar', nullable: true })
  title?: string;

  @Column({ name: 'author_name', type: 'varchar', nullable: true })
  author_name: string;

  @Column({ name: 'author_url', type: 'varchar', nullable: true })
  author_url: string;

  @Column({ name: 'type', type: 'varchar', nullable: true })
  type: string;

  @Column({ name: 'height', type: 'integer', nullable: true })
  height: number;

  @Column({ name: 'width', type: 'integer', nullable: true })
  width: number;

  @Column({ name: 'version', type: 'varchar', nullable: true })
  'version': string;

  @Column({ name: 'provider_name', type: 'varchar', nullable: true })
  'provider_name': string;

  @Column({ name: 'provider_url', type: 'varchar', nullable: true })
  'provider_url': string;

  @Column({ name: 'thumbnail_height', type: 'integer', nullable: true })
  'thumbnail_height': number;

  @Column({ name: 'thumbnail_width', type: 'integer', nullable: true })
  thumbnail_width: number;

  @Column({ name: 'thumbnail_url', type: 'varchar', nullable: true })
  thumbnail_url: string;

  @Column({ name: 'html', type: 'text', nullable: true })
  html: string;
}

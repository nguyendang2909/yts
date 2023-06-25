import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../commons/entities/base.entity';
import { EntityFactory } from '../../../commons/lib/entity-factory';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ name: 'email', length: 100, nullable: true, type: 'varchar' })
  email?: string;

  @Column({ name: 'password', type: 'varchar' })
  password!: string;

  constructor(obj: Partial<User>) {
    super();

    Object.assign(this, obj);
  }
}

export const userEntityName = EntityFactory.getEntityName(User);

import { Injectable } from '@nestjs/common';
import _ from 'lodash';

import { UserEntity } from './users-entity.service';

@Injectable()
export class UsersService {
  constructor(private readonly userEntity: UserEntity) {}

  public async getProfile(userId: string) {
    const user = await this.userEntity.findOne({
      where: {
        id: userId,
      },
    });

    return _.omit(user, ['password']);
  }
}

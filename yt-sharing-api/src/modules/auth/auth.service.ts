import { Injectable, UnauthorizedException } from '@nestjs/common';
import _ from 'lodash';

import { EncryptionsUtil } from '../encryptions/encryptions.util';
import { User } from '../users/entities/user.entity';
import { UserEntity } from '../users/users-entity.service';
import { SignInDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptionsUtil: EncryptionsUtil,
    private readonly userEntity: UserEntity,
  ) {}

  public async login(payload: SignInDto) {
    const { email, password } = payload;
    let user = await this.userEntity.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const isMatchPassword = this.encryptionsUtil.isMatchWithHashedKey(
        password,
        user.password,
      );
      if (!isMatchPassword) {
        throw new UnauthorizedException({
          errorCode: 'PASSWORD_IS_NOT_CORRECT',
          message: 'Phone number or password is not correct!',
        });
      }
    } else {
      const newUser = new User({
        email: email,
        password: this.encryptionsUtil.hash(password),
      });
      user = await this.userEntity.save(newUser);
    }

    return {
      accessToken: this.encryptionsUtil.signJwt({
        id: user.id,
        sub: user.id,
      }),
      profile: _.omit(user, ['password']),
    };
  }
}

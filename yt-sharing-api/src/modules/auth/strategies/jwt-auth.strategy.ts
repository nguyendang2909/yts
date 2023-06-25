import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserEntity } from '../../users/users-entity.service';
import { AuthJwtPayload } from '../auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userEntity: UserEntity) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(jwtPayload: AuthJwtPayload) {
    const user = await this.userEntity.findOne({
      where: { id: jwtPayload.id },
    });
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return user;
  }
}

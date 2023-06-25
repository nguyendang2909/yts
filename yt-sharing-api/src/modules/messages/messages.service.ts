import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

import { User } from '../users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './message-entity.service';
import { YtVideoInfo } from './messages.type';

@Injectable()
export class MessagesService {
  constructor(private readonly messageEntity: MessageEntity) {}

  public async create(payload: CreateMessageDto, userId: string) {
    const { url } = payload;
    const { data: videoInfo } = await axios
      .get<YtVideoInfo>(`https://www.youtube.com/oembed?url=${url}&format=json`)
      .catch(() => {
        throw new BadRequestException('Check your link your connection!');
      });

    return await this.messageEntity.save({
      url: payload.url,
      user: new User({ id: userId }),
      ...videoInfo,
      createdBy: userId,
    });
  }

  public async findAll() {
    return await this.messageEntity.find({
      relations: ['user'],
    });
  }
}

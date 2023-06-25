import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Message } from './entities/message.entity';

@Injectable()
export class MessageEntity {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  public async save(entity: Partial<Message>) {
    return await this.messageRepository.save(entity);
  }

  public async findOne(options: FindOneOptions<Message>) {
    return await this.messageRepository.findOne(options);
  }

  public async find(options?: FindManyOptions<Message>) {
    return await this.messageRepository.find(options);
  }
}

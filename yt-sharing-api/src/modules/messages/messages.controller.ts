import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserId } from '../../commons/decorators/current-user-id.decorator';
import { IsPublicEndpoint } from '../../commons/decorators/is-public.endpoint';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
@ApiTags('messages')
@ApiBearerAuth('JWT')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  public async create(
    @Body() createMessageDto: CreateMessageDto,
    @UserId() userId: string,
  ) {
    return {
      type: 'sendMessage',
      data: await this.messagesService.create(createMessageDto, userId),
    };
  }

  @Get()
  @IsPublicEndpoint()
  findAll() {
    return this.messagesService.findAll();
  }
}

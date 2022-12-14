import { CreateNotificationBody } from './create-notification-boyd';
import { PrismaService } from './prisma.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';


@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notifications.findMany();
  }

  @Post() 
  async create(@Body() Body: CreateNotificationBody) {
    const { recipientId, content, category} = Body;
    await this.prisma.notifications.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId
      }
    })
  }
}

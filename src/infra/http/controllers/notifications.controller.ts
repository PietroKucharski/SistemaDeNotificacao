import { SendNotification } from './../../../application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-boyd';
import { Body, Controller, Post } from '@nestjs/common';


@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {

  }

  @Post() 
  async create(@Body() Body: CreateNotificationBody) {
    const { recipientId, content, category} = Body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    return { notification }
  }
}

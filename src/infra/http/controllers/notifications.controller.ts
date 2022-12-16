import { GetRecipientNotifications } from './../../../application/use-cases/get-recipient-notifications';
import { CountRecipientNotifications } from './../../../application/use-cases/count-recipient-notifications';
import { UnreadNotification } from './../../../application/use-cases/unread-notification';
import { ReadNotification } from './../../../application/use-cases/read-notification';
import { CancelNotification } from './../../../application/use-cases/cancel-notification';
import { NotificationViewModel } from './../view-models/notification-view-models';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-boyd';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';


@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifiations: CountRecipientNotifications,
    private getRecipientNotications: GetRecipientNotifications
    ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifiations.execute({
      recipientId,
    });
    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotications.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHTTP)
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  }

  @Post() 
  async create(@Body() Body: CreateNotificationBody) {
    const { recipientId, content, category} = Body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    return { notification: NotificationViewModel.toHTTP(notification)
  }
  }
}

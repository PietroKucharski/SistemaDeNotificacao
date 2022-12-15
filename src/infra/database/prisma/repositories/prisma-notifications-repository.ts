import { PrismaService } from './../prisma.service';
import { Notification } from '../../../../application/entities/notification';
import { NotificationRepository } from '../../../../application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {

    constructor(private prismaService: PrismaService){

    }

    async create(notification: Notification): Promise<void> {
        await this.prismaService.notifications.create({
            data:{
                id: notification.id,
                category: notification.category,
                content: notification.content.value,
                recipientId: notification.recipientId,
                readAt: notification.readAt,
                created_at: notification.createdAt,
            }
        });
    }
    
}
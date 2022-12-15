import { PrismaNotificationMapper } from './../mappers/prisma-notification-mapper';
import { PrismaService } from './../prisma.service';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {

    constructor(private prismaService: PrismaService){
        
    }

    async findById(notificationId: string): Promise<Notification> {
        throw new Error('Method not implemented.');
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationMapper.toPrisma(notification);
        
        await this.prismaService.notifications.create({
            data: raw,
        });
    }

    async save(notification: Notification): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { Notifications as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            created_at: notification.createdAt,
        }
    }

    static toDomain(raw: RawNotification): Notification {
        return new Notification({
            category: raw.category,
            content: new Content(raw.content),
            recipientId: raw.recipientId,
            readAt: raw.readAt,
            canceledAt: raw.canceledAt,
            createdAt: raw.created_at,
        },
        raw.id
        );
    }
}

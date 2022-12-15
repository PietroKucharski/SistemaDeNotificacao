import { Notification } from '../entities/notification'
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { Content } from '../entities/content';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
    it("should be able to cancel a notification", async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade'),
            recipientId: 'example-recipient-id',
        });

        await notificationRepository.create(notification)

        await cancelNotification.execute({
            notificationId: notification.id,
        });

        expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });
    it('should not be able to cancel a non existing notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const cancelNotification = new CancelNotification(notificationRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
});
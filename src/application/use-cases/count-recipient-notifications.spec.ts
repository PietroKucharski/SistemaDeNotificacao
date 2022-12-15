import { CountRecipientNotifications } from './count-recipient-notifications';
import { Notification } from '../entities/notification'
import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { Content } from '../entities/content';

describe('Count recipient notification', () => {
    it("should be able to count recipient notifications", async () => {
        const notificationRepository = new InMemoryNotificationRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationRepository);

        await notificationRepository.create(new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade'),
            recipientId: 'recipient-1',
        }))

        await notificationRepository.create(new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade'),
            recipientId: 'recipient-1',
        }))

        await notificationRepository.create(new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade'),
            recipientId: 'recipient-2'
        }))

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });
});
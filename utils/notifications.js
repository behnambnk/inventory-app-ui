import * as Notifications from 'expo-notifications';

export async function scheduleNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { seconds: 2 },
  });
}

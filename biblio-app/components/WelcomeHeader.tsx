import { View } from 'react-native';
import { Text } from './ui';
import { useTranslation } from 'react-i18next';

export default function WelcomeHeader({ text }: { text: string }) {
  const { t } = useTranslation();
  console.log(text);

  return (
    <View className="mt-8 items-center">
      <Text variant={'heading'}>{t('onboarding.title')}</Text>
      <Text weight={'light'} color={'muted'} className="text-center">
        {text}
      </Text>
    </View>
  );
}

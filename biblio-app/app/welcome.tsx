import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '~/components/ui';
import { useTranslation } from 'react-i18next';
import WelcomeHeader from '~/components/WelcomeHeader';
import MemberLoginForm from '~/components/MemberLoginForm';
import OperatorLoginForm from '~/components/OperatorLoginForm';
import { useState } from 'react';

const RoleWelcome = ({ role = 'member' }) => {
  const { t } = useTranslation();
  const welcometext = role == 'member' ? t('onboarding.title_sub') : t('onboarding.title_sub');
  const loginForm = role == 'member' ? <MemberLoginForm /> : <OperatorLoginForm />;

  return (
    <View className="flex-1 justify-start">
      <WelcomeHeader text={welcometext} />
      {loginForm}
    </View>
  );
};

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [isLibrarian, setIsLibrarian] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 p-4 px-6">
      <KeyboardAwareScrollView
        bottomOffset={8}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-12"
        contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <View className="flex-grow justify-start gap-8">
          {isLibrarian ? <RoleWelcome role="staff" /> : <RoleWelcome role="member" />}

          <View className="h-px bg-muted"></View>

          <Pressable
            onPress={() => setIsLibrarian((v) => !v)}
            className="flex-row items-center justify-center gap-1">
            <Text> {isLibrarian ? t('welcome.student') : t('welcome.biblio')} </Text>
            <Text color={'primary'}>{t('welcome.submit')}</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

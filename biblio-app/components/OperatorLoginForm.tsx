import { FormBlock, FormRow } from './ui';
import { Text } from './ui';
import { InputField } from './ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Icon } from './ui';
import { useColorScheme } from '~/lib/useColorScheme';
import { useAuthStore } from '~/store';
import { Button } from './nativewindui/Button';
import { ActivityIndicator } from './nativewindui/ActivityIndicator';
import { useEffect } from 'react';

export default function OperatorLoginForm() {
  const { login, isLoading, error } = useAuthStore();

  const [userAttempt, setUserAttempt] = useState({
    email: '',
    password: '',
    error: error || '',
  });

  const { t } = useTranslation();

  const passwordFieldRef = useRef<any>(null);

  const [hidePass, setHidePass] = useState(true);

  const { colors } = useColorScheme();

  const handleEnter = () => {
    if (!userAttempt.email || !userAttempt.password) {
      setUserAttempt({ ...userAttempt, error: 'Inserire i campi obbligatori *' });
      return;
    }

    login(userAttempt.email, userAttempt.password);
  };

  useEffect(() => {
    if (userAttempt.email && userAttempt.password) {
      setUserAttempt({ ...userAttempt, error: '' });
    }
  }, [userAttempt.email, userAttempt.password]);

  return (
    <FormBlock className="gap-6 px-4 pt-8">
      <FormRow className="gap-2">
        <Text>{t('form_user.email')}*</Text>
        <InputField
          placeholder={t('form_user.email_placeholder')}
          onChangeText={(email) => setUserAttempt({ ...userAttempt, email })}
          maxLength={50}
          inputMode="email"
          autoComplete="email"
          keyboardType="email-address"
          error={userAttempt.error}
          value={userAttempt.email}
          onSubmitEditing={() => {
            passwordFieldRef?.current?.focus();
          }}
          returnKeyType="next"
          submitBehavior={'submit'}
          autoCapitalize="none"
        />
      </FormRow>

      <FormRow className="gap-2">
        <Text>{t('form_user.password')}*</Text>
        <InputField
          ref={passwordFieldRef}
          placeholder={t('form_user.password_placeholder')}
          onChangeText={(password) => setUserAttempt({ ...userAttempt, password })}
          maxLength={256}
          autoComplete="password"
          secureTextEntry={hidePass}
          error={userAttempt.error}
          value={userAttempt.password}
          autoCapitalize="none"
          right={
            <Pressable className="mr-4 justify-center" onPress={() => setHidePass(!hidePass)}>
              <Icon
                name={hidePass ? 'eye' : 'eye-off'}
                color={colors.grey2}
                type="MaterialCommunityIcons"
              />
            </Pressable>
          }
        />
      </FormRow>

      {(error || userAttempt.error) && (
        <Text className="text-destructive">{error || userAttempt.error}</Text>
      )}

      <View className="mt-6">
        <Button onPress={handleEnter} disabled={isLoading || !!userAttempt.error}>
          {isLoading ? <ActivityIndicator /> : <Text>{t('form_user.biblio_submit')}</Text>}
        </Button>
      </View>
    </FormBlock>
  );
}

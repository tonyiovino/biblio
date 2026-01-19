import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/nativewindui/Button';
import { Icon, Text, InputField, FormBlock, FormRow, ToggleGroup } from '~/components/ui';
import { useAuthStore } from '~/store';
import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { useColorScheme } from '~/lib/useColorScheme';
import { Membership } from '~/store/user';

const OperatorWelcome = () => {
  const { colors } = useColorScheme();

  const { login, isLoading, error } = useAuthStore();

  const [userAttempt, setUserAttempt] = useState({
    email: '',
    password: '',
    error: error || '',
  });

  const [hidePass, setHidePass] = useState(true);

  const passwordFieldRef = useRef<any>(null);

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
    <View className="w-fit">
      <View className="items-center">
        <Text variant={'display'} weight={'bold'}>
          Benvenuto!
        </Text>

        <Text variant={'heading'} color={'muted'} className="text-center">
          Pronto a monitorare i prestiti dei libri?
        </Text>
      </View>

      <FormBlock className="gap-6 px-4 pt-8">
        <FormRow className="gap-2">
          <Text variant={'heading'}>Email*</Text>
          <InputField
            placeholder="Inserisci la tua email"
            onChangeText={(email) => setUserAttempt({ ...userAttempt, email })}
            maxLength={50}
            inputMode="email"
            autoComplete="email"
            error={userAttempt.error}
            value={userAttempt.email}
            onSubmitEditing={() => {
              passwordFieldRef?.current?.focus();
            }}
            returnKeyType="next"
            submitBehavior={'submit'}
          />
        </FormRow>

        <FormRow className="gap-2">
          <Text variant={'heading'}>Password*</Text>
          <InputField
            ref={passwordFieldRef}
            placeholder="Inserisci la tua password"
            onChangeText={(password) => setUserAttempt({ ...userAttempt, password })}
            maxLength={256}
            autoComplete="password"
            secureTextEntry={hidePass}
            error={userAttempt.error}
            value={userAttempt.password}
            right={
              <Pressable className="mr-4 justify-center" onPress={() => setHidePass(!hidePass)}>
                <Icon
                  name={hidePass ? 'eye' : 'eye-off'}
                  color={colors.grey2}
                  type="MaterialCommunityIcons"
                />
              </Pressable>
            }
            className="focus-visible:border-0"
          />
        </FormRow>

        <Pressable
          className="items-center rounded-2xl border p-4"
          onPress={handleEnter}
          disabled={isLoading || !!userAttempt.error}>
          {isLoading ? (
            // <ActivityIndicator className="text-gray-50" />
            <Text variant={'heading'}>Caricamento...</Text>
          ) : (
            <Text variant={'heading'}>Accedi</Text>
          )}
        </Pressable>
      </FormBlock>
    </View>
  );
};

const Welcome = () => {
  return (
    <SafeAreaView className="flex-1 p-4 px-6">
      <View className="flex-1 items-center justify-center">
        <OperatorWelcome />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

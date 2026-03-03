import { FormBlock, FormRow } from './ui';
import { Text } from './ui';
import { InputField } from './ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useRef } from 'react';
import { useAuthStore } from '~/store';
import { Button } from './nativewindui/Button';
import { ActivityIndicator } from './nativewindui/ActivityIndicator';
import { useEffect } from 'react';

export default function MemberLoginForm() {
  const [userAttempt, setUserAttempt] = useState({
    schoolId: process.env.EXPO_PUBLIC_SCHOOL_ID, // TODO: da cambiare in prod, .env (??)
    name: '',
    surname: '',
    grade: '',
    error: '',
  });

  const { t } = useTranslation();

  const surnameFieldRef = useRef<any>(null);
  const gradeFieldRef = useRef<any>(null);

  const { loginAnonymously, isLoading } = useAuthStore();

  const handleEnter = () => {
    if (!userAttempt.name || !userAttempt.surname) {
      setUserAttempt({ ...userAttempt, error: 'Inserire i campi obbligatori *' });
      return;
    }

    loginAnonymously(userAttempt.name, userAttempt.surname, userAttempt.grade);
  };

  useEffect(() => {
    if (userAttempt.name && userAttempt.surname) {
      setUserAttempt({ ...userAttempt, error: '' });
    }
  }, [userAttempt.name, userAttempt.surname]);

  return (
    <FormBlock className="flex-1 justify-start gap-6 px-4 pt-8">
      {/* <FormRow className="gap-2">
          <Text>Codice Scuola</Text>
          <TextField
            placeholder="Inserisci il codice della tua scuola"
            onChangeText={(schoolId) => setUserAttempt({ ...userAttempt, schoolId })}
            value={userAttempt.schoolId}
          />
        </FormRow> */}
      <FormRow className="gap-2">
        <Text>{t('form_user.firstname')}*</Text>
        <InputField
          placeholder={t('form_user.firstname_placeholder')}
          onChangeText={(name) => setUserAttempt({ ...userAttempt, name })}
          maxLength={20}
          error={userAttempt.error}
          value={userAttempt.name}
          onSubmitEditing={() => {
            surnameFieldRef?.current?.focus();
          }}
          returnKeyType="next"
          submitBehavior={'submit'}
        />
      </FormRow>
      <FormRow className="gap-2">
        <Text>{t('form_user.lastname')}*</Text>
        <InputField
          ref={surnameFieldRef}
          placeholder={t('form_user.lastname_placeholder')}
          maxLength={20}
          onChangeText={(surname) => setUserAttempt({ ...userAttempt, surname })}
          error={userAttempt.error}
          value={userAttempt.surname}
          onSubmitEditing={() => {
            gradeFieldRef?.current?.focus();
          }}
          returnKeyType="next"
          submitBehavior={'submit'}
        />
      </FormRow>
      <FormRow className="gap-2">
        <Text>{t('form_user.class')}*</Text>
        <InputField
          ref={gradeFieldRef}
          placeholder={t('form_user.class_placeholder')}
          maxLength={5}
          onChangeText={(grade) => setUserAttempt({ ...userAttempt, grade })}
          error={userAttempt.error}
          value={userAttempt.grade}
        />
      </FormRow>

      {userAttempt.error && <Text className="text-destructive">{userAttempt.error}</Text>}

      <View className="mt-6">
        <Button onPress={handleEnter} disabled={isLoading || !!userAttempt.error}>
          {isLoading ? <ActivityIndicator /> : <Text>{t('form_user.submit')}</Text>}
        </Button>
      </View>
    </FormBlock>
  );
}

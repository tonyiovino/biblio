import { View } from 'react-native';
import { useBiblioStore, useUserStore } from '~/store';
import { FiltersSheetModal } from '~/components';
import { useColorScheme } from '~/lib/useColorScheme';
import { useEffect, useState } from 'react';
import AddBookBtn from '~/components/staff/AddBookBtn';
import AddBookModal from '~/components/staff/AddBookModal';
import { LinearGradient } from 'expo-linear-gradient';
import { convertToRGBA } from '~/lib/utils';
import BooksList from '~/components/BooksList';

export default function Index() {
  const { colors } = useColorScheme();

  const { subscribeBooks, subscribeRequests, subscribeLoans } = useBiblioStore();
  const { membership } = useUserStore();

  const [bookIdToEdit, setBookIdToEdit] = useState('');

  useEffect(() => {
    const unsubs: (() => void)[] = [];

    unsubs.push(subscribeBooks());
    unsubs.push(subscribeRequests());

    if (membership.role === 'staff') {
      unsubs.push(subscribeLoans());
    }

    return () => {
      unsubs.forEach((u) => u && u());
    };
  }, [membership.schoolId, membership.role]);

  return (
    <View className="relative flex-1 px-4">
      <BooksList />

      {membership.role === 'staff' && <AddBookBtn />}

      <LinearGradient
        colors={[colors.background, convertToRGBA(colors.background, 0)]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          zIndex: 10,
        }}
        pointerEvents="none"
      />

      {/* ----- Modals -----  */}
      <FiltersSheetModal />

      {membership.role === 'staff' && (
        <AddBookModal bookIdToEdit={bookIdToEdit} setBookToEdit={setBookIdToEdit} />
      )}
    </View>
  );
}

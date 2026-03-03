import { FlatList } from 'react-native';
import { useBiblioStore } from '~/store';
import { Text } from './ui';
import { useFiltersStore } from '~/store';
import { BookCard } from './partials';
import { useLibraryStore } from '~/store';
import { useCallback } from 'react';
import { Book } from '~/store/biblio';
import { useUserStore } from '~/store';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';

export default function BooksList() {
  const { books, setBookEditModal, isLoading } = useBiblioStore();
  const { filters, applyFilters } = useFiltersStore();
  const { library, addToLibrary, setNotify } = useLibraryStore();

  const { colors } = useColorScheme();

  const filteredBooks = applyFilters(books, filters);

  const isSelected = (id: string) => library.some((book) => book.id === id);

  const { membership } = useUserStore();

  const [bookIdToEdit, setBookIdToEdit] = useState('');

  const handlePress = useCallback(
    (item: Book) => {
      if (membership.role === 'user' && !library.some((b) => b.id === item.id)) {
        addToLibrary(item);
        setNotify(true);
      } else {
        setBookIdToEdit(item.id);
        setBookEditModal(true);
      }
    },
    [membership.role, library, addToLibrary, setBookEditModal]
  );

  return (
    <FlatList
      ListEmptyComponent={() => {
        return <Text className="text-center">Non ci sono libri nella tua scuola.</Text>;
      }}
      data={filteredBooks}
      keyExtractor={(item) => item.id}
      contentContainerClassName="gap-6 py-8"
      className="rounded-md"
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      renderItem={({ item }) => (
        <BookCard item={item} selected={isSelected(item.id)} onPress={() => handlePress(item)} />
      )}
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          tintColor={colors.primary}
          progressBackgroundColor={colors.card}
          refreshing={isLoading}
          enabled={false}
        />
      }
    />
  );
}

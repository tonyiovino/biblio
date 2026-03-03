import { create } from 'zustand';
import { Book } from './biblio';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TLibraryState {
  library: Book[];
  notify: boolean;
}

export interface TLibraryMutations {
  setLibrary: (library: Book[]) => void;
  setNotify: (notify: boolean) => void;

  addToLibrary: (book: Book) => void;
  removeFromLibrary: (bookId: string) => void;
}

export interface TLibraryAction {
  clearLibrary: () => void;
}

export type TLibraryStore = TLibraryState & TLibraryMutations & TLibraryAction;

// ##########################################################################
// ###################              LO STATO              ###################
// ##########################################################################
const libraryState = {
  library: [],
  notify: false,
} satisfies TLibraryState;

// ##########################################################################
// ###################  FUNZIONI CHE MODIFICANO LO STATO  ###################
// ##########################################################################
const libraryMutations = {
  setLibrary: (library): void => useLibraryStore.setState({ library }),
  setNotify: (notify): void => useLibraryStore.setState({ notify }),

  addToLibrary: (book) =>
    useLibraryStore.setState((state: TLibraryState) => ({ library: [...state.library, book] })),

  removeFromLibrary: (bookId): void =>
    useLibraryStore.setState((state) => ({
      library: state.library.filter((b) => b.id !== bookId),
    })),
} satisfies TLibraryMutations;

// ##########################################################################
// ###################     AZIONI LOGICA + MUTATIONS     ####################
// ##########################################################################
const libraryAction = {
  clearLibrary: () => {
    const { setLibrary } = useLibraryStore.getState();

    setLibrary([]);
  },
} satisfies TLibraryAction;

// ##########################################################################
// ###################      CREAZIONE STORE ZUSTAND      ####################
// ##########################################################################
export const useLibraryStore = create<TLibraryStore>()(
  persist<TLibraryStore>(
    () => ({
      ...libraryState,
      ...libraryMutations,
      ...libraryAction,
    }),
    {
      name: 'libraryStore',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

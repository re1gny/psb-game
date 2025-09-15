import {create} from "zustand/react";
import { persist, createJSONStorage } from 'zustand/middleware'
import {Character} from "~/shared/constants/characters";

export const MAX_LIVES = 3;
export const INITIAL_AVAILABLE_CHARACTERS = [1, 2, 3, 6, 8];

type Store = {
  isPersisted: boolean;
  isRestarted: boolean;
  remainingLives: number;
  passedLevels: number[];
  availableCharacters: number[];
  usedCharacters: number[];
  shouldShowStartRules: boolean;
  shouldShowPathRules: boolean;
  shouldShowCardsRules: boolean;
  shouldShowLevelHintRules: boolean;
  passLevel: (level: number, cards: Character[], newCards: Character[]) => void;
  looseLevel: (level: number) => void;
  restart: () => void;
  applyCardsRules: () => void;
  applyStartRules: () => void;
  applyPathRules: () => void;
  applyLevelHintRules: () => void;
  completeRestart: () => void;
};

export const useProgressStore = create<Store>()(persist((set, get) => ({
  isPersisted: false,
  isRestarted: false,
  remainingLives: MAX_LIVES,
  passedLevels: [],
  availableCharacters: INITIAL_AVAILABLE_CHARACTERS,
  usedCharacters: [],
  shouldShowStartRules: true,
  shouldShowPathRules: true,
  shouldShowCardsRules: true,
  shouldShowLevelHintRules: true,
  passLevel: (level: number, winCards: Character[], newCards: Character[]) => {
    set(prev => ({
      passedLevels: [...prev.passedLevels, level],
      availableCharacters: [...prev.availableCharacters, ...newCards.map(item => item.id)],
      usedCharacters: [...prev.usedCharacters, ...winCards.map(item => item.id)],
    }));
  },
  looseLevel: () => {
    const lives = get().remainingLives;

    if (lives > 0) {
      set({ remainingLives: lives - 1 })
    }
  },
  restart: () => {
    set({
      remainingLives: MAX_LIVES,
      passedLevels: [],
      availableCharacters: INITIAL_AVAILABLE_CHARACTERS,
      usedCharacters: [],
      isRestarted: true,
    })
  },
  applyCardsRules: () => {
    set({ shouldShowCardsRules: false })
  },
  applyStartRules: () => {
    set({ shouldShowStartRules: false })
  },
  applyPathRules: () => {
    set({ shouldShowPathRules: false })
  },
  applyLevelHintRules: () => {
    set({ shouldShowLevelHintRules: false })
  },
  completeRestart: () => {
    set({ isRestarted: false })
  },
}), {
  name: 'progress-storage',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    remainingLives: state.remainingLives,
    passedLevels: state.passedLevels,
    availableCharacters: state.availableCharacters,
    usedCharacters: state.usedCharacters,
    shouldShowStartRules: state.shouldShowStartRules,
    shouldShowCardsRules: state.shouldShowCardsRules,
    shouldShowPathRules: state.shouldShowPathRules,
    shouldShowLevelHintRules: state.shouldShowLevelHintRules,
  }),
  merge: (persistedState: any, currentState) => {
    return ({ ...currentState, ...persistedState, isPersisted: !!persistedState })
  }
}));

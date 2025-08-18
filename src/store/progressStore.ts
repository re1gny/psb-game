import {create} from "zustand/react";
import {Character} from "~/shared/constants/characters";

export const MAX_LIVES = 3;
export const INITIAL_AVAILABLE_CHARACTERS = [1, 2, 3, 6, 8];

type Store = {
  remainingLives: number;
  passedLevels: number[];
  availableCharacters: number[];
  usedCharacters: number[];
  shouldShowStartRules: boolean;
  shouldShowCardsRules: boolean;
  passLevel: (level: number, cards: Character[], newCards: Character[]) => void;
  looseLevel: (level: number) => void;
  restart: () => void;
  applyCardsRules: () => void;
  applyStartRules: () => void;
};

export const useProgressStore = create<Store>((set, get) => ({
  remainingLives: MAX_LIVES,
  passedLevels: [],
  availableCharacters: INITIAL_AVAILABLE_CHARACTERS,
  usedCharacters: [],
  shouldShowStartRules: true,
  shouldShowCardsRules: true,
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
    })
  },
  applyCardsRules: () => {
    set({ shouldShowCardsRules: false })
  },
  applyStartRules: () => {
    set({ shouldShowStartRules: false })
  },
}));

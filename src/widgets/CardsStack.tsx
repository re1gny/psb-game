import {HTMLMotionProps, motion} from "motion/react";
import { CharacterCardFront } from "~/shared/ui/CharacterCardFront";
import { Character } from "~/shared/constants/characters";
import {useCallback, useMemo} from "react";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  cards: Character[];
  selectedCards: Character[];
  applied: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const FIVE_CARDS_POSITIONS = [
  {
    x: 58.81,
    y: 37.62,
    rotate: -10.01,
    z: 1,
    k: -2
  },
  {
    x: 18.25,
    y: 17.43,
    rotate: -7.62,
    z: 2,
    k: -1
  },
  {
    x: 0,
    y: 0,
    rotate: 0,
    z: 3,
    k: 0
  },
  {
    x: -14.05,
    y: 18.12,
    rotate: 6.94,
    z: 2,
    k: 1
  },
  {
    x: -50.22,
    y: 37.27,
    rotate: 7.47,
    z: 1,
    k: 2
  },
];

const FIVE_CARDS_SELECTED_POSITIONS = [
  {
    x: 108.81,
    y: 46.22,
    rotate: -10,
    z: 1,
    k: -2
  },
  {
    x: 53,
    y: 0,
    rotate: -5,
    z: 11,
    k: -1
  },
  {
    x: 0,
    y: 31.61,
    rotate: 0,
    z: 3,
    k: 0
  },
  {
    x: -53,
    y: 0,
    rotate: 5,
    z: 10,
    k: 1
  },
  {
    x: -100.22,
    y: 46.68,
    rotate: 10,
    z: 1,
    k: 2
  },
];

const FOUR_CARDS_POSITIONS = [
  {
    x: 68.81,
    y: 29.22,
    rotate: -15,
    z: 1,
    k: -2
  },
  {
    x: 43,
    y: 0,
    rotate: -5,
    z: 11,
    k: -1
  },
  {
    x: -43,
    y: 0,
    rotate: 5,
    z: 12,
    k: 1
  },
  {
    x: -60.22,
    y: 29.68,
    rotate: 15,
    z: 1,
    k: 2
  },
];

const FOUR_CARDS_SELECTED_POSITIONS = [
  {
    x: 108.81,
    y: 46.22,
    rotate: -10,
    z: 1,
    k: -2
  },
  {
    x: 53,
    y: 0,
    rotate: -5,
    z: 11,
    k: -1
  },
  {
    x: -53,
    y: 0,
    rotate: 5,
    z: 10,
    k: 1
  },
  {
    x: -100.22,
    y: 46.68,
    rotate: 10,
    z: 1,
    k: 2
  },
];

export const CardsStack = (props: Props) => {
  const { className, cards, disabled, applied, selectedCards, onClick, ...rest } = props;
  const appliedMap = useMemo(() => {
    const map: Record<number, number> = {};

    if (applied && cards.length === 5) {
      cards.forEach((card, index) => {
        if (selectedCards.includes(card)) {
          map[index] = Object.values(map).includes(1) ? 3 : 1;
        } else {
          map[index] = Object.values(map).includes(0) ? Object.values(map).includes(2) ? 4 : 2 : 0;
        }
      })
    }

    if (applied && cards.length === 4) {
      cards.forEach((card, index) => {
        if (selectedCards.includes(card)) {
          map[index] = Object.values(map).includes(1) ? 2 : 1;
        } else {
          map[index] = Object.values(map).includes(0) ? 3 : 0;
        }
      })
    }

    return map;
  }, [selectedCards, cards])

  const getPositions = useCallback((index: number) => {
    if (applied) {
      if (cards.length === 5) {
        return FIVE_CARDS_SELECTED_POSITIONS[appliedMap[index]];
      }

      if (cards.length === 4) {
        return FOUR_CARDS_SELECTED_POSITIONS[appliedMap[index]];
      }
    }

    if (cards.length === 5) {
      return FIVE_CARDS_POSITIONS[index];
    }

    if (cards.length === 4) {
      return FOUR_CARDS_POSITIONS[index];
    }

    return {} as any;
  }, [cards]);

  return (
    <motion.div
      className={`flex justify-center absolute w-full ${applied ? 'h-[calc(232px*var(--size-ratio))]' : 'h-[calc(188px*var(--size-ratio))]'} ${className ?? ''}`}
      {...rest}
    >
      {cards.map((character, index) => (
        <div
          key={index}
          className={`absolute origin-center transition-transform duration-200 ${disabled ? 'pointer-events-none' : 'cursor-pointer'}`}
          style={{
            transform: `translate(calc((${getPositions(index).x}px*var(--size-ratio)) + ${(getPositions(index).k * 100)}%), calc(${getPositions(index).y}px*var(--size-ratio))) rotate(${getPositions(index).rotate}deg)`,
            zIndex: getPositions(index).z,
          }}
        >
          <CharacterCardFront
            key={index}
            height={applied ? 175.67 : 143.65}
            width={applied ? 108.62 : 88.82}
            inactive={applied && !selectedCards.includes(character)}
            character={character}
            onClick={onClick}
          />
        </div>
      ))}
    </motion.div>
  );
};
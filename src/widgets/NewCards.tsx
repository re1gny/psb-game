import {useLayoutEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "motion/react";
import type { HTMLMotionProps} from "motion/react";
import type { Character } from "~/shared/constants/characters";
import { CharacterCardFront } from "~/shared/ui/CharacterCardFront";
import newOverlay from '~/assets/images/cards/new-overlay.png';
import {Button} from "~/shared/ui/Button";
import overlayLoose from "~/assets/images/overlay-loose.png";
import { useLayoutStore } from "~/store/layoutStore";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  cards: Array<Character>;
  collectionRef: React.RefObject<HTMLButtonElement | null>;
  onFinish?: () => void;
  onNext?: () => void;
}

const ONE_CARD_POSITIONS = {
  0: {
    initialX: 57,
    initialY: 122,
    initialRotate: 0,
    x: 57,
    y: 122,
    z: 1,
    rotate: 0,
    exitX: -83,
    exitY: -98,
    exitRotate: -6,
  },
} as any;

const TWO_CARD_POSITIONS = {
  0: {
    initialX: 37.84,
    initialY: 110,
    initialRotate: -5,
    x: 47.84,
    y: 100,
    z: 1,
    rotate: -5,
    exitX: -63,
    exitY: -73,
    exitRotate: -6,
  },
  1: {
    initialX: 97.45,
    initialY: 229.43,
    initialRotate: 5,
    x: 120.45,
    y: 239.43,
    z: 2,
    rotate: 5,
    exitX: -59,
    exitY: -60,
    exitRotate: -6,
  },
} as any;

export const NewCards = (props: Props) => {
  const { className, cards, onFinish, onNext, collectionRef, ...rest } = props;
  const [closing, setClosing] = useState(false);
  const [closingDelta, setClosingDelta] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const contentRef = useLayoutStore.getState().contentRef;

    if (wrapperRef.current && contentRef?.current) {
      const sizeRatio = useLayoutStore.getState().sizeRatio;
      setClosingDelta((wrapperRef.current.getBoundingClientRect().left - contentRef.current.getBoundingClientRect().left) / sizeRatio);
    }
  }, [wrapperRef.current]);

  const next = () => {
    onNext?.();
    setClosing(true);
  }

  const POSITIONS = cards.length === 2 ? TWO_CARD_POSITIONS : ONE_CARD_POSITIONS;

  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full z-30 ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      {...rest}
    >
      <AnimatePresence onExitComplete={() => onFinish?.()}>
        {!closing && (
          <>
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute top-0 left-0 w-full h-full`}
              src={overlayLoose}
              alt=""
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={'absolute top-0 left-0 w-full h-full'}
            >
              <img className='absolute top-[calc(-141px*var(--size-ratio))] left-1/2 -translate-x-1/2 w-[calc(730px*var(--size-ratio))] h-[calc(948px*var(--size-ratio))]' src={newOverlay} alt="" />
            </motion.div>
            <div ref={wrapperRef} className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))]'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={'flex flex-col items-center absolute top-[calc(26px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
              >
                <motion.div className={'relative flex items-center justify-center bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] w-full h-[calc(62px*var(--size-ratio))] z-10'}>
                  <p className={'whitespace-pre-line font-inter font-semibold text-[calc(20px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#00029D]'}>
                    {cards.length === 2 ? 'Ты получил новые карты!' : 'Ты получил новую карту!'}
                  </p>
                </motion.div>
              </motion.div>
              {cards.map((character, index) => (
                <motion.div
                  key={index}
                  className={`absolute top-0 left-0 rounded-[calc(8.79px*var(--size-ratio))]`}
                  initial={{
                    opacity: 0,
                    x: `calc(${POSITIONS[index].initialX}px*var(--size-ratio))`,
                    y: `calc(${POSITIONS[index].initialY}px*var(--size-ratio))`,
                    rotate: POSITIONS[index].initialRotate,
                    scale: 0,
                    boxShadow: 'none',
                  }}
                  animate={{
                    opacity: 1,
                    x: `calc(${POSITIONS[index].x}px*var(--size-ratio))`,
                    y: `calc(${POSITIONS[index].y}px*var(--size-ratio))`,
                    rotate: POSITIONS[index].rotate,
                    scale: 1,
                    boxShadow: 'calc(0px*var(--size-ratio)) calc(0px*var(--size-ratio)) calc(22px*var(--size-ratio)) calc(0px*var(--size-ratio)) #FFFFFF',
                  }}
                  exit={{
                    opacity: 0,
                    x: `calc(${POSITIONS[index].exitX - closingDelta}px*var(--size-ratio))`,
                    y: `calc(${POSITIONS[index].exitY}px*var(--size-ratio))`,
                    rotate: POSITIONS[index].exitRotate,
                    scale: 0.05,
                    boxShadow: 'none',
                    transition: { duration: 0.8, ease: 'easeInOut', opacity: { delay: 0.5, duration: 0.3 }, rotate: { delay: 0.3, duration: 0.5 } },
                  }}
                >
                  <CharacterCardFront
                    height={cards.length === 2 ? 337.66 : 422}
                    width={cards.length === 2 ? 208.78 : 260.93}
                    character={character}
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={'flex flex-col items-center absolute bottom-[calc(30px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
            >
              <Button className={'absolute'} onClick={next}>Забрать</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
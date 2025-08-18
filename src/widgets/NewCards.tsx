import {useState} from "react";
import {AnimatePresence, HTMLMotionProps, motion} from "motion/react";
import { CharacterCardFront } from "~/shared/ui/CharacterCardFront";
import { Character } from "~/shared/constants/characters";
import newOverlay from '~/assets/images/cards/new-overlay.png';
import {Button} from "~/shared/ui/Button";
import overlayLoose from "~/assets/images/overlay-loose.png";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  cards: Character[];
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
  const { className, cards, onFinish, onNext, ...rest } = props;
  const [closing, setClosing] = useState(false);

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
            <motion.img
              initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={'absolute top-[-141px] left-[-178px] w-[730px] h-[948px]'}
              src={newOverlay}
              alt=""
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={'flex flex-col items-center absolute top-[26px] left-[20px] w-[calc(100%-40px)]'}
            >
              <motion.div className={'relative flex items-center justify-center bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] w-full h-[62px] z-10'}>
                <p className={'whitespace-pre-line font-inter font-semibold text-[20px] leading-[105%] tracking-[0.01em] text-[#00029D]'}>
                  {cards.length === 2 ? 'Ты получил новые карты!' : 'Ты получил новую карту!'}
                </p>
              </motion.div>
            </motion.div>
            {cards.map((character, index) => (
              <motion.div
                key={index}
                className={`absolute top-0 left-0 rounded-[8.79px] `}
                initial={{
                  opacity: 0,
                  x: POSITIONS[index].initialX,
                  y: POSITIONS[index].initialY,
                  rotate: POSITIONS[index].initialRotate,
                  scale: 0,
                  boxShadow: 'none',
                }}
                animate={{
                  opacity: 1,
                  x: POSITIONS[index].x,
                  y: POSITIONS[index].y,
                  rotate: POSITIONS[index].rotate,
                  scale: 1,
                  boxShadow: '0px 0px 22px 0px #FFFFFF',
                }}
                exit={{
                  opacity: 0,
                  x: POSITIONS[index].exitX,
                  y: POSITIONS[index].exitY,
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={'flex flex-col items-center absolute bottom-[30px] left-[20px] w-[calc(100%-40px)]'}
            >
              <Button className={'absolute'} onClick={next}>Забрать</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
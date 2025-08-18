import { HTMLMotionProps, motion } from "motion/react";
import { CharacterCardFront } from "~/shared/ui/CharacterCardFront";
import { Character } from "~/shared/constants/characters";
import overlay from "~/assets/images/overlay.png";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  cards: Character[];
}

const POSITIONS = {
  0: {
    initialX: -40,
    initialY: 162,
    initialRotate: -10,
    x: 12,
    y: 162,
    z: 1,
    rotate: -5,
    origin: 'top left',
  },
  1: {
    initialX: 200,
    initialY: 195.51,
    initialRotate: 10,
    x: 154.85,
    y: 195.51,
    z: 2,
    rotate: 5,
    origin: 'bottom left',
  },
} as any;

export const WinCards = (props: Props) => {
  const { className, cards, ...rest } = props;

  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full z-30 ${className ?? ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      {...rest}
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute top-0 left-0 w-full h-full`}
        src={overlay}
        alt=""
      />
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))]'>
        <motion.svg
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'linear' } }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`w-[calc(273px*var(--size-ratio))] h-[calc(587px*var(--size-ratio)] absolute left-[calc(55.5px*var(--size-ratio))] top-[calc(22px*var(--size-ratio))]`}
          viewBox="0 0 273 587" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M271.5 65L179.5 159L240.5 32L271.5 65Z" fill="#EA5616"/>
          <path d="M197 78.5L159.5 166L173 70.5L197 78.5Z" fill="#EA5616"/>
          <path d="M146.5 2L153.5 144.5L106.5 6.5L146.5 2Z" fill="#EA5616"/>
          <path d="M5 539L87.5 457.5L36 584.5L5 539Z" fill="#EA5616"/>
          <path d="M115 542.5L94.5 473L84 556.5L115 542.5Z" fill="#EA5616"/>
          <path d="M1.5 469.5L71.5 453.5L1.5 495V469.5Z" fill="#EA5616"/>
          <path d="M271.5 65L179.5 159L240.5 32L271.5 65Z" stroke="black" className='stroke-[calc(2px*var(--size-ratio))]' />
          <path d="M197 78.5L159.5 166L173 70.5L197 78.5Z" stroke="black" className='stroke-[calc(2px*var(--size-ratio))]' />
          <path d="M146.5 2L153.5 144.5L106.5 6.5L146.5 2Z" stroke="black" className='stroke-[calc(2px*var(--size-ratio))]' />
          <path d="M5 539L87.5 457.5L36 584.5L5 539Z" stroke="black" className='stroke-[calc(2px*var(--size-ratio))]' />
          <path d="M115 542.5L94.5 473L84 556.5L115 542.5Z" stroke="black" className='stroke-[calc(2px*var(--size-ratio))]' />
          <path d="M1.5 469.5L71.5 453.5L1.5 495V469.5Z" stroke="black" className='stroke-[calc(2px*var(--size-ratio))]' />
        </motion.svg>
        {cards.map((character, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 left-0`}
            initial={{ 
              x: `calc(${POSITIONS[index].initialX}px*var(--size-ratio))`, 
              y: `calc(${POSITIONS[index].initialY}px*var(--size-ratio))`, 
              rotate: POSITIONS[index].initialRotate,
            }}
            animate={{ 
              x: `calc(${POSITIONS[index].x}px*var(--size-ratio))`, 
              y: `calc(${POSITIONS[index].y}px*var(--size-ratio))`, 
              rotate: POSITIONS[index].rotate,
            }}
            exit={{ transition: { duration: 0.5, ease: 'linear' } }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: POSITIONS[index].origin }}
          >
            <CharacterCardFront
              height={298.53}
              width={184.59}
              character={character}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
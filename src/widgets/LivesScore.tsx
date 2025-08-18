import {AnimatePresence, HTMLMotionProps, motion} from "motion/react";
import {MAX_LIVES} from "~/store/progressStore";
import heart from "~/assets/images/heart.svg";
import heartEmpty from "~/assets/images/heart-empty.svg";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  remainingLives: number;
}

export const LivesScore = (props: Props) => {
  const { className, remainingLives, ...rest } = props;

  return (
    <motion.div
      className={`flex items-center gap-[calc(7px*var(--size-ratio))] px-[calc(8px*var(--size-ratio))] w-[calc(127px*var(--size-ratio))] h-[calc(48px*var(--size-ratio))] rounded-[calc(10px*var(--size-ratio))] border-[#000000] border-2 bg-[#FFFFFF] ${className ?? ''}`}
      {...rest}
    >
      {Array.from({ length: MAX_LIVES }).map((_, index) => (
        <motion.div key={index} className={'relative w-[calc(31px*var(--size-ratio))] h-[calc(28px*var(--size-ratio))]'}>
          <AnimatePresence>
            <motion.img
              key={index < remainingLives ? heart : heartEmpty}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: [1, 1.4, 0.8], opacity: 0 }}
              className={'absolute w-full h-full'}
              src={index < remainingLives ? heart : heartEmpty}
              alt=""
            />
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};
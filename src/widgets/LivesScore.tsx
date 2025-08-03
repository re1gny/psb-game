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
      className={`flex items-center gap-[7px] px-[8px] w-[127px] h-[48px] rounded-[10px] border-[#000000] border-2 bg-[#FFFFFF] ${className ?? ''}`}
      {...rest}
    >
      {Array.from({ length: MAX_LIVES }).map((_, index) => (
        <motion.div key={index} className={'relative w-[31px] h-[28px]'}>
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
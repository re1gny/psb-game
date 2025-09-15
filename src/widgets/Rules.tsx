import bgBottom from '~/assets/images/levels/bg-bottom.png'
import bgTop1 from '~/assets/images/level3/bg-top-1.png'
import bgTop2 from '~/assets/images/level3/bg-top-2.png'
import monster from '~/assets/images/level1/monster-1.png'
import {LivesScore} from "~/widgets/LivesScore";
import {AnimatePresence, HTMLMotionProps, motion} from "motion/react";
import overlay from "~/assets/images/overlay.png";
import {Button} from "~/shared/ui/Button";
import {useEffect} from "react";
import {CardsStack} from "~/widgets/CardsStack";
import { CHARACTER_1, CHARACTER_2, CHARACTER_3, CHARACTER_6, CHARACTER_8 } from '~/shared/constants/characters';
import { MAX_LIVES } from '~/store/progressStore';
import {useStep} from "~/shared/lib/useStep";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  onPlay: () => void;
}

export const Rules = (props: Props) => {
  const { className, onPlay, ...rest } = props;

  const [step, next] = useStep('rules', 0);

  const play = () => {
    onPlay();
  }

  useEffect(() => {
    if (step === 0 || step === 2) {
      setTimeout(() => next(), 600);
    }
  }, [step])

  const hasBlur = step === 1 || step === 3;

  return (
    <motion.div className={`relative w-full h-full ${className ?? ''}`} {...rest}>
      <div className={`absolute top-0 left-0 w-full h-full transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`}>
        <img className={'absolute top-[calc(-38px*var(--size-ratio))] left-[calc(-14px*var(--size-ratio))] w-[calc(402px*var(--size-ratio))] h-[calc(340px*var(--size-ratio))] min-w-full'} src={bgTop1} alt="" />
        <img className={'absolute top-[calc(-51px*var(--size-ratio))] left-[calc(-105px*var(--size-ratio))] w-[calc(773.94px*var(--size-ratio))] h-[calc(425.5px*var(--size-ratio))] min-w-full'} src={bgTop2} alt="" />
        <img className={'absolute top-[calc(312px*var(--size-ratio))] left-[calc(-72px*var(--size-ratio))] w-[calc((497px+72px)*var(--size-ratio))] h-[calc(439px*var(--size-ratio))] min-w-full'} src={bgBottom} alt="" />
      </div>
      <LivesScore className={`absolute top-[calc(20px*var(--size-ratio))] left-1/2 -translate-x-1/2 transition-[filter] duration-200 ${hasBlur && step !== 3 ? 'blur pointer-events-none' : 'z-20'}`} remainingLives={MAX_LIVES} />
      <img className={`absolute top-[calc(119px*var(--size-ratio))] left-[calc(121px*var(--size-ratio))] w-[calc(285px*var(--size-ratio))] h-[calc(285px*var(--size-ratio))] transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`} src={monster} alt="" />
      <CardsStack 
        className={`absolute bottom-[calc(18px*var(--size-ratio))] left-1/2 -translate-x-1/2 transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : 'z-20'}`}
        cards={[CHARACTER_1, CHARACTER_2, CHARACTER_3, CHARACTER_6, CHARACTER_8]}
        disabled
        selectedCards={[]}
        applied={false}
      />
      <AnimatePresence>
        {hasBlur && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={'absolute top-0 left-0 w-full h-full'}
            src={overlay}
            alt=""
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 1 && (
          <div className={'absolute top-0 left-1/2 -translate-x-1/2 max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] w-full h-full'}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={'flex flex-col items-center absolute top-[calc(201px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
            >
              <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] pt-[calc(21px*var(--size-ratio))] pr-[calc(20px*var(--size-ratio))] pb-[calc(22px*var(--size-ratio))] pl-[calc(20px*var(--size-ratio))] w-full z-10'}>
                <p className={'whitespace-pre-line font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                  Ты столкнёшься с жизненными монстрами-задачами, но не пугайся! В арсенале у тебя будут крутые персонажи: каждый со своими сильными сторонами.{' '}<span className={'font-extrabold text-[#EA5616]'}>Твоя цель — правильно подобрать комбинацию карт</span>, чтобы справиться со всеми челленджами
                </p>
              </motion.div>
              <Button className={'mt-[calc(20px*var(--size-ratio))]'} onClick={next}>
                Далее
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 3 && (
          <div className={'absolute top-0 left-1/2 -translate-x-1/2 max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] w-full h-full'}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={'flex flex-col items-center absolute top-[calc(262px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
            >
              <svg className={'absolute top-[calc(9px*var(--size-ratio))] -translate-y-full w-[calc(16px*var(--size-ratio))] h-[calc(197px*var(--size-ratio))]'} viewBox="0 0 16 197" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.90845 196C6.90845 196.552 7.35616 197 7.90845 197C8.46073 197 8.90845 196.552 8.90845 196H6.90845ZM8.61555 0.292568C8.22503 -0.097965 7.59186 -0.097965 7.20134 0.292568L0.83738 6.65652C0.446856 7.04705 0.446856 7.68022 0.83738 8.07074C1.2279 8.46125 1.86107 8.46125 2.25159 8.07074L7.90845 2.41388L13.5653 8.07074C13.9558 8.46125 14.589 8.46125 14.9795 8.07074C15.37 7.68022 15.37 7.04705 14.9795 6.65652L8.61555 0.292568ZM7.90845 196H8.90845L8.90845 0.999676H7.90845H6.90845L6.90845 196H7.90845Z" fill="white"/>
              </svg>
              <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] pt-[calc(20px*var(--size-ratio))] pr-[calc(19px*var(--size-ratio))] pb-[calc(19px*var(--size-ratio))] pl-[calc(19px*var(--size-ratio))] w-full z-10'}>
                <p className={'whitespace-pre-line font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                  У тебя будет всего <span className={'font-extrabold text-[#EA5616]'}>3 жизни</span>.
                  <br/>
                  Поэтому выбирай карты с умом!
                </p>
              </motion.div>
              <Button className={'mt-[calc(20px*var(--size-ratio))]'} onClick={play}>
                Играть
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

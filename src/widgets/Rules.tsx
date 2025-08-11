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

  const handleClick = () => {
    if (step === 3) {
      next()
    }
  }

  useEffect(() => {
    if (step === 0 || step === 2 || step === 4) {
      setTimeout(() => next(), 600);
    }
  }, [step])

  const hasBlur = step === 1 || step === 3 || step === 5;

  return (
    <motion.div className={`relative w-full h-full ${className ?? ''}`} onClick={handleClick} {...rest}>
      <div className={`absolute top-0 left-0 w-full h-full transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`}>
        <img className={'absolute top-[-38px] left-[-14px] w-[402px] h-[340px]'} src={bgTop1} alt="" />
        <img className={'absolute top-[-51px] left-[-105px] w-[773.94px] h-[425.5px]'} src={bgTop2} alt="" />
        <img className={'absolute top-[312px] left-[-72px] w-[497px] h-[439px]'} src={bgBottom} alt="" />
      </div>
      <LivesScore className={`absolute top-[20px] left-1/2 -translate-x-1/2 transition-[filter] duration-200 ${hasBlur && step !== 5 ? 'blur pointer-events-none' : 'z-20'}`} remainingLives={MAX_LIVES} />
      <img className={`absolute top-[119px] left-[121px] w-[285px] h-[285px] transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`} src={monster} alt="" />
      <CardsStack 
        className={`absolute bottom-[18px] left-1/2 -translate-x-1/2 transition-[filter] duration-200 ${hasBlur && step !== 3 ? 'blur pointer-events-none' : 'z-20'}`} 
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={'flex flex-col items-center absolute top-[201px] left-[20px] w-[calc(100%-40px)]'}
          >
            <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] pt-[21px] pr-[22px] pb-[22px] pl-[22px] w-full z-10'}>
              <p className={'font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                Ты столкнешься с жизненными монстрами-задачами, но не пугайся! В арсенале у тебя будут крутые персонажи: каждый со своими сильными сторонами и слабостями, вместе они справятся с любой задачей. Твоя цель — правильно подобрать <span className={'font-extrabold text-[#EA5616]'}>комбинацию карт</span>, чтобы справиться со всеми челленджами
              </p>
            </motion.div>
            <Button className={'mt-[20px]'} onClick={next}>
              Далее
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={'flex flex-col items-center absolute top-[155px] left-[20px] w-[calc(100%-40px)]'}
          >
            <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] pt-[21px] pr-[21px] pb-[23px] pl-[21px] w-full z-10'}>
              <p className={'font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                Чтобы понять, какие карты лучше всего справятся с монстрами, внимательно <span className={'font-extrabold text-[#EA5616]'}>читай описание</span> — в них указаны сильные и слабые стороны персонажей. Если ты выбрал правильную комбинацию, то монстр побежден. А если ошибся — придется начать уровень сначала. После каждой победы ты будешь получать нового героя, который пригодится в следующих сражениях
              </p>
            </motion.div>
            <svg className={'absolute bottom-[-1px] translate-y-full'} width="16" height="69" viewBox="0 0 16 69" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1C9 0.447715 8.55228 -2.76748e-10 8 0C7.44772 2.76748e-10 7 0.447715 7 1L9 1ZM7.29289 68.7071C7.68342 69.0976 8.31658 69.0976 8.70711 68.7071L15.0711 62.3431C15.4616 61.9526 15.4616 61.3195 15.0711 60.9289C14.6805 60.5384 14.0474 60.5384 13.6569 60.9289L8 66.5858L2.34315 60.9289C1.95262 60.5384 1.31946 60.5384 0.928932 60.9289C0.538408 61.3195 0.538408 61.9526 0.928932 62.3431L7.29289 68.7071ZM8 1L7 1L7 68L8 68L9 68L9 1L8 1Z" fill="white"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={'flex flex-col items-center absolute top-[262px] left-[20px] w-[calc(100%-40px)]'}
          >
            <svg className={'absolute top-[9px] -translate-y-full'} width="16" height="197" viewBox="0 0 16 197" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.90845 196C6.90845 196.552 7.35616 197 7.90845 197C8.46073 197 8.90845 196.552 8.90845 196H6.90845ZM8.61555 0.292568C8.22503 -0.097965 7.59186 -0.097965 7.20134 0.292568L0.83738 6.65652C0.446856 7.04705 0.446856 7.68022 0.83738 8.07074C1.2279 8.46125 1.86107 8.46125 2.25159 8.07074L7.90845 2.41388L13.5653 8.07074C13.9558 8.46125 14.589 8.46125 14.9795 8.07074C15.37 7.68022 15.37 7.04705 14.9795 6.65652L8.61555 0.292568ZM7.90845 196H8.90845L8.90845 0.999676H7.90845H6.90845L6.90845 196H7.90845Z" fill="white"/>
            </svg>
            <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] pt-[20px] pr-[19px] pb-[19px] pl-[19px] w-full z-10'}>
              <p className={'font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                У тебя будет всего <span className={'font-extrabold text-[#EA5616]'}>3 жизни</span>.
                <br/>
                Поэтому выбирай карты с умом!
              </p>
            </motion.div>
            <Button className={'mt-[20px]'} onClick={play}>
              Играть
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

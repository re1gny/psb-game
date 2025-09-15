import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router'
import { CardsStack } from '~/widgets/CardsStack';
import { LivesScore } from '~/widgets/LivesScore';
import bgBottom from '~/assets/images/levels/bg-bottom.png'
import overlay from '~/assets/images/overlay.png'
import overlayLoose from '~/assets/images/overlay-loose.png'
import { useEffect, useState } from 'react';
import {ALL_LEVELS, Level, LEVEL_1} from '~/shared/constants/levels';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '~/shared/ui/Button';
import { Rules } from '~/widgets/Rules';
import { useProgressStore } from '~/store/progressStore';
import {ALL_CHARACTERS, Character} from '~/shared/constants/characters';
import { MonsterCardBack } from '~/shared/ui/MonsterCardBack';
import { ALL_MONSTERS } from '~/shared/constants/monsters';
import {CardsSelector} from "~/widgets/CardsSelector";
import {useStep} from "~/shared/lib/useStep";
import {reachMetrikaGoal} from "~/shared/lib/reachMetrikaGoal.ts";

type Props = {
  level: Level;
  hasReset: boolean;
  onReset: () => void;
}

const LEVEL_TO_START_NAME: Record<number, string> = {
  1: 'start_level1',
  2: 'start_level2',
  3: 'start_level3',
  4: 'start_level4',
};

const LEVEL_TO_FINISH_NAME: Record<number, string> = {
  1: 'finish_level1',
  2: 'finish_level2',
  3: 'finish_level3',
  4: 'finish_level4',
};

export function LevelGame({ level, hasReset, onReset }: Props) {
  const [step, next] = useStep(`level-${level.id}`, hasReset ? 4 : 1);
  const navigate = useNavigate();
  const [hintsModalOpened, setHintsModalOpened] = useState(false);
  const [cardsSelectorOpened, setCardsSelectorOpened] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Character[]>([]);
  const [clicks, setClicks] = useState(0);
  const [winnable, setWinnable] = useState<boolean | null>(null);

  const remainingLives = useProgressStore(state => state.remainingLives);
  const availableCharacterIds = useProgressStore(state => state.availableCharacters);
  const usedCharacters = useProgressStore(state => state.usedCharacters);
  const shouldShowLevelHintRules = useProgressStore(state => state.shouldShowLevelHintRules);
  const passLevel = useProgressStore(state => state.passLevel);
  const looseLevel = useProgressStore(state => state.looseLevel);
  const shouldShowCardsRules = useProgressStore(state => state.shouldShowCardsRules);
  const applyCardsRules = useProgressStore(state => state.applyCardsRules);
  const applyLevelHintRules = useProgressStore(state => state.applyLevelHintRules);

  const availableCharacters = ALL_CHARACTERS.filter(character =>
    availableCharacterIds.includes(character.id) && !usedCharacters.includes(character.id)
  );
  const newCharacters = ALL_CHARACTERS.filter(character => level.winNewCharacters.includes(character.id));
  const monster = ALL_MONSTERS.find(monster => monster.id === level.monster);

  const clicksRequired = winnable === true ? level.tasks.length : winnable === false ? 0 : Infinity;

  const reset = async () => {
    await navigate({ to: '.', replace: true })
    onReset?.();
  }

  const back = () => {
    navigate({ to: '/path' })
  }

  const applySelector = (selectedCharacters: Character[]) => {
    setSelectedCards(selectedCharacters);
    setCardsSelectorOpened(false);
    setIsApplied(true);
    applyCardsRules();
    next();
  }

  const clickMonster = () => {
    if (step !== 7 || clicks > clicksRequired || hintsModalOpened) {
      return;
    }

    setClicks(prev => prev + 1);
  }

  const looseContinue = () => {
    if (remainingLives > 0) {
      reset()
    } else {
      navigate({ to: '/full-loose' })
    }
  }

  const winContinue = async () => {
    reachMetrikaGoal(LEVEL_TO_FINISH_NAME[level.id]);
    await navigate({ to: `/level-${level.id}-win` })
    passLevel(level.id, selectedCards, newCharacters);
  }

  const handleStart = () => {
    reachMetrikaGoal(LEVEL_TO_START_NAME[level.id]);
    next();
  }

  useEffect(() => {
    if (step === 3 || step === 8 || (step === 5 && !shouldShowLevelHintRules)) {
      setTimeout(() => next(), 600);
    }

    if (step === 9) {
      setHintsModalOpened(false)
    }
  }, [step])

  useEffect(() => {
    if (step === 7 && clicks > clicksRequired) {
      if (winnable === true) {
        setTimeout(() => next(), 600);
      } else if (winnable === false) {
        looseLevel(1);
        setTimeout(() => next(), 3000);
      }
    }
  }, [winnable, step, clicks])

  useEffect(() => {
    if (isApplied) {
      setWinnable(selectedCards.every(item => level.correctCharacters.includes(item.id)));
    }
  }, [isApplied, selectedCards])

  const hasBaseBlur = step === 1 || step === 2 || (step === 5 && shouldShowLevelHintRules) || cardsSelectorOpened || hintsModalOpened;
  const hasBlur = hasBaseBlur || step === 9;
  const monsterImageIndex = !winnable ? 0 : clicks > level.tasks.length ?
    level.monsterImages.length - 1
    : level.tasks[clicks - 1] ?
      level.tasks[clicks - 1].monsterState - 1
      : 0;

  if (!monster) {
    return null;
  }

  return (
    <>
      <div className={'relative h-full'}>
        <div className={`absolute top-0 left-0 w-full h-full transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`}>
          <img 
            className={'absolute min-w-full'} 
            style={{
              top: `calc(${level.bgTop1.y}px*var(--size-ratio))`,
              left: `calc(${level.bgTop1.x}px*var(--size-ratio))`,
              width: `calc(${level.bgTop1.width}px*var(--size-ratio))`,
              height: `calc(${level.bgTop1.height}px*var(--size-ratio))`,
            }}
            src={level.bgTop1.image} alt="" />
          <img 
            className={'absolute min-w-full'} 
            style={{
              top: `calc(${level.bgTop2.y}px*var(--size-ratio))`,
              left: `calc(${level.bgTop2.x}px*var(--size-ratio))`,
              width: `calc(${level.bgTop2.width}px*var(--size-ratio))`,
              height: `calc(${level.bgTop2.height}px*var(--size-ratio))`,
            }}
            src={level.bgTop2.image} alt="" />
          <img className={'absolute top-[calc(312px*var(--size-ratio))] left-0 w-[calc(497px*var(--size-ratio))] h-[calc(439px*var(--size-ratio))] min-w-full'} src={bgBottom} alt="" />
        </div>
        <AnimatePresence initial={false}>
          {!cardsSelectorOpened && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-[calc(20px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] flex items-center justify-center border-2 border-[#000000] rounded-[calc(10px*var(--size-ratio))] bg-[#EA5616] w-[calc(48px*var(--size-ratio))] h-[calc(48px*var(--size-ratio))] transition-[filter] duration-200 ${hasBlur && !hasBaseBlur || (step === 5 && shouldShowLevelHintRules) ? 'blur pointer-events-none' : 'z-20'}`}
              onClick={back}
            >
              <svg className='w-[calc(29px*var(--size-ratio))] h-[calc(29px*var(--size-ratio))]' viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3994 28.8008L18.8691 24.332L11.8955 17.3584H28.9336V11.0459H12.2939L18.8711 4.46973L14.4023 0L0.00195312 14.3965L0.00292969 14.3975L0 14.4014L14.3994 28.8008Z" fill="white"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {!cardsSelectorOpened && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-[calc(20px*var(--size-ratio))] right-[calc(20px*var(--size-ratio))] flex items-center justify-center border-2 border-[#000000] rounded-[calc(10px*var(--size-ratio))] bg-[#EA5616] w-[calc(48px*var(--size-ratio))] h-[calc(48px*var(--size-ratio))] transition-[filter] duration-200 ${(hasBlur && !hasBaseBlur || step < 3) && (step !== 5 || !shouldShowLevelHintRules) ? 'blur pointer-events-none' : 'z-20'}`}
              onClick={() => step > 5 && setHintsModalOpened(true)}
            >
              <svg className='w-[calc(21px*var(--size-ratio))] h-[calc(33px*var(--size-ratio))]' viewBox="0 0 21 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.09114 22.8442V22.4488C7.10128 20.6136 7.27365 19.1535 7.60824 18.0686C7.95298 16.9837 8.43966 16.1118 9.0683 15.4527C9.69693 14.7835 10.4624 14.1701 11.3648 13.6124C11.9833 13.2271 12.5359 12.8064 13.0226 12.3501C13.5194 11.8837 13.9098 11.3666 14.1937 10.7988C14.4776 10.2208 14.6195 9.577 14.6195 8.86725C14.6195 8.06625 14.432 7.37171 14.0568 6.78363C13.6817 6.19555 13.1747 5.73929 12.5359 5.41483C11.9073 5.09037 11.2026 4.92814 10.4219 4.92814C9.702 4.92814 9.0176 5.0853 8.36869 5.39962C7.72991 5.7038 7.1976 6.17021 6.77175 6.79884C6.35604 7.41734 6.12284 8.20313 6.07214 9.15622H0.657771C0.708467 7.22976 1.17487 5.61762 2.05699 4.31979C2.94925 3.02196 4.1254 2.04859 5.58546 1.39968C7.05565 0.750765 8.67793 0.426308 10.4523 0.426308C12.3889 0.426308 14.0923 0.765974 15.5625 1.44531C17.0428 2.12464 18.1936 3.09294 19.0149 4.35021C19.8463 5.59734 20.2621 7.07767 20.2621 8.79121C20.2621 9.94708 20.0745 10.9813 19.6993 11.8938C19.3343 12.8064 18.8121 13.6175 18.1328 14.3272C17.4535 15.037 16.6474 15.6707 15.7146 16.2284C14.8933 16.7353 14.219 17.2626 13.6918 17.8101C13.1747 18.3576 12.7894 19.0015 12.5359 19.7416C12.2926 20.4716 12.1658 21.374 12.1557 22.4488V22.8442H7.09114ZM9.73749 32.3346C8.82495 32.3346 8.03916 32.0101 7.38011 31.3612C6.72106 30.7123 6.39153 29.9214 6.39153 28.9886C6.39153 28.0761 6.72106 27.2954 7.38011 26.6465C8.03916 25.9976 8.82495 25.6731 9.73749 25.6731C10.6399 25.6731 11.4206 25.9976 12.0797 26.6465C12.7489 27.2954 13.0834 28.0761 13.0834 28.9886C13.0834 29.6071 12.9263 30.1699 12.612 30.6768C12.3078 31.1838 11.9022 31.5894 11.3953 31.8935C10.8984 32.1876 10.3458 32.3346 9.73749 32.3346Z" fill="white"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
        <LivesScore 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`absolute top-[calc(20px*var(--size-ratio))] left-1/2 -translate-x-1/2 transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : 'z-20'}`}
          remainingLives={remainingLives} 
        />
        <div className={'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))]'}>
          <AnimatePresence initial={false}>
            <motion.div
              key={level.monsterImages[monsterImageIndex].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute transition-[filter] duration-200 ${step === 7 ? 'cursor-pointer' : ''} ${hasBlur ? 'blur pointer-events-none' : ''}`}
              style={{
                width: `calc(${level.monsterImages[monsterImageIndex].width}px*var(--size-ratio))`,
                height: `calc(${level.monsterImages[monsterImageIndex].height}px*var(--size-ratio))`,
                top: `calc(${level.monsterImages[monsterImageIndex].y}px*var(--size-ratio))`,
                left: `calc(${level.monsterImages[monsterImageIndex].x}px*var(--size-ratio))`,
              }}
              onClick={clickMonster}
            >
              <motion.img
                className={'w-full h-full'}
                src={level.monsterImages[monsterImageIndex].image}
                alt=""
              />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {selectedCards.map((card) => {
              const pairIndex = level.characterPairs[selectedCards[0].id][selectedCards[1].id].indexOf(card.id);
              const image = winnable === false && clicks > clicksRequired ? card.looseImage : card.image;
              const config = winnable === false && clicks > clicksRequired ? level.looseCharacterImages : level.characterImages;

              return (
                <motion.div
                  key={image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute transition-[filter] duration-200 pointer-events-none ${hasBlur ? 'blur' : ''}`}
                  style={{
                    top: `calc(${config[card.id][pairIndex].y}px*var(--size-ratio))`,
                    left: `calc(${config[card.id][pairIndex].x}px*var(--size-ratio))`,
                    width: `calc(${config[card.id][pairIndex].width}px*var(--size-ratio))`,
                    height: `calc(${config[card.id][pairIndex].height}px*var(--size-ratio))`,
                    zIndex: pairIndex + 1,
                  }}
                >
                  <img
                    className={'w-full h-full'}
                    src={image}
                    alt=""
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {level.tasks.map((task, index) => (
            (winnable === true && clicks === index + 1) && (
              <div className={'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] pointer-events-none'}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={'absolute z-0 flex items-start justify-center pointer-events-none'}
                  style={{
                    width: `calc(${task.width}px*var(--size-ratio))`,
                    height: `calc(${task.height}px*var(--size-ratio))`,
                    top: `calc(${task.y}px*var(--size-ratio))`,
                    left: `calc(${task.x}px*var(--size-ratio))`,
                    padding: task.padding.map(item => `calc(${item}px*var(--size-ratio))`).join(' ')
                  }}
                >
                  <img
                    className={'absolute left-0 top-0 w-full h-full origin-center'}
                    style={{ transform: `rotate(${task.rotate}deg)` }}
                    src={task.image}
                    alt=""
                  />
                  <p
                    className={'absolute font-inter font-semibold text-[calc(12px*var(--size-ratio))] leading-[100%] text-center text-[#00029D]'}
                    style={{
                      width: `calc(100% - (${task.padding[1] + task.padding[3]}px)*var(--size-ratio))`,
                      height: `calc(100% - (${task.padding[0] + task.padding[2]}px)*var(--size-ratio))`
                    }}
                  >
                    {task.text}
                  </p>
                </motion.div>
              </div>
            )
          ))}
          {(winnable === false && (step === 7 || step === 8) && clicks > clicksRequired) && (
            <div className={'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] pointer-events-none'}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } }}
                className={'absolute z-0 flex items-start justify-center pointer-events-none'}
                style={{
                  top: `calc(${level.looseMonsterText.y}px*var(--size-ratio))`,
                  left: `calc(${level.looseMonsterText.x}px*var(--size-ratio))`,
                }}
              >
                <svg
                  style={{
                    width: `calc(${level.looseMonsterText.width}px*var(--size-ratio))`,
                    height: `calc(${level.looseMonsterText.height}px*var(--size-ratio))`,
                  }}
                  viewBox="0 0 161 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M80.6709 1C95.8742 1 108.653 11.3778 112.312 25.4355C116.731 23.2064 121.726 21.9493 127.014 21.9492C145.07 21.9492 159.708 36.5873 159.708 54.6436C159.708 72.6997 145.07 87.3369 127.014 87.3369C126.111 87.3369 125.217 87.2984 124.333 87.2266L131.141 114L105.823 97.7432C99.8269 104.96 90.7871 109.557 80.6709 109.557C68.4838 109.556 57.8549 102.887 52.2324 93C46.9638 96.6338 40.5777 98.7637 33.6934 98.7637C15.6373 98.7634 1.00005 84.1264 1 66.0703C1 50.9559 11.2568 38.2384 25.1895 34.4951C25.1462 34.0222 25.123 33.5428 25.123 33.0586C25.1233 24.469 32.0871 17.506 40.6768 17.5059C44.4137 17.5059 47.8425 18.8241 50.5244 21.0205C55.475 9.25835 67.1087 1.0002 80.6709 1Z" fill="white"/>
                  <path d="M80.6709 1V0H80.6709L80.6709 1ZM112.312 25.4355L111.344 25.6874L111.656 26.8863L112.762 26.3284L112.312 25.4355ZM127.014 21.9492V20.9492H127.014L127.014 21.9492ZM159.708 54.6436L160.708 54.6436V54.6436H159.708ZM127.014 87.3369L127.014 88.3369H127.014V87.3369ZM124.333 87.2266L124.414 86.2299L123.019 86.1165L123.364 87.473L124.333 87.2266ZM131.141 114L130.6 114.841L132.735 116.212L132.11 113.754L131.141 114ZM105.823 97.7432L106.364 96.9017L105.619 96.4238L105.054 97.1041L105.823 97.7432ZM80.6709 109.557L80.6709 110.557H80.6709V109.557ZM52.2324 93L53.1017 92.5057L52.5625 91.5575L51.6647 92.1768L52.2324 93ZM33.6934 98.7637L33.6933 99.7637H33.6934V98.7637ZM1 66.0703H0H1ZM25.1895 34.4951L25.4489 35.4609L26.2621 35.2424L26.1853 34.4039L25.1895 34.4951ZM25.123 33.0586L24.123 33.0586V33.0586H25.123ZM40.6768 17.5059V16.5059H40.6767L40.6768 17.5059ZM50.5244 21.0205L49.8908 21.7942L50.9267 22.6425L51.4461 21.4084L50.5244 21.0205ZM80.6709 1V2C95.4077 2 107.797 12.0593 111.344 25.6874L112.312 25.4355L113.279 25.1837C109.509 10.6962 96.3407 0 80.6709 0V1ZM112.312 25.4355L112.762 26.3284C117.045 24.168 121.886 22.9493 127.014 22.9492L127.014 21.9492L127.014 20.9492C121.565 20.9493 116.417 22.2448 111.861 24.5427L112.312 25.4355ZM127.014 21.9492V22.9492C144.518 22.9492 158.708 37.1395 158.708 54.6436H159.708H160.708C160.708 36.035 145.622 20.9492 127.014 20.9492V21.9492ZM159.708 54.6436L158.708 54.6435C158.708 72.1474 144.518 86.3369 127.014 86.3369V87.3369V88.3369C145.622 88.3369 160.708 73.252 160.708 54.6436L159.708 54.6436ZM127.014 87.3369L127.014 86.3369C126.139 86.3369 125.273 86.2996 124.414 86.2299L124.333 87.2266L124.252 88.2233C125.162 88.2972 126.083 88.3369 127.014 88.3369L127.014 87.3369ZM124.333 87.2266L123.364 87.473L130.171 114.246L131.141 114L132.11 113.754L125.302 86.9801L124.333 87.2266ZM131.141 114L131.681 113.159L106.364 96.9017L105.823 97.7432L105.283 98.5846L130.6 114.841L131.141 114ZM105.823 97.7432L105.054 97.1041C99.2394 104.102 90.477 108.557 80.6709 108.557V109.557V110.557C91.0971 110.557 100.414 105.817 106.592 98.3823L105.823 97.7432ZM80.6709 109.557L80.6709 108.557C68.8579 108.556 58.5538 102.093 53.1017 92.5057L52.2324 93L51.3631 93.4943C57.1561 103.681 68.1096 110.556 80.6709 110.557L80.6709 109.557ZM52.2324 93L51.6647 92.1768C46.5575 95.6993 40.3682 97.7637 33.6934 97.7637V98.7637V99.7637C40.7871 99.7637 47.3702 97.5683 52.8002 93.8232L52.2324 93ZM33.6934 98.7637L33.6934 97.7637C16.1896 97.7634 2.00005 83.5741 2 66.0703H1H0C4.88758e-05 84.6787 15.085 99.7634 33.6933 99.7637L33.6934 98.7637ZM1 66.0703H2C2 51.4197 11.942 39.0898 25.4489 35.4609L25.1895 34.4951L24.93 33.5294C10.5716 37.3871 0 50.4921 0 66.0703H1ZM25.1895 34.4951L26.1853 34.4039C26.1446 33.9599 26.123 33.511 26.123 33.0586H25.123H24.123C24.123 33.5746 24.1477 34.0845 24.1936 34.5863L25.1895 34.4951ZM25.123 33.0586L26.123 33.0586C26.1232 25.0213 32.6393 18.506 40.6768 18.5059L40.6768 17.5059L40.6767 16.5059C31.5349 16.506 24.1233 23.9166 24.123 33.0586L25.123 33.0586ZM40.6768 17.5059V18.5059C44.1742 18.5059 47.381 19.7387 49.8908 21.7942L50.5244 21.0205L51.158 20.2468C48.3041 17.9096 44.6531 16.5059 40.6768 16.5059V17.5059ZM50.5244 21.0205L51.4461 21.4084C56.2461 10.0041 67.5251 2.00019 80.6709 2L80.6709 1L80.6709 0C66.6923 0.00020653 54.7039 8.51261 49.6027 20.6326L50.5244 21.0205Z" fill="black"/>
                </svg>
                <p
                  className={'absolute font-inter font-semibold text-[calc(12px*var(--size-ratio))] leading-[100%] text-center text-[#00029D]'}
                  style={{
                    padding: level.looseMonsterText.padding.map(item => `calc(${item}px*var(--size-ratio))`).join(' ')
                  }}
                >
                  {level.looseMonsterText.text}
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <CardsStack 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: isApplied ? 97 : -18 }}
          exit={{ opacity: 0 }}
          className={`absolute bottom-0 left-0 transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`}
          cards={availableCharacters}
          selectedCards={selectedCards}
          applied={isApplied}
          disabled={step < 6}
          onClick={() => setCardsSelectorOpened(true)}
        />
        <AnimatePresence>
          {hasBlur && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute top-0 left-0 w-full h-full ${cardsSelectorOpened ? 'z-20' : ''}`}
              src={winnable === false && step === 9 ? overlayLoose : overlay}
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
              className={'absolute top-0 left-0 w-full h-full'}
            >
              <div className={'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[calc(100%-(40px*var(--size-ratio)))] max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] flex flex-col items-center'}>
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] pt-[calc(21px*var(--size-ratio))] pr-[calc(18px*var(--size-ratio))] pb-[calc(22px*var(--size-ratio))] pl-[calc(21px*var(--size-ratio))] w-full z-10'}>
                  <p className={'whitespace-pre-line font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                    {level.introText}
                  </p>
                </motion.div>
                <Button className={'mt-[calc(20px*var(--size-ratio))]'} onClick={handleStart}>
                  Далее
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={'flex flex-col items-center absolute top-[calc(87px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
            >
              <MonsterCardBack
                height={493}
                width={304.83}
                monster={monster}
              />
              <Button className={'mt-[calc(20px*var(--size-ratio))]'} onClick={next}>
                Далее
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={'flex flex-col items-center absolute top-[calc(148px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
            >
              <div className={'flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] w-full h-full'}>
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] p-[calc(20px*var(--size-ratio))] pr-[calc(25px*var(--size-ratio))] w-full z-10'}>
                  <h3 className={'whitespace-pre-line font-gilroy font-extrabold text-[calc(20px*var(--size-ratio))] leading-[100%] text-[#EA5616] text-center'}>Подсказка</h3>
                  <p className={'whitespace-pre-line mt-[calc(20px*var(--size-ratio))] font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                    {level.hintText}
                  </p>
                </motion.div>
                <Button className={'mt-[calc(20px*var(--size-ratio))] shrink-0'} onClick={next}>
                  Далее
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 5 && shouldShowLevelHintRules && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={'flex flex-col items-center absolute top-[calc(229px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
            >
              <svg className={'absolute right-[calc(60px*var(--size-ratio))] bottom-[calc(-7px*var(--size-ratio))] w-[calc(114px*var(--size-ratio))] h-[calc(183px*var(--size-ratio))]'} viewBox="0 0 114 183" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.45918 181.885C3.52257 182.434 3.1292 182.93 2.58057 182.993C2.03193 183.057 1.53578 182.663 1.4724 182.115L2.46578 182L3.45918 181.885ZM113.574 6.18083C114.026 6.49759 114.136 7.12114 113.819 7.57355L108.657 14.9461C108.34 15.3985 107.717 15.5085 107.264 15.1917C106.812 14.8749 106.702 14.2514 107.019 13.799L111.607 7.24562L105.054 2.65722C104.602 2.34045 104.492 1.71691 104.808 1.2645C105.125 0.812081 105.749 0.702113 106.201 1.01888L113.574 6.18083ZM2.46578 182L1.4724 182.115C-3.07233 142.781 2.77934 102.654 20.7692 70.3989C38.7751 38.1144 68.9218 13.7582 112.826 6.0152L113 7L113.174 7.9848C69.8896 15.6184 40.243 39.5885 22.5159 71.3731C4.77265 103.187 -1.04848 142.872 3.45918 181.885L2.46578 182Z" fill="white"/>
              </svg>
              <div className={'flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] w-full h-full'}>
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] py-[calc(20px*var(--size-ratio))] px-[calc(34px*var(--size-ratio))] w-full z-10'}>
                  <p className={'whitespace-pre-line font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                    Здесь ты всегда сможешь{'\n'}вернуться к подсказке{'\n'}и перечитать её
                  </p>
                </motion.div>
                <Button className={'mt-[calc(20px*var(--size-ratio))] shrink-0'} onClick={() => {
                  applyLevelHintRules();
                  next();
                }}>
                  Далее
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`flex flex-col items-center absolute top-[calc(259px*var(--size-ratio))] w-full transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`}
            >
              <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] p-[calc(20px*var(--size-ratio))] w-[calc(265px*var(--size-ratio))] z-10'}>
                <p className={'whitespace-pre-line font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                  {level.chooseCardsText}
                </p>
              </motion.div>
              <svg className={'absolute bottom-[calc(-3px*var(--size-ratio))] translate-y-full pointer-events-none w-[calc(16px*var(--size-ratio))] h-[calc(69px*var(--size-ratio))]'} viewBox="0 0 16 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1C9 0.447715 8.55228 -2.1479e-10 8 0C7.44772 2.1479e-10 7 0.447715 7 1L8 1L9 1ZM7.29289 68.7071C7.68342 69.0976 8.31658 69.0976 8.70711 68.7071L15.0711 62.3431C15.4616 61.9526 15.4616 61.3195 15.0711 60.9289C14.6805 60.5384 14.0474 60.5384 13.6569 60.9289L8 66.5858L2.34315 60.9289C1.95262 60.5384 1.31946 60.5384 0.928932 60.9289C0.538408 61.3195 0.538408 61.9526 0.928932 62.3431L7.29289 68.7071ZM8 1L7 1L7 68L8 68L9 68L9 1L8 1Z" fill="white"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 7 && clicks === 0 && (
            <div className={'absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] pointer-events-none'}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`flex flex-col items-center absolute top-[calc(376px*var(--size-ratio))] w-full transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`}
              >
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] py-[calc(21px*var(--size-ratio))] px-[calc(30px*var(--size-ratio))] w-[calc(265px*var(--size-ratio))] z-10'}>
                  <p className={'whitespace-pre-line font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                    Нажимай на монстра, чтобы атаковать
                  </p>
                </motion.div>
                <svg className={'absolute top-[calc(-2px*var(--size-ratio))] left-[calc(252px*var(--size-ratio))] -translate-y-full pointer-events-none w-[calc(16px*var(--size-ratio))] h-[calc(83px*var(--size-ratio))]'} viewBox="0 0 16 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.49998 81.9938C9.50339 82.5461 9.05845 82.9966 8.50617 83C7.9539 83.0034 7.50343 82.5584 7.50002 82.0062L8.5 82L9.49998 81.9938ZM7.28854 0.297275C7.67665 -0.0956544 8.3098 -0.0995628 8.70273 0.288545L15.1059 6.6131C15.4988 7.00121 15.5027 7.63436 15.1146 8.02729C14.7265 8.42022 14.0933 8.42413 13.7004 8.03602L8.00873 2.41419L2.3869 8.10585C1.9988 8.49878 1.36564 8.50269 0.972715 8.11458C0.579787 7.72648 0.575879 7.09333 0.963985 6.7004L7.28854 0.297275ZM8.5 82L7.50002 82.0062L7.00002 1.00618L8 1L8.99998 0.993831L9.49998 81.9938L8.5 82Z" fill="white"/>
                </svg>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {winnable === true && step === 9 && (
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))]'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={'flex flex-col items-center absolute top-[calc(177px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
              >
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] pt-[calc(20px*var(--size-ratio))] pr-[calc(16px*var(--size-ratio))] pb-[calc(23px*var(--size-ratio))] pl-[calc(20px*var(--size-ratio))] w-full z-10'}>
                  <h3 className={'whitespace-pre-line font-gilroy font-extrabold text-[calc(20px*var(--size-ratio))] leading-[108%] tracking-[0] text-[#EA5616] text-center'}>
                    {level.winTitle}
                  </h3>
                  <p className={'whitespace-pre-line mt-[calc(20px*var(--size-ratio))] font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                    {level.winText}
                  </p>
                </motion.div>
                <Button className={'mt-[calc(20px*var(--size-ratio))]'} onClick={winContinue}>
                  Далее
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {winnable === false && step === 9 && (
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))]'>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={'flex flex-col items-center absolute top-[calc(177px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
              >
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] pt-[calc(20px*var(--size-ratio))] pr-[calc(18px*var(--size-ratio))] pb-[calc(23px*var(--size-ratio))] pl-[calc(21px*var(--size-ratio))] w-full z-10'}>
                  <h3 className={'whitespace-pre-line font-gilroy font-extrabold text-[calc(20px*var(--size-ratio))] leading-[108%] tracking-[0] text-[#EA5616] text-center'}>
                    {level.looseTitle}
                  </h3>
                  <p className={'whitespace-pre-line mt-[calc(20px*var(--size-ratio))] font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                    {level.looseText}
                  </p>
                </motion.div>
                <Button className={'mt-[calc(20px*var(--size-ratio))]'} onClick={looseContinue}>
                  Попробовать снова
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <CardsSelector
          hints={level.characterHints}
          withRules={shouldShowCardsRules}
          opened={cardsSelectorOpened}
          applied={isApplied}
          onClose={() => setCardsSelectorOpened(false)} 
          onApply={applySelector} 
        />
      </div>
      <AnimatePresence>
        {hintsModalOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={'flex flex-col items-center absolute top-[calc(148px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))]'}
          >
            <div className={'flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 max-w-[calc(375px*var(--size-ratio))] max-h-[calc(667px*var(--size-ratio))] w-full h-full'}>
              <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] p-[calc(20px*var(--size-ratio))] pr-[calc(25px*var(--size-ratio))] w-full z-10'}>
                <h3 className={'whitespace-pre-line font-gilroy font-extrabold text-[calc(20px*var(--size-ratio))] leading-[100%] text-[#EA5616] text-center'}>Подсказка</h3>
                <p className={'whitespace-pre-line mt-[calc(20px*var(--size-ratio))] font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                  {level.hintText}
                </p>
              </motion.div>
              <Button className={'mt-[calc(20px*var(--size-ratio))] shrink-0'} onClick={() => setHintsModalOpened(false)}>
                Продолжить
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

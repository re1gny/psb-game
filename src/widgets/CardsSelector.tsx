import {AnimatePresence, type HTMLMotionProps, motion, usePresenceData} from "motion/react";
import {ALL_CHARACTERS, type Character} from "~/shared/constants/characters";
import { CloseButton } from "~/shared/ui/CloseButton";
import { useProgressStore } from "~/store/progressStore";
import {CharacterCardBack} from "~/shared/ui/CharacterCardBack";
import {useEffect, useState} from "react";
import { Button } from "~/shared/ui/Button";
import overlay from "~/assets/images/overlay.png";
import {useStep} from "~/shared/lib/useStep";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  opened: boolean;
  applied: boolean;
  withRules: boolean;
  onClose: () => void;
  onApply: (selected: Character[]) => void;
}

const MAX_CHECKED_CHARACTERS = 2;

const Card = ({ character, disabled, checked, applied, onCheck, highlightCheck }: { character: Character, disabled: boolean, checked: boolean, applied: boolean, onCheck: (value: boolean) => void, highlightCheck: boolean }) => {
  const direction = usePresenceData();

  return (
    <motion.div
      initial={{ opacity: 0, x: `${direction * 100}%` }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: `${direction * -100}%` }}
      transition={{ duration: 0.2 }}
      className={'absolute flex justify-center w-full'}
    >
      <CharacterCardBack
        character={character}
        width={304.83}
        height={493}
        checked={checked}
        disabled={(disabled && !checked) || applied}
        withCheck={true}
        onCheck={onCheck}
        highlightCheck={highlightCheck}
      />
    </motion.div>
  );
}

export const CardsSelector = (props: Props) => {
  const { className, opened, applied, withRules, onClose, onApply, ...rest } = props;

  const availableCharacterIds = useProgressStore(state => state.availableCharacters);
  const usedCharacters = useProgressStore(state => state.usedCharacters);
  const availableCharacters = ALL_CHARACTERS.filter(character => availableCharacterIds.includes(character.id) && !usedCharacters.includes(character.id));

  const [currentCharacter, setCurrentCharacter] = useState(availableCharacters[0]);
  const [direction, setDirection] = useState(1);
  const [step, nextStep] = useStep('cards-selector', withRules ? 1 : 5);
  const [confirmOpened, setConfirmOpened] = useState(false);

  const [checkedCharacters, setCheckedCharacters] = useState<Character[]>([]);

  const currentCharacterIndex = availableCharacters.indexOf(currentCharacter);

  const hasPrev = currentCharacterIndex > 0;
  const hasNext = currentCharacterIndex < availableCharacters.length - 1;

  const prev = () => {
    if (hasPrev) {
      setDirection(-1);
      setCurrentCharacter(availableCharacters[currentCharacterIndex - 1])
    }
  }

  const next = () => {
    if (hasNext) {
      setDirection(1)
      setCurrentCharacter(availableCharacters[currentCharacterIndex + 1])
    }
  }

  const handleCheck = (value: boolean) => {
    if (step === 2 || step === 4) {
      nextStep();
    }

    const newCheckedCharacters = value ? [...checkedCharacters, currentCharacter] : checkedCharacters.filter(character => character.id !== currentCharacter.id);

    setCheckedCharacters(newCheckedCharacters);
  }

  const apply = () => {
    setConfirmOpened(false);
    onApply?.(checkedCharacters);
  }

  useEffect(() => {
    if (!opened) {
      return;
    }

    if (step === 1 || step === 3) {
      const timeout = setTimeout(() => nextStep(), 600);

      return () => clearTimeout(timeout);
    }
  }, [opened, step]);

  if (!currentCharacter) {
    return null;
  }

  const isRules = step === 1 || step === 2 || step === 3 || step === 4;

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ opacity: 0, y: '20%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '20%' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={`absolute top-0 left-0 w-full h-full overflow-auto z-30 p-[20px] ${className ?? ''}`}
          {...rest}
        >
          <AnimatePresence>
            {!isRules && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className={`absolute top-[20px] left-[20px] w-[calc(100%-40px)] flex items-center justify-between transition-[filter] duration-200 ${confirmOpened ? 'blur pointer-events-none' : ''}`}
              >
                <span className="font-inter font-semibold text-[20px] leading-[100%] text-[#FFFFFF]">
                  {checkedCharacters.length}/{MAX_CHECKED_CHARACTERS}
                </span>
                <CloseButton className="ml-auto" onClick={onClose} />
              </motion.div> 
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {isRules && (
              <motion.div 
                initial={{ opacity: 0, y: '20%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-20%' }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className={`absolute top-[20px] left-0 w-full flex flex-col items-center transition-[filter] duration-200 ${confirmOpened ? 'blur pointer-events-none' : ''}`}
              >
                <div className="relative w-[265px] h-[92px] flex flex-col items-center">
                  <div className="w-full h-full bg-[#FFFFFF] rounded-[7.41px] border-[1.48px] border-[#000000]">
                    <AnimatePresence initial={false}>
                      <motion.div 
                        key={step === 1 || step === 2 ? '12' : '34'} 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="absolute top-0 left-0 w-full h-full p-[10px] flex items-center justify-center"
                      >
                        <p className="font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-center text-[#000000]">
                          {step === 1 || step === 2 ? 'Чтобы выбрать героя для сражения, отмечай его галочкой' : 'Если захочешь поменять героя, нажми на галочку еще раз'}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <svg className="absolute left-[23px] bottom-[-3px] translate-y-full" width="16" height="38" viewBox="0 0 16 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1C9 0.447715 8.55228 0 8 0C7.44772 0 7 0.447715 7 1H8H9ZM7.29289 37.7071C7.68342 38.0976 8.31658 38.0976 8.70711 37.7071L15.0711 31.3431C15.4616 30.9526 15.4616 30.3195 15.0711 29.9289C14.6805 29.5384 14.0474 29.5384 13.6569 29.9289L8 35.5858L2.34315 29.9289C1.95262 29.5384 1.31946 29.5384 0.928932 29.9289C0.538408 30.3195 0.538408 30.9526 0.928932 31.3431L7.29289 37.7071ZM8 1H7V37H8H9V1H8Z" fill="white"/>
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            animate={{ y: isRules ? 70 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={`absolute top-[84px] left-[20px] w-[calc(100%-40px)] flex flex-col items-center transition-[filter] duration-200 ${confirmOpened ? 'blur pointer-events-none' : ''}`}
          >
            <motion.div className={`relative w-full h-[493px] flex items-center justify-center`}>
              <AnimatePresence>
                {hasPrev && !isRules && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={'absolute left-[-8px] top-1/2 -translate-y-1/2 rotate-180 p-[8px] cursor-pointer z-20'}
                    onClick={prev}
                  >
                    <svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="path-1-outside-1_621_6663" maskUnits="userSpaceOnUse" x="-0.0341797" y="0" width="41" height="42" fill="black">
                        <rect fill="white" x="-0.0341797" width="41" height="42"/>
                        <path d="M20.0664 38.8008L14.5107 33.2461L23.1787 24.5781H2V16.7305H22.6836L14.5088 8.55566L20.0635 3L37.9639 20.8945L37.9619 20.8965L37.9658 20.9014L20.0664 38.8008Z"/>
                      </mask>
                      <path d="M20.0664 38.8008L14.5107 33.2461L23.1787 24.5781H2V16.7305H22.6836L14.5088 8.55566L20.0635 3L37.9639 20.8945L37.9619 20.8965L37.9658 20.9014L20.0664 38.8008Z" fill="white"/>
                      <path d="M20.0664 38.8008L18.6523 40.2151L20.0665 41.6291L21.4806 40.215L20.0664 38.8008ZM14.5107 33.2461L13.0965 31.8319L11.6822 33.2462L13.0967 34.6604L14.5107 33.2461ZM23.1787 24.5781L24.5929 25.9923L28.0071 22.5781H23.1787V24.5781ZM2 24.5781H0V26.5781H2V24.5781ZM2 16.7305V14.7305H0V16.7305H2ZM22.6836 16.7305V18.7305H27.512L24.0978 15.3163L22.6836 16.7305ZM14.5088 8.55566L13.0945 7.14157L11.6805 8.55579L13.0946 9.96988L14.5088 8.55566ZM20.0635 3L21.4775 1.58555L20.0631 0.17168L18.6491 1.58591L20.0635 3ZM37.9639 20.8945L39.3781 22.3087L40.7925 20.8943L39.3778 19.4801L37.9639 20.8945ZM37.9619 20.8965L36.5477 19.4823L35.2819 20.7481L36.4002 22.1459L37.9619 20.8965ZM37.9658 20.9014L39.38 22.3156L40.6458 21.0498L39.5276 19.652L37.9658 20.9014ZM20.0664 38.8008L21.4805 37.3864L15.9248 31.8318L14.5107 33.2461L13.0967 34.6604L18.6523 40.2151L20.0664 38.8008ZM14.5107 33.2461L15.925 34.6603L24.5929 25.9923L23.1787 24.5781L21.7645 23.1639L13.0965 31.8319L14.5107 33.2461ZM23.1787 24.5781V22.5781H2V24.5781V26.5781H23.1787V24.5781ZM2 24.5781H4V16.7305H2H0V24.5781H2ZM2 16.7305V18.7305H22.6836V16.7305V14.7305H2V16.7305ZM22.6836 16.7305L24.0978 15.3163L15.923 7.14145L14.5088 8.55566L13.0946 9.96988L21.2694 18.1447L22.6836 16.7305ZM14.5088 8.55566L15.9231 9.96975L21.4778 4.41409L20.0635 3L18.6491 1.58591L13.0945 7.14157L14.5088 8.55566ZM20.0635 3L18.6495 4.41445L36.5499 22.309L37.9639 20.8945L39.3778 19.4801L21.4775 1.58555L20.0635 3ZM37.9639 20.8945L36.5497 19.4803L36.5477 19.4823L37.9619 20.8965L39.3761 22.3107L39.3781 22.3087L37.9639 20.8945ZM37.9619 20.8965L36.4002 22.1459L36.4041 22.1508L37.9658 20.9014L39.5276 19.652L39.5237 19.6471L37.9619 20.8965ZM37.9658 20.9014L36.5516 19.4872L18.6522 37.3866L20.0664 38.8008L21.4806 40.215L39.38 22.3156L37.9658 20.9014Z" fill="black" mask="url(#path-1-outside-1_621_6663)"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={'relative w-full h-full'}>
                <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                  <Card
                    key={currentCharacter.id}
                    character={currentCharacter}
                    applied={applied}
                    highlightCheck={step === 2 || step === 4}
                    checked={checkedCharacters.includes(currentCharacter)}
                    disabled={checkedCharacters.length >= MAX_CHECKED_CHARACTERS}
                    onCheck={handleCheck}
                  />
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {hasNext && !isRules && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={'absolute right-[-8px] top-1/2 -translate-y-1/2 p-[8px] cursor-pointer z-20'}
                    onClick={next}
                  >
                    <svg width="41" height="42" viewBox="0 0 41 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id="path-1-outside-1_621_6663" maskUnits="userSpaceOnUse" x="-0.0341797" y="0" width="41" height="42" fill="black">
                        <rect fill="white" x="-0.0341797" width="41" height="42"/>
                        <path d="M20.0664 38.8008L14.5107 33.2461L23.1787 24.5781H2V16.7305H22.6836L14.5088 8.55566L20.0635 3L37.9639 20.8945L37.9619 20.8965L37.9658 20.9014L20.0664 38.8008Z"/>
                      </mask>
                      <path d="M20.0664 38.8008L14.5107 33.2461L23.1787 24.5781H2V16.7305H22.6836L14.5088 8.55566L20.0635 3L37.9639 20.8945L37.9619 20.8965L37.9658 20.9014L20.0664 38.8008Z" fill="white"/>
                      <path d="M20.0664 38.8008L18.6523 40.2151L20.0665 41.6291L21.4806 40.215L20.0664 38.8008ZM14.5107 33.2461L13.0965 31.8319L11.6822 33.2462L13.0967 34.6604L14.5107 33.2461ZM23.1787 24.5781L24.5929 25.9923L28.0071 22.5781H23.1787V24.5781ZM2 24.5781H0V26.5781H2V24.5781ZM2 16.7305V14.7305H0V16.7305H2ZM22.6836 16.7305V18.7305H27.512L24.0978 15.3163L22.6836 16.7305ZM14.5088 8.55566L13.0945 7.14157L11.6805 8.55579L13.0946 9.96988L14.5088 8.55566ZM20.0635 3L21.4775 1.58555L20.0631 0.17168L18.6491 1.58591L20.0635 3ZM37.9639 20.8945L39.3781 22.3087L40.7925 20.8943L39.3778 19.4801L37.9639 20.8945ZM37.9619 20.8965L36.5477 19.4823L35.2819 20.7481L36.4002 22.1459L37.9619 20.8965ZM37.9658 20.9014L39.38 22.3156L40.6458 21.0498L39.5276 19.652L37.9658 20.9014ZM20.0664 38.8008L21.4805 37.3864L15.9248 31.8318L14.5107 33.2461L13.0967 34.6604L18.6523 40.2151L20.0664 38.8008ZM14.5107 33.2461L15.925 34.6603L24.5929 25.9923L23.1787 24.5781L21.7645 23.1639L13.0965 31.8319L14.5107 33.2461ZM23.1787 24.5781V22.5781H2V24.5781V26.5781H23.1787V24.5781ZM2 24.5781H4V16.7305H2H0V24.5781H2ZM2 16.7305V18.7305H22.6836V16.7305V14.7305H2V16.7305ZM22.6836 16.7305L24.0978 15.3163L15.923 7.14145L14.5088 8.55566L13.0946 9.96988L21.2694 18.1447L22.6836 16.7305ZM14.5088 8.55566L15.9231 9.96975L21.4778 4.41409L20.0635 3L18.6491 1.58591L13.0945 7.14157L14.5088 8.55566ZM20.0635 3L18.6495 4.41445L36.5499 22.309L37.9639 20.8945L39.3778 19.4801L21.4775 1.58555L20.0635 3ZM37.9639 20.8945L36.5497 19.4803L36.5477 19.4823L37.9619 20.8965L39.3761 22.3107L39.3781 22.3087L37.9639 20.8945ZM37.9619 20.8965L36.4002 22.1459L36.4041 22.1508L37.9658 20.9014L39.5276 19.652L39.5237 19.6471L37.9619 20.8965ZM37.9658 20.9014L36.5516 19.4872L18.6522 37.3866L20.0664 38.8008L21.4806 40.215L39.38 22.3156L37.9658 20.9014Z" fill="black" mask="url(#path-1-outside-1_621_6663)"/>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence>
              {!applied && !isRules && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="mt-[20px] w-full flex justify-center"
                >
                  <Button 
                    disabled={checkedCharacters.length < MAX_CHECKED_CHARACTERS} 
                    onClick={() => setConfirmOpened(true)}
                  >
                    В бой!
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {confirmOpened && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute top-0 left-0 w-full h-full z-30`}
                src={overlay}
                alt=""
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {confirmOpened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute top-[185px] left-[20px] w-[calc(100%-40px)] flex flex-col items-center z-30`}
              >
                <div className="w-full bg-[#FFFFFF] rounded-[7.41px] border-[1.48px] border-[#000000] p-[20px]">
                  <p className="font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]">
                    Ты уверен в в выборе героев? После нажатия этой кнопки ты не сможешь их поменять
                  </p>
                </div>
                <Button className={'mt-[20px]'} onClick={apply}>Да, уверен</Button>
                <Button className={'mt-[20px]'} secondary onClick={() => setConfirmOpened(false)}>Нет, хочу поменять</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
import {AnimatePresence, HTMLMotionProps, motion} from "motion/react";
import {ALL_MONSTERS, Monster} from "~/shared/constants/monsters";
import { CloseButton } from "~/shared/ui/CloseButton";
import bg from '~/assets/images/bg.png';
import { useProgressStore } from "~/store/progressStore";
import { UnknownMonsterCard } from "~/shared/ui/UnknownMonsterCard";
import { MonsterCardFront } from "~/shared/ui/MonsterCardFront";
import {useState} from "react";
import overlay from "~/assets/images/overlay.png";
import {MonsterCardBack} from "~/shared/ui/MonsterCardBack.tsx";

type Props = HTMLMotionProps<'div'> & {
  className?: string
  opened: boolean;
  onClose: () => void;
}

export const MonstersModal = (props: Props) => {
  const { className, opened, onClose, ...rest } = props;

  const passedLevels = useProgressStore(state => state.passedLevels);
  const [openedCard, setOpenedCard] = useState<Monster | null>(null);

  return (
    <>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: '20%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '20%' }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className={`absolute top-0 left-0 w-full h-full overflow-auto bg-cover z-30 p-[calc(20px*var(--size-ratio))] ${className ?? ''}`}
            style={{backgroundImage: `url(${bg})`}}
            {...rest}
          >
            <CloseButton className="ml-auto" onClick={onClose} />
            <div className={`flex flex-wrap justify-center gap-x-[calc(41px*var(--size-ratio))] gap-y-[calc(42px*var(--size-ratio))] mt-[calc(20px*var(--size-ratio))] transition-[filter] duration-200 ${!!openedCard ? 'blur pointer-events-none' : ''}`}>
              {ALL_MONSTERS.map((monster, index) => (
                passedLevels.includes(monster.level) ? (
                  <MonsterCardFront key={index} height={236.16} width={146.02} monster={monster} className={'cursor-pointer'} onClick={() => setOpenedCard(monster)} />
                ) : (
                  <UnknownMonsterCard key={index} height={236.16} width={146.02} />
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!openedCard && (
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
        {!!openedCard && (
          <motion.div
            className={`absolute top-0 left-0 w-full h-full overflow-auto z-30 p-[calc(20px*var(--size-ratio))]`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={`absolute top-[calc(20px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))] flex items-center justify-between transition-[filter] duration-200`}
            >
              <CloseButton className="ml-auto" onClick={() => setOpenedCard(null)} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={`absolute top-[calc(104px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))] flex flex-col items-center transition-[filter] duration-200`}
            >
              <MonsterCardBack
                monster={openedCard}
                width={304.83}
                height={493}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
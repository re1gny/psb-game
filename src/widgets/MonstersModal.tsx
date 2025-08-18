import {AnimatePresence, HTMLMotionProps, motion} from "motion/react";
import { ALL_MONSTERS } from "~/shared/constants/monsters";
import { CloseButton } from "~/shared/ui/CloseButton";
import bg from '~/assets/images/bg.png';
import { useProgressStore } from "~/store/progressStore";
import { UnknownMonsterCard } from "~/shared/ui/UnknownMonsterCard";
import { MonsterCardFront } from "~/shared/ui/MonsterCardFront";

type Props = HTMLMotionProps<'div'> & {
  className?: string
  opened: boolean;
  onClose: () => void;
}

export const MonstersModal = (props: Props) => {
  const { className, opened, onClose, ...rest } = props;

  const passedLevels = useProgressStore(state => state.passedLevels);

  return (
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
          <div className="flex flex-wrap justify-center gap-x-[calc(41px*var(--size-ratio))] gap-y-[calc(42px*var(--size-ratio))] mt-[calc(20px*var(--size-ratio))]">
            {ALL_MONSTERS.map((monster, index) => (
              passedLevels.includes(monster.level) ? (
                <MonsterCardFront key={index} height={236.16} width={146.02} monster={monster} />
              ) : (
                <UnknownMonsterCard key={index} height={236.16} width={146.02} />
              )
            ))}
          </div>
        </motion.div> 
      )}
    </AnimatePresence>
  );
};
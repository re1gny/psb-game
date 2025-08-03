import {AnimatePresence, HTMLMotionProps, motion} from "motion/react";
import { ALL_CHARACTERS } from "~/shared/constants/characters";
import { CharacterCardFront } from "~/shared/ui/CharacterCardFront";
import { CloseButton } from "~/shared/ui/CloseButton";
import bg from '~/assets/images/characters-modal-bg.png';
import { useProgressStore } from "~/store/progressStore";
import { UnknownCharacterCard } from "~/shared/ui/UnknownCharacterCard";

type Props = HTMLMotionProps<'div'> & {
  className?: string
  opened: boolean;
  onClose: () => void;
}

export const CharactersModal = (props: Props) => {
  const { className, opened, onClose, ...rest } = props;

  const availableCharacters = useProgressStore(state => state.availableCharacters);

  const characters = [...ALL_CHARACTERS].sort((a, b) => +availableCharacters.includes(b.id) - +availableCharacters.includes(a.id));

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ opacity: 0, y: '20%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '20%' }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className={`absolute top-0 left-0 w-full h-full overflow-auto bg-cover z-30 p-[20px] ${className ?? ''}`}
          style={{backgroundImage: `url(${bg})`}}
          {...rest}
        >
          <CloseButton className="ml-auto" onClick={onClose} />
          <div className="flex flex-wrap gap-x-[41px] gap-y-[42px] mt-[20px]">
            {characters.map((character, index) => (
              availableCharacters.includes(character.id) ? (
                <CharacterCardFront key={index} height={236.16} width={146.02} character={character} />
              ) : (
                <UnknownCharacterCard key={index} height={236.16} width={146.02} character={character} />
              )
            ))}
          </div>
        </motion.div> 
      )}
    </AnimatePresence>
  );
};
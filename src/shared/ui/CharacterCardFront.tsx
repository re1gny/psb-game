import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getSizeRatio } from "../lib/getSizeRatio";
import { Character } from "../constants/characters";
import unusedOverlay from "~/assets/images/cards/unused-overlay.png";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  height: number;
  width: number;
  character: Character;
  inactive?: boolean;
}

const TARGET_WIDTH = 304.83;
const TARGET_HEIGHT = 493;

export const CharacterCardFront = (props: Props) => {
  const {className, style, height, width, character, inactive, ...rest} = props;

  const scale = getSizeRatio(width, height, TARGET_WIDTH, TARGET_HEIGHT);

  return (
    <div 
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`,
        '--scale': scale,
      } as CSSProperties}
      className={`relative ${className ?? ''}`}
      {...rest}
    >
      <div
        className={`rounded-[8.79px] border-[1.19px] bg-cover pt-[17.58px] pb-[23px] pl-[20px] pr-[20px] overflow-hidden`}
        style={{
          width: `${TARGET_WIDTH}px`,
          height: `${TARGET_HEIGHT}px`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${character.baseBg})`,
          transformOrigin: 'top left',
          borderColor: character.borderColor,
        }}
      >
        <div 
          className="relative w-full h-full rounded-[8.79px] border-[1.76px] bg-[#FFFFFF] pt-[49.82px] overflow-hidden"
          style={{
            backgroundImage: `url(${character.subBg})`,
            backgroundPositionY: '34px',
            backgroundSize: '100%',
            borderColor: character.borderColor,
          }}
        >
          <div className="flex items-center justify-center absolute top-[-1px] left-[-1px] w-[calc(100%+2px)] h-[49.82px] rounded-[8.79px] border-[1.76px] bg-[#FFFFFF] px-[14px]" style={{borderColor: character.borderColor}}>
            <h3 className="font-gilroy font-extrabold text-[18px] leading-[100%] text-[#000000] text-center">{character.name}</h3>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <img style={{
              width: `${character.imageWidth}px`,
              height: `${character.imageHeight}px`,
            }} src={character.image} alt="" />
          </div>
        </div>
        <AnimatePresence>
          {inactive && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={'absolute top-[-1px] left-[-1px] w-[calc(100%+2px)] h-[calc(100%+2px)]'}
              src={unusedOverlay}
              alt=""
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
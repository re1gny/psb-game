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
        width: `calc(${width}px*var(--size-ratio))`,
        height: `calc(${height}px*var(--size-ratio))`,
        '--scale': scale,
      } as CSSProperties}
      className={`relative ${className ?? ''}`}
      {...rest}
    >
      <div
        className={`rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.19px*var(--size-ratio))] bg-cover pt-[calc(17.58px*var(--size-ratio))] pb-[calc(23px*var(--size-ratio))] pl-[calc(20px*var(--size-ratio))] pr-[calc(20px*var(--size-ratio))] overflow-hidden`}
        style={{
          width: `calc(${TARGET_WIDTH}px*var(--size-ratio))`,
          height: `calc(${TARGET_HEIGHT}px*var(--size-ratio))`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${character.baseBg})`,
          transformOrigin: 'top left',
          borderColor: character.borderColor,
        }}
      >
        <div 
          className="relative w-full h-full rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] bg-[#FFFFFF] pt-[calc(49.82px*var(--size-ratio))] overflow-hidden"
          style={{
            backgroundImage: `url(${character.subBg})`,
            backgroundPositionY: 'calc(34px*var(--size-ratio))',
            backgroundSize: '100%',
            borderColor: character.borderColor,
          }}
        >
          <div className="flex items-center justify-center absolute top-[calc(-1px*var(--size-ratio))] left-[calc(-1px*var(--size-ratio))] w-[calc(100%+(2px*var(--size-ratio)))] h-[calc(49.82px*var(--size-ratio))] rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] bg-[#FFFFFF] px-[calc(14px*var(--size-ratio))]" style={{borderColor: character.borderColor}}>
            <h3 className="whitespace-pre-line font-gilroy font-extrabold text-[calc(18px*var(--size-ratio))] leading-[100%] text-[#000000] text-center">{character.name}</h3>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <img style={{
              width: `calc(${character.imageWidth}px*var(--size-ratio))`,
              height: `calc(${character.imageHeight}px*var(--size-ratio))`,
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
              className={'absolute top-[calc(-1px*var(--size-ratio))] left-[calc(-1px*var(--size-ratio))] w-[calc(100%+(2px*var(--size-ratio)))] h-[calc(100%+(2px*var(--size-ratio))]'}
              src={unusedOverlay}
              alt=""
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
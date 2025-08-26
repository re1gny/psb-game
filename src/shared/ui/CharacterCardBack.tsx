import {CSSProperties, DetailedHTMLProps, HTMLAttributes} from "react";
import { getSizeRatio } from "../lib/getSizeRatio";
import { Character } from "../constants/characters";
import { AnimatePresence, motion } from "framer-motion";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  height: number;
  width: number;
  character: Character;
  withCheck: boolean;
  disabled: boolean;
  checked: boolean;
  highlightCheck: boolean;
  onCheck: (value: boolean) => void;
}

const TARGET_WIDTH = 304.83;
const TARGET_HEIGHT = 493;

export const CharacterCardBack = (props: Props) => {
  const {className, style, height, width, character, withCheck, checked, disabled, onCheck, highlightCheck, ...rest} = props;

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
      <AnimatePresence>
        {highlightCheck && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className="absolute top-0 left-0 w-full h-full rounded-[calc(8.79px*var(--size-ratio))] bg-[#2C2D84CF] z-20"
          />
        )}
      </AnimatePresence>
      {withCheck && (
        <button 
          className={`absolute top-[calc(17px*var(--size-ratio))] left-[calc(18px*var(--size-ratio))] z-20 w-[calc(52px*var(--size-ratio))] h-[calc(52px*var(--size-ratio))] flex items-center justify-center rounded-[calc(10px*var(--size-ratio))] border-[calc(2px*var(--size-ratio))] border-[#000000] cursor-pointer ${disabled ? 'bg-[#f0885b] pointer-events-none' : 'bg-[#EA5616]'}`}
          style={{
            boxShadow: highlightCheck ? 'calc(0px*var(--size-ratio)) calc(0px*var(--size-ratio)) calc(8.5px*var(--size-ratio)) calc(0px*var(--size-ratio)) #FFFFFF' : 'none',
            transition: 'box-shadow 0.2s ease-in-out',
          }}
          disabled={disabled}
          onClick={() => onCheck(!checked)}
        >
          <AnimatePresence>
            {checked && (
              <motion.svg 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }} 
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className='w-[calc(35px*var(--size-ratio))] h-[calc(26px*var(--size-ratio))]'
                viewBox="0 0 35 26" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M34.6758 4.37695L21.915 17.1367L21.8848 17.1064L13.0547 25.9375L13.0527 25.9355L12.9912 25.999L0.231445 13.2393L4.19141 9.2793L12.9932 18.0781L21.8545 9.2168L21.8828 9.24512L30.7158 0.416016L34.6758 4.37695Z" fill="white"/>
              </motion.svg> 
            )}
          </AnimatePresence>
        </button>
      )}
      <div
        className={`relative flex flex-col rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.19px*var(--size-ratio))] bg-cover pt-[calc(17px*var(--size-ratio))] pb-[calc(16px*var(--size-ratio))] pl-[calc(18px*var(--size-ratio))] pr-[calc(18px*var(--size-ratio))]`}
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
          className="shrink-0 relative w-full h-[calc(208.82px*var(--size-ratio))] rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] bg-[#FFFFFF]"
          style={{
            backgroundImage: `url(${character.backSubBg})`,
            backgroundPositionY: 'calc(34px*var(--size-ratio))',
            backgroundSize: '100%',
            borderColor: character.borderColor,
          }}
        >
          <div
            className={`flex items-center justify-center absolute z-10 top-[calc(-1px*var(--size-ratio))] left-[calc(-1px*var(--size-ratio))] w-[calc(100%+(2px*var(--size-ratio)))] h-[calc(49.82px*var(--size-ratio))] rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] bg-[#FFFFFF] pr-[calc(14px*var(--size-ratio))] ${withCheck ? 'pl-[calc(50px*var(--size-ratio))]' : 'pl-[calc(14px*var(--size-ratio))]'}`}
            style={{ borderColor: character.borderColor }}
          >
            <h3 className="whitespace-pre-line font-gilroy font-extrabold text-[calc(18px*var(--size-ratio))] leading-[100%] text-[#000000] text-center">{character.name}</h3>
          </div>
          <div className="relative flex items-start justify-center w-full h-full overflow-hidden">
            <img
              className={'absolute'}
              style={{
                top: `calc(${character.backImageY}px*var(--size-ratio))`,
                width: `calc(${character.backImageWidth}px*var(--size-ratio))`,
                height: `calc(${character.backImageHeight}px*var(--size-ratio))`,
              }}
              src={character.image}
              alt=""
            />
          </div>
          <div
            className={`flex items-center justify-center absolute z-10 bottom-[calc(-1px*var(--size-ratio))] right-[calc(-1px*var(--size-ratio))] rounded-[calc(8px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] bg-[#FFFFFF] py-[calc(5px*var(--size-ratio))] px-[calc(7px*var(--size-ratio))]`}
            style={{ borderColor: character.borderColor }}
          >
            <span className="whitespace-pre-line font-gilroy font-extrabold text-[calc(18px*var(--size-ratio))] leading-[100%] text-[#000000]">{character.age}</span>
          </div>
        </div>
        <div
          className={`mt-[calc(14px*var(--size-ratio))] flex flex-col relative w-full flex-grow rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] py-[calc(8px*var(--size-ratio))] pr-[calc(6px*var(--size-ratio))] bg-[#FFFFFF] overflow-auto`}
          style={{ borderColor: character.borderColor }}
        >
          <div className='flex items-center'>
            <div className={'shrink-0 flex items-center justify-center w-[calc(32px*var(--size-ratio))]'}>
              {character.backSign}
            </div>
            <h4 className='whitespace-pre-line font-gilroy font-extrabold text-[calc(14px*var(--size-ratio))] leading-[140%] text-[#000000]'>
              Сильные стороны
            </h4>
          </div>
          <ul className='mt-1' style={{ color: character.borderColor }}>
            {character.pros.map((item, index) => (
              <li key={index} className={`whitespace-pre-line flex items-start font-gilroy font-light text-[calc(14px*var(--size-ratio))] leading-[100%] text-[#000000] ${index === 0 ? '' : 'mt-1'}`}>
                <div className='shrink-0 flex items-center justify-center w-[calc(32px*var(--size-ratio))] h-[calc(14px*var(--size-ratio))]'>
                  <svg className='w-[calc(4px*var(--size-ratio))] h-[calc(4px*var(--size-ratio))]' viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill={character.borderColor} />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className='mt-1 flex items-center'>
            <div className={'shrink-0 flex items-center justify-center w-[calc(32px*var(--size-ratio))]'}>
              {character.backSign}
            </div>
            <h4 className='whitespace-pre-line font-gilroy font-extrabold text-[calc(14px*var(--size-ratio))] leading-[140%] text-[#000000]'>
              Слабости
            </h4>
          </div>
          <ul className='mt-1' style={{ color: character.borderColor }}>
            {character.cons.map((item, index) => (
              <li key={index} className={`whitespace-pre-line flex items-start font-gilroy font-light text-[calc(14px*var(--size-ratio))] leading-[115%] text-[#000000] ${index === 0 ? '' : 'mt-1'}`}>
                <div className='shrink-0 flex items-center justify-center w-[calc(32px*var(--size-ratio))] h-[calc(14px*var(--size-ratio))]'>
                  <svg className='w-[calc(4px*var(--size-ratio))] h-[calc(4px*var(--size-ratio))]' viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill={character.borderColor} />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
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
        width: `${width}px`,
        height: `${height}px`,
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
            className="absolute top-0 left-0 w-full h-full rounded-[8.79px] bg-[#2C2D84CF] z-20"
          />
        )}
      </AnimatePresence>
      {withCheck && (
        <button 
          className={`absolute top-[17px] left-[18px] z-20 w-[52px] h-[52px] flex items-center justify-center rounded-[10px] border-[2px] border-[#000000] cursor-pointer ${disabled ? 'bg-[#f0885b] pointer-events-none' : 'bg-[#EA5616]'}`} 
          style={{
            boxShadow: highlightCheck ? '0px 0px 8.5px 0px #FFFFFF' : 'none',
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
                width="35" 
                height="26" 
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
        className={`relative flex flex-col rounded-[8.79px] border-[1.19px] bg-cover pt-[17px] pb-[16px] pl-[18px] pr-[18px]`}
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
          className="shrink-0 relative w-full h-[208.82px] rounded-[8.79px] border-[1.76px] bg-[#FFFFFF]"
          style={{
            backgroundImage: `url(${character.backSubBg})`,
            backgroundPositionY: '34px',
            backgroundSize: '100%',
            borderColor: character.borderColor,
          }}
        >
          <div
            className={`flex items-center justify-center absolute z-10 top-[-1px] left-[-1px] w-[calc(100%+2px)] h-[49.82px] rounded-[8.79px] border-[1.76px] bg-[#FFFFFF] pr-[14px] ${withCheck ? 'pl-[50px]' : 'pl-[14px]'}`}
            style={{ borderColor: character.borderColor }}
          >
            <h3 className="whitespace-pre-line font-gilroy font-extrabold text-[18px] leading-[100%] text-[#000000] text-center">{character.name}</h3>
          </div>
          <div className="relative flex items-start justify-center w-full h-full overflow-hidden">
            <img
              className={'absolute'}
              style={{
                top: `${character.backImageY}px`,
                width: `${character.backImageWidth}px`,
                height: `${character.backImageHeight}px`,
              }}
              src={character.image}
              alt=""
            />
          </div>
        </div>
        <div
          className={`mt-[14px] flex flex-col relative w-full flex-grow rounded-[8.79px] border-[1.76px] py-[8px] pr-[6px] bg-[#FFFFFF] overflow-auto`}
          style={{ borderColor: character.borderColor }}
        >
          <div className='flex items-center'>
            <div className={'shrink-0 flex items-center justify-center w-[32px]'}>
              {character.backSign}
            </div>
            <h4 className='whitespace-pre-line font-gilroy font-extrabold text-[14px] leading-[140%] text-[#000000]'>
              Сильные стороны
            </h4>
          </div>
          <ul className='mt-1' style={{ color: character.borderColor }}>
            {character.pros.map((item, index) => (
              <li key={index} className={`whitespace-pre-line flex items-start font-gilroy font-light text-[14px] leading-[100%] text-[#000000] ${index === 0 ? '' : 'mt-1'}`}>
                <div className='shrink-0 flex items-center justify-center w-[32px] h-[14px]'>
                  <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2" cy="2" r="2" fill={character.borderColor} />
                  </svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className='mt-1 flex items-center'>
            <div className={'shrink-0 flex items-center justify-center w-[32px]'}>
              {character.backSign}
            </div>
            <h4 className='whitespace-pre-line font-gilroy font-extrabold text-[14px] leading-[140%] text-[#000000]'>
              Слабости
            </h4>
          </div>
          <ul className='mt-1' style={{ color: character.borderColor }}>
            {character.cons.map((item, index) => (
              <li key={index} className={`whitespace-pre-line flex items-start font-gilroy font-light text-[14px] leading-[115%] text-[#000000] ${index === 0 ? '' : 'mt-1'}`}>
                <div className='shrink-0 flex items-center justify-center w-[32px] h-[14px]'>
                  <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
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
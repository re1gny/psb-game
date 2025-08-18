import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { getSizeRatio } from "../lib/getSizeRatio";
import { Monster } from "../constants/monsters";
import baseBg from '~/assets/images/cards/monsters/base-bg.png';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  height: number;
  width: number;
  monster: Monster;
}

const TARGET_WIDTH = 304.83;
const TARGET_HEIGHT = 493;

export const MonsterCardBack = (props: Props) => {
  const {style, height, width, monster, ...rest} = props;

  const scale = getSizeRatio(width, height, TARGET_WIDTH, TARGET_HEIGHT);

  return (
    <div 
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`,
        '--scale': scale,
      } as CSSProperties}
      {...rest}
    >
      <div
        className={`flex flex-col rounded-[8.79px] border-[1.19px] border-[#FFFFFF] bg-cover pt-[17.58px] pb-[23px] pl-[20px] pr-[20px]`}
        style={{
          width: `${TARGET_WIDTH}px`,
          height: `${TARGET_HEIGHT}px`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${baseBg})`,
          transformOrigin: 'top left',
        }}
      >
        <div 
          className="relative w-full h-[208.82px] rounded-[8.79px] border-[1.76px] border-[#FFFFFF] bg-[#000000] pt-[49.82px] overflow-auto"
          style={{
            backgroundImage: `url(${monster.backSubBg})`,
            backgroundPositionY: '49.82px',
            backgroundSize: '100%',
          }}
        >
          <div className="flex items-center justify-center absolute top-[-1px] left-[-1px] w-[calc(100%+2px)] h-[49.82px] rounded-[8.79px] border-[1.76px] bg-[#000000] px-[14px]">
            <h3 className="whitespace-pre-line font-gilroy font-extrabold text-[18px] leading-[100%] text-[#FFFFFF] text-center">{monster.name}</h3>
          </div>
          <div className="flex items-start justify-center w-full h-full">
            <img style={{
              width: `${monster.backImageWidth}px`,
              height: `${monster.backImageHeight}px`,
            }} src={monster.image} alt="" />
          </div>
        </div>
        <div 
          className="mt-[14px] flex relative w-full flex-grow rounded-[8.79px] border-[1.76px] border-[#000000] py-[12px] pl-[24px] pr-[12px] bg-[#FFFFFF] overflow-hidden"
        >
          <svg className="absolute top-[12px] left-[11px]" width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.81932 10.2327L0.137135 4.54784V-6.10352e-05H4.23024V4.54784L3.54806 10.2327H0.81932ZM2.18369 16.2359C1.00124 16.2359 0.0234375 15.2581 0.0234375 14.0757C0.0234375 12.8932 1.00124 11.9154 2.18369 11.9154C3.36614 11.9154 4.34394 12.8932 4.34394 14.0757C4.34394 15.2581 3.36614 16.2359 2.18369 16.2359Z" fill="black"/>
          </svg>
          <p className="whitespace-pre-line font-gilroy font-light text-[14px] leading-[115%] text-[#000000]">{monster.details}</p>
        </div>
      </div>
    </div>
  );
};
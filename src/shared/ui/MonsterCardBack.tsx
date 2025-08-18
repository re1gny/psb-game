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
        width: `calc(${width}px*var(--size-ratio))`,
        height: `calc(${height}px*var(--size-ratio))`,
        '--scale': scale,
      } as CSSProperties}
      {...rest}
    >
      <div
        className={`flex flex-col rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.19px*var(--size-ratio))] border-[#FFFFFF] bg-cover pt-[calc(17.58px*var(--size-ratio))] pb-[calc(23px*var(--size-ratio))] pl-[calc(20px*var(--size-ratio))] pr-[calc(20px*var(--size-ratio))]`}
        style={{
          width: `calc(${TARGET_WIDTH}px*var(--size-ratio))`,
          height: `calc(${TARGET_HEIGHT}px*var(--size-ratio))`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${baseBg})`,
          transformOrigin: 'top left',
        }}
      >
        <div 
          className="relative w-full h-[calc(208.82px*var(--size-ratio))] rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] border-[#FFFFFF] bg-[#000000] pt-[calc(49.82px*var(--size-ratio))] overflow-auto"
          style={{
            backgroundImage: `url(${monster.backSubBg})`,
            backgroundPositionY: 'calc(49.82px*var(--size-ratio))',
            backgroundSize: '100%',
          }}
        >
          <div className="flex items-center justify-center absolute top-[calc(-1px*var(--size-ratio))] left-[calc(-1px*var(--size-ratio))] w-[calc(100%+(2px*var(--size-ratio)))] h-[calc(49.82px*var(--size-ratio))] rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] bg-[#000000] px-[calc(14px*var(--size-ratio))]">
            <h3 className="whitespace-pre-line font-gilroy font-extrabold text-[calc(18px*var(--size-ratio))] leading-[100%] text-[#FFFFFF] text-center">{monster.name}</h3>
          </div>
          <div className="flex items-start justify-center w-full h-full">
            <img style={{
              width: `calc(${monster.backImageWidth}px*var(--size-ratio))`,
              height: `calc(${monster.backImageHeight}px*var(--size-ratio))`,
            }} src={monster.image} alt="" />
          </div>
        </div>
        <div 
          className="mt-[calc(14px*var(--size-ratio))] flex relative w-full flex-grow rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] border-[#000000] py-[calc(12px*var(--size-ratio))] pl-[calc(24px*var(--size-ratio))] pr-[calc(12px*var(--size-ratio))] bg-[#FFFFFF] overflow-hidden"
        >
          <svg className="absolute top-[calc(12px*var(--size-ratio))] left-[calc(11px*var(--size-ratio))] w-[calc(5px*var(--size-ratio))] h-[calc(17px*var(--size-ratio))]" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.81932 10.2327L0.137135 4.54784V-6.10352e-05H4.23024V4.54784L3.54806 10.2327H0.81932ZM2.18369 16.2359C1.00124 16.2359 0.0234375 15.2581 0.0234375 14.0757C0.0234375 12.8932 1.00124 11.9154 2.18369 11.9154C3.36614 11.9154 4.34394 12.8932 4.34394 14.0757C4.34394 15.2581 3.36614 16.2359 2.18369 16.2359Z" fill="black"/>
          </svg>
          <p className="whitespace-pre-line font-gilroy font-light text-[calc(14px*var(--size-ratio))] leading-[115%] text-[#000000]">{monster.details}</p>
        </div>
      </div>
    </div>
  );
};
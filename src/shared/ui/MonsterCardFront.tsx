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

export const MonsterCardFront = (props: Props) => {
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
        className={`rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.19px*var(--size-ratio))] border-[#FFFFFF] bg-cover pt-[calc(17.58px*var(--size-ratio))] pb-[calc(23px*var(--size-ratio))] pl-[calc(20px*var(--size-ratio))] pr-[calc(20px*var(--size-ratio))]`}
        style={{
          width: `calc(${TARGET_WIDTH}px*var(--size-ratio))`,
          height: `calc(${TARGET_HEIGHT}px*var(--size-ratio))`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${baseBg})`,
          transformOrigin: 'top left',
        }}
      >
        <div 
          className="relative w-full h-full rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] border-[#FFFFFF] bg-[#000000] pt-[calc(100.72px*var(--size-ratio))] overflow-hidden"
          style={{
            backgroundImage: `url(${monster.subBg})`,
            backgroundPositionY: 'calc(54px*var(--size-ratio))',
            backgroundSize: '100%',
          }}
        >
          <div className="flex items-center justify-center absolute top-[calc(-1px*var(--size-ratio))] left-[calc(-1px*var(--size-ratio))] w-[calc(100%+calc(2px*var(--size-ratio)))] h-[calc(100.72px*var(--size-ratio))] rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] bg-[#000000] px-[calc(14px*var(--size-ratio))]">
            <h3 className="whitespace-pre-line font-gilroy font-extrabold text-[calc(18px*var(--size-ratio))] leading-[100%] text-[#FFFFFF] text-center">{monster.name}</h3>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <img style={{
              width: `calc(${monster.imageWidth}px*var(--size-ratio))`,
              height: `calc(${monster.imageHeight}px*var(--size-ratio))`,
            }} src={monster.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
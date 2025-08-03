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
        width: `${width}px`,
        height: `${height}px`,
        '--scale': scale,
      } as CSSProperties}
      {...rest}
    >
      <div
        className={`rounded-[8.79px] border-[1.19px] border-[#FFFFFF] bg-cover pt-[17.58px] pb-[23px] pl-[20px] pr-[20px]`}
        style={{
          width: `${TARGET_WIDTH}px`,
          height: `${TARGET_HEIGHT}px`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${baseBg})`,
          transformOrigin: 'top left',
        }}
      >
        <div 
          className="relative w-full h-full rounded-[8.79px] border-[1.76px] border-[#FFFFFF] bg-[#000000] pt-[100.72px] overflow-hidden"
          style={{
            backgroundImage: `url(${monster.subBg})`,
            backgroundPositionY: '54px',
            backgroundSize: '100%',
          }}
        >
          <div className="flex items-center justify-center absolute top-[-1px] left-[-1px] w-[calc(100%+2px)] h-[100.72px] rounded-[8.79px] border-[1.76px] bg-[#000000] px-[14px]">
            <h3 className="font-gilroy font-extrabold text-[18px] leading-[100%] text-[#FFFFFF] text-center">{monster.name}</h3>
          </div>
          <div className="flex items-center justify-center w-full h-full">
            <img style={{
              width: `${monster.imageWidth}px`,
              height: `${monster.imageHeight}px`,
            }} src={monster.image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
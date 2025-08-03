import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { getSizeRatio } from "../lib/getSizeRatio";
import unknownImage from '~/assets/images/cards/monsters/unknown-bg.png';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  height: number;
  width: number;
}

const TARGET_WIDTH = 304.83;
const TARGET_HEIGHT = 493;

export const UnknownMonsterCard = (props: Props) => {
  const {style, height, width, ...rest} = props;

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
        className={`rounded-[8.79px] border-[1.19px] bg-cover border-[#FFFFFF] pt-[17.58px] pb-[23px] pl-[20px] pr-[20px]`}
        style={{
          width: `${TARGET_WIDTH}px`,
          height: `${TARGET_HEIGHT}px`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${unknownImage})`,
          transformOrigin: 'top left',
        }}
      >
        <div 
          className="relative w-full h-full rounded-[8.79px] border-[1.76px] border-[#000000] overflow-hidden"
        />
      </div>
    </div>
  );
};
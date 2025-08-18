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
        width: `calc(${width}px*var(--size-ratio))`,
        height: `calc(${height}px*var(--size-ratio))`,
        '--scale': scale,
      } as CSSProperties}
      {...rest}
    >
      <div
        className={`rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.19px*var(--size-ratio))] bg-cover border-[#FFFFFF] pt-[calc(17.58px*var(--size-ratio))] pb-[calc(23px*var(--size-ratio))] pl-[calc(20px*var(--size-ratio))] pr-[calc(20px*var(--size-ratio))]`}
        style={{
          width: `calc(${TARGET_WIDTH}px*var(--size-ratio))`,
          height: `calc(${TARGET_HEIGHT}px*var(--size-ratio))`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${unknownImage})`,
          transformOrigin: 'top left',
        }}
      >
        <div 
          className="relative w-full h-full rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] border-[#000000] overflow-hidden"
        />
      </div>
    </div>
  );
};
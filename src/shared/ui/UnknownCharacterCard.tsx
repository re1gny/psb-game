import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import { getSizeRatio } from "../lib/getSizeRatio";
import { Character } from "../constants/characters";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  height: number;
  width: number;
  character: Character;
}

const TARGET_WIDTH = 304.83;
const TARGET_HEIGHT = 493;

export const UnknownCharacterCard = (props: Props) => {
  const {style, height, width, character, ...rest} = props;

  const scale = getSizeRatio(width, height, TARGET_WIDTH, TARGET_HEIGHT);

  if (!character.unknownImage) {
    return null;
  }

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
        className={`rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.19px*var(--size-ratio))] bg-cover pt-[calc(17.58px*var(--size-ratio))] pb-[calc(23px*var(--size-ratio))] pl-[calc(20px*var(--size-ratio))] pr-[calc(20px*var(--size-ratio))]`}
        style={{
          width: `calc(${TARGET_WIDTH}px*var(--size-ratio))`,
          height: `calc(${TARGET_HEIGHT}px*var(--size-ratio))`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${character.unknownImage})`,
          transformOrigin: 'top left',
          borderColor: character.borderColor,
        }}
      >
        <div 
          className="relative w-full h-full rounded-[calc(8.79px*var(--size-ratio))] border-[calc(1.76px*var(--size-ratio))] overflow-hidden"
          style={{
            borderColor: character.borderColor,
          }}
        />
      </div>
    </div>
  );
};
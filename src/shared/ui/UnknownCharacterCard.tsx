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
        width: `${width}px`,
        height: `${height}px`,
        '--scale': scale,
      } as CSSProperties}
      {...rest}
    >
      <div
        className={`rounded-[8.79px] border-[1.19px] bg-cover pt-[17.58px] pb-[23px] pl-[20px] pr-[20px]`}
        style={{
          width: `${TARGET_WIDTH}px`,
          height: `${TARGET_HEIGHT}px`,
          transform: `scale(${scale})`,
          backgroundImage: `url(${character.unknownImage})`,
          transformOrigin: 'top left',
          borderColor: character.borderColor,
        }}
      >
        <div 
          className="relative w-full h-full rounded-[8.79px] border-[1.76px] overflow-hidden"
          style={{
            borderColor: character.borderColor,
          }}
        />
      </div>
    </div>
  );
};
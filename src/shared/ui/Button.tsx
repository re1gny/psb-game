import {HTMLMotionProps, motion } from "motion/react";
import {ReactNode} from "react";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  disabled?: boolean;
  secondary?: boolean;
  children?: ReactNode;
}

export const Button = (props: Props) => {
  const {children, className, disabled, secondary, ...rest} = props;

  return (
    <motion.div className={`relative w-[257px] h-[50px] transition-opacity duration-200 ${disabled ? 'opacity-70 pointer-events-none' : ''} ${className ?? ''}`} {...rest}>
      <div className={'absolute top-[10px] left-[10px] w-full h-full rounded-[10px] bg-[#FFFFFF] z-10'} />
      <button
        className={`whitespace-pre-line relative font-gilroy font-extrabold text-[20px] leading-[100%] tracking-[0.01em] text-center w-full h-full ${secondary ? 'bg-[#A53D10]' : 'bg-[#EA5616]'} rounded-[10px] border-2 border-[#411400] text-[#FFFFFF] cursor-pointer z-20 transition-transform duration-300 active:translate-x-[10px] active:translate-y-[10px]`}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};
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
    <motion.div className={`relative w-[calc(257px*var(--size-ratio))] h-[calc(50px*var(--size-ratio))] transition-opacity duration-200 ${disabled ? 'opacity-70 pointer-events-none' : ''} ${className ?? ''}`} {...rest}>
      <div className={'absolute top-[calc(10px*var(--size-ratio))] left-[calc(10px*var(--size-ratio))] w-full h-full rounded-[calc(10px*var(--size-ratio))] bg-[#FFFFFF] z-10'} />
      <button
        className={`whitespace-pre-line relative font-gilroy font-extrabold text-[calc(20px*var(--size-ratio))] leading-[100%] tracking-[0.01em] text-center w-full h-full ${secondary ? 'bg-[#A53D10]' : 'bg-[#EA5616]'} rounded-[calc(10px*var(--size-ratio))] border-2 border-[#411400] text-[#FFFFFF] cursor-pointer z-20 transition-transform duration-300 active:translate-x-[calc(10px*var(--size-ratio))] active:translate-y-[calc(10px*var(--size-ratio))]`}
        disabled={disabled}
      >
        {children}
      </button>
    </motion.div>
  );
};
import {HTMLMotionProps, motion } from "motion/react";
import {ReactNode} from "react";

type Props = HTMLMotionProps<'div'> & {
  className?: string;
  locked: boolean;
  passed: boolean;
  onClick: () => void;
}

export const PathButton = (props: Props) => {
  const {children, className, locked, passed, onClick, ...rest} = props;

  return (
    <motion.div className={`absolute w-[81.94px] h-[81.94px] ${className ?? ''}`} {...rest}>
      <div className={'absolute top-[5px] left-[5px] w-full h-full rounded-[8.81px] bg-[#FFFFFF] z-10'} />
      <button
        className={`relative w-full h-full flex items-center justify-center border-2 border-[#000000] bg-[#EA5616] rounded-[8.81px] z-20 transition-transform duration-300 active:translate-x-[5px] active:translate-y-[5px] ${locked || passed ? 'pointer-events-none' : 'pointer-events-auto'}`}
        disabled={locked || passed}
        onClick={onClick}
      >
        <motion.span
          className={`flex items-center justify-center border-2 rounded-[2px] border-[#000000] w-[66.91px] h-[66.91px] transition-[background] duration-200 ${locked ? 'bg-[#262773]' : passed ? 'bg-[#FFFFFF]' : 'bg-[#EA5616]'}`}
        >
          {locked ? (
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.2098 18.8226V14.7258C35.2098 8.99034 30.7033 4.48389 24.9678 4.48389C19.2323 4.48389 14.7259 8.99034 14.7259 14.7258V18.8226C11.2436 18.8226 8.58072 21.4855 8.58072 24.9678V39.3065C8.58072 42.7887 11.2436 45.4516 14.7259 45.4516H35.2098C38.692 45.4516 41.3549 42.7887 41.3549 39.3065V24.9678C41.3549 21.4855 38.692 18.8226 35.2098 18.8226ZM18.8227 14.7258C18.8227 11.2436 21.4856 8.58066 24.9678 8.58066C28.4501 8.58066 31.113 11.2436 31.113 14.7258V18.8226H18.8227V14.7258Z" fill="white"/>
            </svg>
          ) : passed ? (
            <svg width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.30239 11.9241L0 17.6897L16.3395 38L44 7.07586L37.931 0L16.3395 24.5034L6.30239 11.9241Z" fill="#262773"/>
            </svg>
          ) : (
            <svg width="33" height="41" viewBox="0 0 33 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.629 10.2419V14.3387C30.1113 14.3387 32.7742 17.0016 32.7742 20.4839V34.8226C32.7742 38.3048 30.1113 40.9677 26.629 40.9677H6.14516C2.6629 40.9677 0 38.3048 0 34.8226V20.4839C0 15.671 4.09677 14.3817 6.14516 14.3387H22.5323V10.2419C22.5323 6.75968 19.8694 4.09677 16.3871 4.09677C12.9048 4.09677 10.2419 6.75968 10.2419 10.2419H6.14516C6.14516 4.50645 10.6516 0 16.3871 0C22.1226 0 26.629 4.50645 26.629 10.2419Z" fill="white"/>
            </svg>
          )}
        </motion.span>
      </button>
    </motion.div>
  );
};
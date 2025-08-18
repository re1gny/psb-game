import {AnimatePresence, HTMLMotionProps, motion} from "motion/react";
import {useLocalStorage} from "~/shared/lib/useLocalStorage";

type Props = HTMLMotionProps<'div'> & {
  className?: string
}

export const CookieNotification = (props: Props) => {
  const { className, ...rest } = props;
  const [acceptCookie, setAcceptCookie] = useLocalStorage('accept-cookie', false);

  return (
    <AnimatePresence>
      {!acceptCookie && (
        <motion.div
          className={`flex items-center gap-[20px] rounded-[7.41px] border-[#000000] border-[1.48px] bg-[#282976] pl-[20px] pt-[8px] pr-[8px] pb-[8px] ${className ?? ''}`}
          {...rest}
        >
          <h3 className={'whitespace-pre-line font-gilroy text-[#FFFFFF] text-[13px] leading-[100%] tracking-[0.01em] font-light'}>
            <a href="https://fut.ru/cookie" target={'_blank'}>
              Мы используем куки.
            </a>{' '}Играя, ты соглашаешься с этим
          </h3>
          <button
            className={'whitespace-pre-line font-gilroy shrink-0 w-[112px] h-[50px] rounded-[10px] border-[1px] border-[#411400] bg-[#EA5616] font-extrabold text-[20px] leading-[100%] tracking-normal text-[#FFFFFF]'}
            onClick={() => setAcceptCookie(true)}
          >
            окей
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
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
          className={`flex items-center gap-[calc(10px*var(--size-ratio))] rounded-[calc(7.41px*var(--size-ratio))] border-[#000000] border-[calc(1.48px*var(--size-ratio))] bg-[#282976] pl-[calc(20px*var(--size-ratio))] pt-[calc(8px*var(--size-ratio))] pr-[calc(8px*var(--size-ratio))] pb-[calc(8px*var(--size-ratio))] ${className ?? ''}`}
          {...rest}
        >
          <h3 className={'whitespace-pre-line font-gilroy text-[#FFFFFF] text-[calc(13px*var(--size-ratio))] leading-[100%] tracking-[0.01em] font-light'}>
            <a href="https://fut.ru/cookie" target={'_blank'}>
              Мы используем куки.
            </a>{' '}Играя, ты соглашаешься с этим
          </h3>
          <button
            className={'whitespace-pre-line font-gilroy shrink-0 w-[calc(112px*var(--size-ratio))] h-[calc(50px*var(--size-ratio))] rounded-[calc(10px*var(--size-ratio))] border-[calc(1px*var(--size-ratio))] border-[#411400] bg-[#EA5616] font-extrabold text-[calc(20px*var(--size-ratio))] leading-[100%] tracking-normal text-[#FFFFFF]'}
            onClick={() => setAcceptCookie(true)}
          >
            окей
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
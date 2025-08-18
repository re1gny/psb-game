import {createFileRoute, useNavigate} from '@tanstack/react-router'
import { Path } from '~/widgets/Path';
import {AnimatePresence, motion} from "motion/react";
import overlay from "~/assets/images/overlay.png";
import {Button} from "~/shared/ui/Button";
import {useStep} from "~/shared/lib/useStep";
import {useEffect} from "react";
import {useProgressStore} from "~/store/progressStore";

export const Route = createFileRoute('/full-loose')({
  component: Component,
})

function Component() {
  const [step, next] = useStep('full-loose', 0);
  const navigate = useNavigate();
  const restartState = useProgressStore(state => state.restart);
  const applyStartRules = useProgressStore(state => state.applyStartRules);

  const restart = () => {
    navigate({ to: '/' })
    restartState()
    applyStartRules();
  }

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => next(), 600);
    }
  }, [step])

  return (
    <>
      <Path withRules={false} blur={step === 1} />
      <AnimatePresence>
        {step === 1 && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute top-0 left-0 w-full h-full z-20`}
            src={overlay}
            alt=""
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={'flex flex-col items-center absolute top-[calc(186px*var(--size-ratio))] left-[calc(20px*var(--size-ratio))] w-[calc(100%-(40px*var(--size-ratio)))] z-30'}
          >
            <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[calc(7.41px*var(--size-ratio))] p-[calc(20px*var(--size-ratio))] w-full z-10'}>
              <h3 className={'whitespace-pre-line font-gilroy font-extrabold text-[calc(20px*var(--size-ratio))] leading-[108%] tracking-[0] text-[#EA5616] text-center'}>
                Жизни закончились…
              </h3>
              <p className={'whitespace-pre-line mt-[calc(20px*var(--size-ratio))] font-gilroy font-light text-[calc(16px*var(--size-ratio))] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                Проигрыш — не повод паниковать. Это просто сюжетный поворот. Давай ещё раз — монстры ждут реванша
              </p>
            </motion.div>
            <Button className={'mt-[calc(20px*var(--size-ratio))]'} onClick={restart}>
              Готов к реваншу!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

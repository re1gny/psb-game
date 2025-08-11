import {createFileRoute} from '@tanstack/react-router'
import bg from '~/assets/images/bg.png'
import {AnimatePresence, motion} from "motion/react";
import monsters from "~/assets/images/final/monsters.png";
import characters from "~/assets/images/final/characters.png";
import fireworks from "~/assets/images/final/fireworks.png";
import {Button} from "~/shared/ui/Button";
import {useStep} from "~/shared/lib/useStep";
import {useEffect} from "react";

export const Route = createFileRoute('/final')({
  component: Component,
})

function Component() {
  const [step, next] = useStep('final', 1)

  const click = () => {
    if (step === 2) {
      next();
    }
  }

  const finish = () => {
    window.open('https://t.me/psb_team', '_blank')
  }

  useEffect(() => {
    if (step === 1) {
      setTimeout(() => next(), 1600)
    }
  }, [step])

  return (
    <div className={'relative bg-cover h-full'} style={{ backgroundImage: `url(${bg})` }} onClick={click}>
      <div className={'absolute top-0 left-0 w-full h-full'}>
        <AnimatePresence>
          {step === 1 && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={'absolute top-[30px] left-[-155px] h-[650.75px] w-[684px]'}
              src={monsters}
              alt=""
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {(step === 2 || step === 3) && (
            <motion.img
              initial={{ opacity: 0, scale: 0.6, y: '20%' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={'absolute top-[-95px] left-[-215px] h-[622px] w-[728.18px]'}
              src={fireworks}
              alt=""
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 2 && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8, y: '10%' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={'absolute top-[237px] left-[-84px] h-[580px] w-[569.83px]'}
              src={characters}
              alt=""
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={'flex flex-col items-center absolute top-[84px] left-[20px] w-[calc(100%-40px)]'}
            >
              <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] p-[20px] w-full z-10'}>
                <p className={'font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                  Ты только что доказал, что идеальная команда зависит не от возраста, а от правильного сочетания навыков.{' '}<span className={'font-extrabold text-[#EA5616]'}>Креативность, опыт и командная работа</span>{' '}— вот что помогает побеждать любых монстров!
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={'flex flex-col items-center absolute top-[114px] left-[20px] w-[calc(100%-40px)]'}
            >
              <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] p-[20px] w-full z-10'}>
                <h3 className={'font-gilroy font-extrabold text-[20px] leading-[108%] tracking-normal text-center text-[#EA5616]'}>
                  Теперь твоя очередь применить навыки на практике!
                </h3>
                <p className={'mt-[12px] font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                  Команда ПСБ ищет именно таких героев — азартных и смелых. Тех, кто умеет:
                </p>
                <ul className={'mt-3'}>
                  {[
                    'Находить креативные решения',
                    'Применять любые знания и опыт на практике',
                    'Не бояться нестандартных и страшных задач',
                  ].map((item, index) => (
                    <li key={index} className={`flex items-center ${index === 0 ? '' : 'mt-3'} `}>
                      <div className={'shrink-0 flex items-center justify-center w-[31px] h-full translate-x-[-4px]'}>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.88784 1.33974C8.38537 0.364826 9.7784 0.364825 10.2759 1.33974L11.7941 4.31468C11.9889 4.69636 12.3544 4.96192 12.7776 5.02923L16.0761 5.55382C17.1571 5.72574 17.5875 7.05059 16.8141 7.82504L14.4539 10.1882C14.1511 10.4914 14.0115 10.9211 14.0782 11.3444L14.5986 14.6436C14.7691 15.7247 13.6422 16.5435 12.6666 16.0473L9.68972 14.5329C9.30779 14.3386 8.85598 14.3386 8.47405 14.5329L5.49717 16.0473C4.52162 16.5435 3.39463 15.7247 3.56516 14.6436L4.08553 11.3444C4.15229 10.9211 4.01268 10.4914 3.70987 10.1882L1.34969 7.82504C0.576234 7.05059 1.0067 5.72574 2.08765 5.55382L5.38614 5.02923C5.80933 4.96192 6.17484 4.69636 6.36963 4.31468L7.88784 1.33974Z" fill="#17185D"/>
                        </svg>
                      </div>
                      <span className={`font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={'mt-3 font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]'}>
                  Хочешь попробовать? Жми «Хочу в команду», если готов к настоящим приключениям
                </p>
              </motion.div>
              <Button className={'mt-[20px]'} onClick={finish}>
                Хочу в команду
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

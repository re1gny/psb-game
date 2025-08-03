import {useRouter} from '@tanstack/react-router'
import bg from '~/assets/images/bg.png'
import {LivesScore} from "~/widgets/LivesScore";
import {AnimatePresence, motion} from "motion/react";
import {Button} from "~/shared/ui/Button";
import {useEffect, useState} from "react";
import {PathButton} from "~/shared/ui/PathButton";
import {useProgressStore} from "~/store/progressStore";
import overlay from "~/assets/images/overlay.png";
import { CharactersModal } from '~/widgets/CharactersModal';
import { MonstersModal } from '~/widgets/MonstersModal';
import { Rules } from '~/widgets/Rules';
import {useStep} from "~/shared/lib/useStep";

type Props = {
  withRules: boolean;
  blur?: boolean;
  pulse?: boolean;
}

export const Path = (props: Props) => {
  const { withRules, blur, pulse } = props;

  const [step, next] = useStep('path', withRules ? 0 : 10);
  const [charactersModalOpened, setCharactersModalOpened] = useState(false);
  const [monstersModalOpened, setMonstersModalOpened] = useState(false);
  const [rulesModalOpened, setRulesModalOpened] = useState(false);
  const router = useRouter();
  const passedLevels = useProgressStore(state => state.passedLevels);
  const remainingLives = useProgressStore(state => state.remainingLives);

  const play = (level: number) => {
    router.navigate({ to: `/level-${level}` })
  }

  const hasBlur = step === 1 || step === 3 || step === 5 || blur;

  useEffect(() => {
    if (step === 0 || step === 2 || step === 4) {
      setTimeout(() => next(), 600);
    }
  }, [step])

  return (
    <>
      <div className={'relative bg-cover h-full'} style={{ backgroundImage: `url(${bg})` }}>
        <LivesScore className={`absolute top-[20px] right-[21px] transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`} remainingLives={remainingLives} />
        <div className={`absolute top-0 left-0 w-full h-full transition-[filter] duration-200 ${hasBlur ? 'blur pointer-events-none' : ''}`}>
          <svg className={'absolute left-[120px] top-[-9.5px]'} width="150" height="583" viewBox="0 0 150 583" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.5 581.5C67.8333 582.333 148.5 560.1 148.5 464.5C144.1 444.5 123 439.833 113 440C76 445.167 1.8 436.1 1 358.5C1 317.7 26.6667 313.5 39.5 316.5C78.1667 321.667 154.1 307.6 148.5 210C142.9 194.8 122.5 183.667 113 180C64.3333 177.5 -15.4 114.1 21 -9.5" stroke="white" strokeWidth="2"/>
          </svg>
          <PathButton className={'absolute top-[538px] left-[81px]'} locked={false} passed={passedLevels.includes(1)} onClick={() => play(1)} />
          <PathButton className={'absolute top-[394px] left-[227px]'} locked={!passedLevels.includes(1)} passed={passedLevels.includes(2)} onClick={() => play(2)} />
          <PathButton className={'absolute top-[282px] left-[82px]'} locked={!passedLevels.includes(2)} passed={passedLevels.includes(3)} onClick={() => play(3)} />
          <PathButton className={'absolute top-[138px] left-[227px]'} locked={!passedLevels.includes(3)} passed={passedLevels.includes(4)} onClick={() => play(4)} />
        </div>
        <div className={'flex flex-col items-center gap-[15px] absolute top-[20px] left-[20px]'}>
          <button onClick={() => setRulesModalOpened(true)} className={`flex items-center justify-center border-2 border-[#000000] rounded-[10px] bg-[#EA5616] w-[48px] h-[48px] transition-[filter] duration-200 ${hasBlur && step !== 1 ? 'blur pointer-events-none' : 'z-20'}`}>
            <svg width="21" height="33" viewBox="0 0 21 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.09114 22.8442V22.4488C7.10128 20.6136 7.27365 19.1535 7.60824 18.0686C7.95298 16.9837 8.43966 16.1118 9.0683 15.4527C9.69693 14.7835 10.4624 14.1701 11.3648 13.6124C11.9833 13.2271 12.5359 12.8064 13.0226 12.3501C13.5194 11.8837 13.9098 11.3666 14.1937 10.7988C14.4776 10.2208 14.6195 9.577 14.6195 8.86725C14.6195 8.06625 14.432 7.37171 14.0568 6.78363C13.6817 6.19555 13.1747 5.73929 12.5359 5.41483C11.9073 5.09037 11.2026 4.92814 10.4219 4.92814C9.702 4.92814 9.0176 5.0853 8.36869 5.39962C7.72991 5.7038 7.1976 6.17021 6.77175 6.79884C6.35604 7.41734 6.12284 8.20313 6.07214 9.15622H0.657771C0.708467 7.22976 1.17487 5.61762 2.05699 4.31979C2.94925 3.02196 4.1254 2.04859 5.58546 1.39968C7.05565 0.750765 8.67793 0.426308 10.4523 0.426308C12.3889 0.426308 14.0923 0.765974 15.5625 1.44531C17.0428 2.12464 18.1936 3.09294 19.0149 4.35021C19.8463 5.59734 20.2621 7.07767 20.2621 8.79121C20.2621 9.94708 20.0745 10.9813 19.6993 11.8938C19.3343 12.8064 18.8121 13.6175 18.1328 14.3272C17.4535 15.037 16.6474 15.6707 15.7146 16.2284C14.8933 16.7353 14.219 17.2626 13.6918 17.8101C13.1747 18.3576 12.7894 19.0015 12.5359 19.7416C12.2926 20.4716 12.1658 21.374 12.1557 22.4488V22.8442H7.09114ZM9.73749 32.3346C8.82495 32.3346 8.03916 32.0101 7.38011 31.3612C6.72106 30.7123 6.39153 29.9214 6.39153 28.9886C6.39153 28.0761 6.72106 27.2954 7.38011 26.6465C8.03916 25.9976 8.82495 25.6731 9.73749 25.6731C10.6399 25.6731 11.4206 25.9976 12.0797 26.6465C12.7489 27.2954 13.0834 28.0761 13.0834 28.9886C13.0834 29.6071 12.9263 30.1699 12.612 30.6768C12.3078 31.1838 11.9022 31.5894 11.3953 31.8935C10.8984 32.1876 10.3458 32.3346 9.73749 32.3346Z" fill="white"/>
            </svg>
          </button>
          <motion.button
            animate={{ scale: pulse ? 1.2 : 1 }}
            onClick={() => setCharactersModalOpened(true)} className={`flex items-center justify-center border-2 border-[#000000] rounded-[10px] bg-[#EA5616] w-[48px] h-[48px] transition-[filter] duration-200 ${hasBlur && step !== 3 ? 'blur pointer-events-none' : 'z-20'}`}>
            <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.3887 0C27.816 0 28.2262 0.168692 28.5283 0.46875C28.8303 0.768701 28.9999 1.17548 29 1.59961V30.4004C28.9999 30.8245 28.8303 31.2313 28.5283 31.5312C28.2262 31.8313 27.816 32 27.3887 32H5.63867C4.14322 31.9999 2.70881 31.4095 1.65137 30.3594C0.594167 29.3093 0.00010425 27.8853 0 26.4004V4.7998C5.21323e-05 3.52684 0.509636 2.30638 1.41602 1.40625C2.32236 0.506153 3.55125 8.5648e-05 4.83301 0H17V12.5L21 8.5L25.5 12.5V0H27.3887ZM5.63867 24C4.99781 24.0001 4.38285 24.2531 3.92969 24.7031C3.47664 25.1532 3.22266 25.764 3.22266 26.4004C3.22276 27.0366 3.4768 27.6467 3.92969 28.0967C4.38285 28.5467 4.99781 28.7997 5.63867 28.7998H25.7773V24H5.63867Z" fill="white"/>
            </svg>
          </motion.button>
          <button onClick={() => setMonstersModalOpened(true)} className={`flex items-center justify-center border-2 border-[#000000] rounded-[10px] bg-[#EA5616] w-[48px] h-[48px] transition-[filter] duration-200 ${hasBlur && step !== 5 ? 'blur pointer-events-none' : 'z-20'}`}>
            <svg width="29" height="32" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.3887 0C27.816 0 28.2262 0.168692 28.5283 0.46875C28.8303 0.768701 28.9999 1.17548 29 1.59961V30.4004C28.9999 30.8245 28.8303 31.2313 28.5283 31.5312C28.2262 31.8313 27.816 32 27.3887 32H5.63867C4.14322 31.9999 2.70881 31.4095 1.65137 30.3594C0.594167 29.3093 0.00010425 27.8853 0 26.4004V4.7998C5.21323e-05 3.52684 0.509636 2.30638 1.41602 1.40625C2.32236 0.506153 3.55125 8.5648e-05 4.83301 0H27.3887ZM5.63867 24C4.99781 24.0001 4.38285 24.2531 3.92969 24.7031C3.47664 25.1532 3.22266 25.764 3.22266 26.4004C3.22276 27.0366 3.4768 27.6467 3.92969 28.0967C4.38285 28.5467 4.99781 28.7997 5.63867 28.7998H25.7773V24H5.63867ZM13.9414 15.3828L10.292 11.0791L8 13.0518L13.9414 20L24 9.4209L21.793 7L13.9414 15.3828Z" fill="white"/>
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {hasBlur && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={'absolute top-0 left-0 w-full h-full'}
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
              className={'flex flex-col items-center absolute top-[238px] left-[20px] w-[calc(100%-40px)]'}
            >
              <motion.svg exit={{ opacity: 0 }} className={'absolute -translate-y-full left-[48px] top-[9px]'} width="129" height="210" viewBox="0 0 129 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M118.808 208.534C118.55 209.023 118.738 209.628 119.227 209.885C119.716 210.142 120.32 209.954 120.578 209.466L118.808 208.534ZM0.46718 5.15377C-0.000178814 5.44804 -0.140497 6.06546 0.153771 6.53282L4.94915 14.1489C5.24341 14.6162 5.86084 14.7566 6.3282 14.4623C6.79555 14.168 6.93587 13.5506 6.6416 13.0832L2.37905 6.31341L9.14888 2.05085C9.61624 1.75659 9.75656 1.13916 9.46229 0.671805C9.16802 0.204446 8.5506 0.0641274 8.08324 0.358396L0.46718 5.15377ZM119.693 209L120.578 209.466C126.99 197.28 129.843 180.025 128.784 160.663C127.725 141.284 122.744 119.711 113.399 98.8367C94.7057 57.0812 58.5103 18.0446 1.22161 5.02487L1 6L0.778386 6.97513C57.3328 19.828 93.0819 58.3488 111.573 99.6539C120.821 120.309 125.742 141.643 126.787 160.773C127.834 179.92 124.994 196.778 118.808 208.534L119.693 209Z" fill="white"/>
              </motion.svg>
              <motion.div className={'flex flex-col items-center w-full'} exit={{ opacity: 0, scale: 0.8 }}>
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] p-[20px] w-full z-10'}>
                  <p className={'font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                    Здесь ты можешь всегда вспомнить правила игры
                  </p>
                </motion.div>
                <Button className={'mt-[20px]'} onClick={next}>
                  Далее
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={'flex flex-col items-center absolute top-[229px] left-[20px] w-[calc(100%-40px)]'}
            >
              <motion.svg exit={{ opacity: 0 }} className={'absolute -translate-y-full left-[48px] top-[9px]'} width="125" height="139" viewBox="0 0 125 139" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M121.404 137.833C121.312 138.377 121.679 138.894 122.223 138.986C122.768 139.078 123.284 138.712 123.376 138.167L121.404 137.833ZM0.382342 6.21355C-0.0520004 6.55468 -0.12757 7.18331 0.213553 7.61766L5.77247 14.6957C6.11359 15.13 6.74223 15.2056 7.17658 14.8645C7.61092 14.5233 7.68649 13.8947 7.34537 13.4604L2.4041 7.16879L8.69568 2.22753C9.13002 1.88641 9.20559 1.25777 8.86447 0.823423C8.52335 0.389081 7.89471 0.313511 7.46037 0.654634L0.382342 6.21355ZM122.39 138L123.376 138.167C128.39 108.588 121.927 78.4165 102.104 54.19C82.2824 29.9649 49.1875 11.7855 1.11935 6.00715L1 7L0.880648 7.99285C48.5643 13.725 81.1353 31.7213 100.556 55.4565C119.976 79.1902 126.332 108.763 121.404 137.833L122.39 138Z" fill="white"/>
              </motion.svg>
              <motion.div className={'flex flex-col items-center w-full'} exit={{ opacity: 0, scale: 0.8 }}>
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] py-[20px] px-[34px] w-full z-10'}>
                  <p className={'font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                    Это альбом, где хранится твоя коллекция игровых карт с героями
                  </p>
                </motion.div>
                <Button className={'mt-[20px]'} onClick={next}>
                  Далее
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 5 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={'flex flex-col items-center absolute top-[229px] left-[20px] w-[calc(100%-40px)]'}
            >
              <motion.svg exit={{ opacity: 0 }} className={'absolute -translate-y-full left-[51px] top-[-3.5px]'} width="121" height="66" viewBox="0 0 121 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M119.016 64.6788C119.115 65.2222 119.636 65.5826 120.179 65.4838C120.722 65.385 121.083 64.8644 120.984 64.321L119.016 64.6788ZM0.208495 8.38875C-0.129041 8.82588 -0.0482986 9.45388 0.388838 9.79142L7.51239 15.2919C7.94952 15.6294 8.57752 15.5487 8.91505 15.1115C9.25259 14.6744 9.17185 14.0464 8.73471 13.7089L2.40267 8.81957L7.29197 2.48753C7.6295 2.05039 7.54876 1.42239 7.11162 1.08486C6.67449 0.747322 6.04649 0.828064 5.70896 1.2652L0.208495 8.38875ZM120 64.4999L120.984 64.321C116.432 39.2878 103.995 22.8616 83.7803 13.8983C63.653 4.9739 35.9314 3.5005 0.872478 8.00807L1 8.99991L1.12752 9.99175C36.0686 5.49933 63.347 7.02596 82.9697 15.7266C102.505 24.3883 114.568 40.2121 119.016 64.6788L120 64.4999Z" fill="white"/>
              </motion.svg>
              <motion.div className={'flex flex-col items-center w-full'} exit={{ opacity: 0, scale: 0.8 }}>
                <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] p-[20px] w-full z-10'}>
                  <p className={'font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000] text-center'}>
                    Эта книжка – место рефлексии над побежденными монстрами и твоими успехами
                  </p>
                </motion.div>
                <Button className={'mt-[20px]'} onClick={next}>
                  Далее
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <CharactersModal opened={charactersModalOpened} onClose={() => setCharactersModalOpened(false)} />
      <MonstersModal opened={monstersModalOpened} onClose={() => setMonstersModalOpened(false)} />
      <AnimatePresence>
        {rulesModalOpened && (
          <Rules
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className={'!absolute top-0 left-0 w-full h-full z-50 bg-[#FFFFFF]'}
            onPlay={() => setRulesModalOpened(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

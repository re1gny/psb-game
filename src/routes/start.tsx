import {createFileRoute, useRouter} from '@tanstack/react-router'
import bg from '~/assets/images/bg.png'
import {AnimatePresence, motion, stagger, Variants} from "motion/react";
import lightning from "~/assets/images/start/lightning.png";
import lightningPart1 from "~/assets/images/start/lightning-part-1.png";
import lightningPart2 from "~/assets/images/start/lightning-part-2.png";
import character1 from "~/assets/images/start/character-1.png";
import character2 from "~/assets/images/start/character-2.png";
import character3 from "~/assets/images/start/character-3.png";
import character4 from "~/assets/images/start/character-4.png";
import character5 from "~/assets/images/start/character-5.png";
import monster1 from "~/assets/images/start/monster-1.png";
import monster2 from "~/assets/images/start/monster-2.png";
import monster3 from "~/assets/images/start/monster-3.png";
import monster4 from "~/assets/images/start/monster-4.png";
import {CookieNotification} from "~/widgets/CookieNotification";
import {Button} from "~/shared/ui/Button";
import {preloadAllImages} from "~/shared/lib/preloadImages";
import {useEffect, useState} from "react";

export const Route = createFileRoute('/start')({
  component: Component,
})

const LIGHTNING_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.2,
    }
  }
};

const CHARACTER_CONTAINER_VARIANTS: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: stagger(0.05, { from: 'center', startDelay: 0.5, ease: 'circInOut' }),
    }
  }
};

const CHARACTER_VARIANTS: Variants = {
  hidden: { x: '-100%' },
  show: { x: '0%', transition: { type: 'tween', duration: 0.2 } },
};

const MONSTER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: stagger(0.05, { from: 'center', startDelay: 0.5, ease: 'circInOut' }),
    }
  }
};

const MONSTER_VARIANTS: Variants = {
  hidden: { x: '100%' },
  show: { x: '0%', transition: { type: 'tween', duration: 0.2 } },
};

function Component() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    preloadAllImages().then(() => setLoaded(true));
  }, []);

  const next = () => {
    router.navigate({ to: '/rules' })
  }

  return (
    <div className={'relative bg-cover h-full'} style={{ backgroundImage: `url(${bg})` }}>
      <svg className={'absolute top-[20px] left-[50%] -translate-x-2/4'} width="87" height="27" viewBox="0 0 87 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_210_127" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="87" height="27">
          <path d="M86.4226 0H0V26.4078H86.4226V0Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_210_127)">
          <path d="M17.5919 0L8.79996 8.80522H17.5919V26.4078L26.3916 17.6261V0H17.5919Z" fill="#EA5616"/>
          <path d="M8.79976 26.4078L17.5917 17.6026H8.79976V0L0 8.7817V26.4078H8.79976Z" fill="white"/>
          <path d="M35.1833 22.0012H39.8065V8.35816H46.8432V22.0012H51.4585V4.39856H35.1833V22.0012ZM80.044 10.9927H76.1026V8.35816H84.8867V4.39856H71.4794V22.0012C71.4794 22.0012 78.0694 22.0012 80.2634 22.0012C83.7818 22.0012 86.4225 20.237 86.4225 16.4969C86.4225 12.7569 83.7818 10.9927 80.044 10.9927ZM79.6052 18.2611H76.1026V14.7406H79.6052C80.6944 14.7406 81.7993 15.1718 81.7993 16.4969C81.7993 17.822 80.6944 18.2611 79.6052 18.2611ZM62.758 18.2533C59.6784 18.2533 57.9467 15.9951 57.9467 13.1959C57.9467 10.9535 59.2083 8.13862 62.6718 8.13862C64.8345 8.13862 66.2293 9.46372 66.7229 10.0753L69.5282 7.26829C67.8356 5.24536 65.289 3.95947 62.4445 3.95947C57.3433 3.95947 53.3157 7.73874 53.3157 13.2038C53.3157 18.3081 57.3433 22.4481 62.4445 22.4481C65.5005 22.4481 68.2039 20.9662 69.8887 18.6767L67.0677 15.8383C66.1744 17.2418 64.7169 18.2533 62.758 18.2533Z" fill="white"/>
        </g>
      </svg>
      <div className={'absolute top-0 left-0 w-full h-full'}>
        <motion.img
          initial={'hidden'}
          animate={'show'}
          variants={LIGHTNING_VARIANTS}
          className={'absolute bottom-[-15px] left-[131px] h-[725px] w-[204px]'}
          src={lightning}
          alt=""
        />
        <motion.img
          initial={'hidden'}
          animate={'show'}
          variants={LIGHTNING_VARIANTS}
          className={'absolute bottom-[-6px] left-[44px] h-[135px] w-[270.5px]'}
          src={lightningPart1}
          alt=""
        />
        <motion.img
          initial={'hidden'}
          animate={'show'}
          variants={LIGHTNING_VARIANTS}
          className={'absolute bottom-[-5.5px] left-[222px] h-[40.5px] w-[98.5px]'}
          src={lightningPart2}
          alt=""
        />
      </div>
      <motion.div
        initial={'hidden'}
        animate={'show'}
        variants={CHARACTER_CONTAINER_VARIANTS}
        className={'absolute top-0 left-0 w-full h-full'}
      >
        <motion.img
          variants={CHARACTER_VARIANTS}
          className={'absolute top-[-25px] left-[-79.94px] h-[403px] w-[268.56px]'}
          src={character1}
          alt=""
        />
        <motion.img
          variants={CHARACTER_VARIANTS}
          className={'absolute top-[110px] left-[-130px] h-[309.75px] w-[309.75px]'}
          src={character2}
          alt=""
        />
        <motion.img
          variants={CHARACTER_VARIANTS}
          className={'absolute top-[159px] left-[-75px] h-[363.92px] w-[363.92px]'}
          src={character3}
          alt=""
        />
        <motion.img
          variants={CHARACTER_VARIANTS}
          className={'absolute top-[241px] left-[-35px] h-[342.53px] w-[177.82px]'}
          src={character4}
          alt=""
        />
        <motion.img
          variants={CHARACTER_VARIANTS}
          className={'absolute top-[386px] left-[-137px] h-[415px] w-[415px]'}
          src={character5}
          alt=""
        />
      </motion.div>
      <motion.div
        initial={'hidden'}
        animate={'show'}
        variants={MONSTER_CONTAINER_VARIANTS}
        className={'absolute top-0 left-0 w-full h-full'}
      >
        <motion.img
          variants={MONSTER_VARIANTS}
          className={'absolute top-[-9px] right-[-161px] h-[350px] w-[350px]'}
          src={monster1}
          alt=""
        />
        <motion.img
          variants={MONSTER_VARIANTS}
          className={'absolute top-[171px] right-[-94px] h-[260px] w-[260px]'}
          src={monster2}
          alt=""
        />
        <motion.img
          variants={MONSTER_VARIANTS}
          className={'absolute top-[296px] right-[-60px] h-[247px] w-[247px]'}
          src={monster3}
          alt=""
        />
        <motion.img
          variants={MONSTER_VARIANTS}
          className={'absolute top-[397px] right-[-110px] h-[327px] w-[327px]'}
          src={monster4}
          alt=""
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className={'flex flex-col items-center absolute top-[112px] left-[20px] w-[calc(100%-40px)]'}
      >
        <motion.div className={'relative bg-[#FFFFFF] border-2 border-[#000000] rounded-[7.41px] pt-[21px] pr-[16px] pb-[24px] pl-[22px] w-full z-10'}>
          <h3 className={'font-gilroy font-extrabold text-[20px] leading-[108%] tracking-normal text-center text-[#EA5616]'}>Командная сила ведет к победе!</h3>
          <p className={'mt-[20px] font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]'}>
            Каждый день мы сталкиваемся с различными трудностями и задачами: распечатать постеры, спланировать вечеринку, презентовать результаты работы перед клиентом.
            Какие-то задачи даются легче зумерам, а с другими быстро справляются миллениалы. Но речь не о том, кто круче — дело в <span className={'font-extrabold text-[#EA5616]'}> синергии наших сильных сторон</span> для достижения общего результата.
          </p>
          <p className={'mt-3 font-gilroy font-light text-[16px] leading-[105%] tracking-[0.01em] text-[#000000]'}>
            Готов испытать свои силы и доказать, что <span className={'font-extrabold text-[#EA5616]'}>объединение навыков поможет справиться с любой задачей?</span>
          </p>
        </motion.div>
        <AnimatePresence>
          {loaded && (
            <Button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              className={'mt-[20px]'}
              onClick={next}
            >
              Играть
            </Button>
          )}
        </AnimatePresence>
      </motion.div>
      <CookieNotification
        className={'absolute bottom-[20px] left-[20px] w-[calc(100%-40px)] z-10'}
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        transition={{ delay: 0.8 }}
      />
    </div>
  )
}

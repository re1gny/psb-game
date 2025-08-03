import {useNavigate} from '@tanstack/react-router'
import { Path } from '~/widgets/Path';
import {WinCards} from "~/widgets/WinCards";
import {ALL_CHARACTERS} from "~/shared/constants/characters";
import {ALL_LEVELS, Level} from "~/shared/constants/levels";
import {AnimatePresence, motion} from "motion/react";
import {useStep} from "~/shared/lib/useStep";
import {useEffect, useState} from "react";
import {NewCards} from "~/widgets/NewCards";

type Props = {
  level: Level;
}

export function LevelWin({ level }: Props) {
  const [step, next] = useStep(`level-${level.id}-win`, 0)
  const navigate = useNavigate();
  const [finished, setFinished] = useState(false);

  const winCards = ALL_CHARACTERS.filter((item) => level.correctCharacters.includes(item.id));
  const newCards = ALL_CHARACTERS.filter((item) => level.winNewCharacters.includes(item.id));

  const isLastLevel = level.id === ALL_LEVELS[ALL_LEVELS.length - 1].id;

  const finish = () => {
    next()
    setFinished(true);
  }

  useEffect(() => {
    if (step === 0) {
      setTimeout(() => next(), 300);
    }

    if (step === 1) {
      setTimeout(() => next(), 1600);
    }

    if (!isLastLevel && step === 2) {
      setTimeout(() => next(), 300);
    }

    if (isLastLevel && step === 2) {
      setTimeout(() => navigate({ to: '/final' }), 800);
    }
  }, [step])

  useEffect(() => {
    if (finished) {
      setTimeout(() => setFinished(false), 200);
    }
  }, [finished]);

  return (
    <>
      <Path withRules={false} blur={step === 1 || step === 3} pulse={finished} />
      <AnimatePresence>
        {step === 1 && (
          <WinCards cards={winCards} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(step === 3 || step === 4) && !isLastLevel && (
          <NewCards cards={newCards} onFinish={finish} onNext={next} />
        )}
      </AnimatePresence>
    </>
  )
}

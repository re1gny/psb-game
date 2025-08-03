import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {LEVEL_2} from "~/shared/constants/levels";
import {AnimatePresence, motion} from "motion/react";
import {LevelWin} from "~/widgets/LevelWin";

export const Route = createFileRoute('/level-2-win')({
  component: Component,
})

function Component() {
  return (
    <LevelWin level={LEVEL_2} />
  )
}

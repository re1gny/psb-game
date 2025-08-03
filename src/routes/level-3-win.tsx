import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {LEVEL_3} from "~/shared/constants/levels";
import {AnimatePresence, motion} from "motion/react";
import {LevelWin} from "~/widgets/LevelWin";

export const Route = createFileRoute('/level-3-win')({
  component: Component,
})

function Component() {
  return (
    <LevelWin level={LEVEL_3} />
  )
}

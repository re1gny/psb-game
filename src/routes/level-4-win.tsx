import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {LEVEL_4} from "~/shared/constants/levels";
import {AnimatePresence, motion} from "motion/react";
import {LevelWin} from "~/widgets/LevelWin";

export const Route = createFileRoute('/level-4-win')({
  component: Component,
})

function Component() {
  return (
    <LevelWin level={LEVEL_4} />
  )
}

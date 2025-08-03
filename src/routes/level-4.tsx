import {createFileRoute} from '@tanstack/react-router'
import { useState } from 'react';
import { LEVEL_4 } from '~/shared/constants/levels';
import {LevelGame} from "~/widgets/LevelGame";

export const Route = createFileRoute('/level-4')({
  component: Component,
})

function Component() {
  const [state, setState] = useState(1);

  return <LevelGame key={state} level={LEVEL_4} onReset={() => setState(prev => prev + 1)} />
}

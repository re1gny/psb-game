import {createFileRoute} from '@tanstack/react-router'
import { useState } from 'react';
import { LEVEL_1 } from '~/shared/constants/levels';
import {LevelGame} from "~/widgets/LevelGame";

export const Route = createFileRoute('/level-1')({
  component: Component,
})

function Component() {
  const [state, setState] = useState(1);

  return <LevelGame key={state} level={LEVEL_1} onReset={() => setState(prev => prev + 1)} />
}

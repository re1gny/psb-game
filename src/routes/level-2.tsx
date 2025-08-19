import {createFileRoute} from '@tanstack/react-router'
import {useState} from 'react';
import { LEVEL_2 } from '~/shared/constants/levels';
import {LevelGame} from "~/widgets/LevelGame";

export const Route = createFileRoute('/level-2')({
  component: Component,
})

function Component() {
  const [state, setState] = useState(1);
  const [hasReset, setHasReset] = useState(false);

  return <LevelGame key={state} level={LEVEL_2} hasReset={hasReset} onReset={() => {
    setState(prev => prev + 1)
    setHasReset(true)
  }} />
}

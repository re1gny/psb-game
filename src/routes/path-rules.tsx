import {createFileRoute} from '@tanstack/react-router'
import { Path } from '~/widgets/Path';
import {useProgressStore} from "~/store/progressStore.ts";

export const Route = createFileRoute('/path-rules')({
  component: Component,
})

function Component() {
  const applyPathRules = useProgressStore(state => state.applyPathRules);

  return (
    <Path withRules onPassRules={() => applyPathRules()} />
  )
}

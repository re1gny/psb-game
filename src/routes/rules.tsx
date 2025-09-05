import {createFileRoute, useRouter} from '@tanstack/react-router'
import { Rules } from '~/widgets/Rules'
import {useProgressStore} from "~/store/progressStore.ts";
import {reachMetrikaGoal} from "~/shared/lib/reachMetrikaGoal.ts";

export const Route = createFileRoute('/rules')({
  component: Component,
})

function Component() {
  const router = useRouter();
  const shouldShowPathRules = useProgressStore(state => state.shouldShowPathRules);
  const passedLevels = useProgressStore(state => state.passedLevels);
  const applyStartRules = useProgressStore(state => state.applyStartRules);

  const play = () => {
    applyStartRules();
    reachMetrikaGoal('start_after_training')
    router.navigate({ to: passedLevels.includes(1) ? '/path' : '/level-1' })
  }

  return (
    <Rules className={'relative h-full'} onPlay={play} />
  )
}

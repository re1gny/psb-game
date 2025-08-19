import {createFileRoute, Navigate} from '@tanstack/react-router'
import {useProgressStore} from "~/store/progressStore.ts";

export const Route = createFileRoute('/')({
  component: Component,
})

function Component() {
  const isPersisted = useProgressStore(state => state.isPersisted);
  const isRestarted = useProgressStore(state => state.isRestarted);
  const shouldShowStartRules = useProgressStore(state => state.shouldShowStartRules);
  const shouldShowPathRules = useProgressStore(state => state.shouldShowPathRules);

  if (isPersisted && !isRestarted) {
    return (
      <Navigate to={shouldShowStartRules ? '/rules' : shouldShowPathRules ? '/path-rules' : '/path'} replace={true} />
    )
  }

  return (
    <Navigate to={'/start'} replace={true} />
  )
}

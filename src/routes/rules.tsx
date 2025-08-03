import {createFileRoute, useRouter} from '@tanstack/react-router'
import { Rules } from '~/widgets/Rules'

export const Route = createFileRoute('/rules')({
  component: Component,
})

function Component() {
  const router = useRouter();

  const play = () => {
    router.navigate({ to: '/path-rules' })
  }

  return (
    <Rules className={'relative h-full'} onPlay={play} />
  )
}

import {createFileRoute} from '@tanstack/react-router'
import { Path } from '~/widgets/Path';

export const Route = createFileRoute('/path')({
  component: Component,
})

function Component() {
  return (
    <Path withRules={false} />
  )
}

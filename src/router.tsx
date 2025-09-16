import {createMemoryHistory, createRouter as createTanStackRouter} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: () => 'Произошла ошибка',
    defaultNotFoundComponent: () => 'Страница не найдена',
    scrollRestoration: true,
    // history: createMemoryHistory(),
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}

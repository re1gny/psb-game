import {getRouterContext, Outlet, useMatch, useMatches} from "@tanstack/react-router";
import {useContext, useRef} from "react";
import {AnimatePresence, motion, useIsPresent} from "motion/react";
import cloneDeep from "lodash/cloneDeep";
import * as React from "react";

const AnimatedOutletComponent = () => {
  const RouterContext = getRouterContext();

  const routerContext = useContext(RouterContext);

  const renderedContext = useRef(routerContext);

  const isPresent = useIsPresent();

  if (isPresent) {
    renderedContext.current = cloneDeep(routerContext);
  }

  return (
    <motion.div
      className={'absolute h-full w-full top-0 left-0'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RouterContext.Provider value={renderedContext.current}>
        <Outlet />
      </RouterContext.Provider>
    </motion.div>
  );
};

export const AnimatedOutlet = () => {
  const matches = useMatches();
  const match = useMatch({ strict: false });
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  const nextMatch = matches[nextMatchIndex];

  return (
    <AnimatePresence mode={'popLayout'}>
      <AnimatedOutletComponent key={nextMatch?.id} />
    </AnimatePresence>
  )
}
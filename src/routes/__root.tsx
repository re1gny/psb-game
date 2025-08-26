import {
  HeadContent,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useCallback, useLayoutEffect, useRef, useState} from "react";
import type {CSSProperties} from "react";
import {getSizeRatio} from "~/shared/lib/getSizeRatio";
import {AnimatedOutlet} from "~/shared/ui/AnimatedOutlet";
import { useLayoutStore } from '~/store/layoutStore';

export const Route = createRootRoute({
  shellComponent: RootDocument,
})

function RootDocument() {
  const sizeRatio = useLayoutStore(state => state.sizeRatio);
  const setSizeRatio = useLayoutStore(state => state.setSizeRatio);
  const setContentRef = useLayoutStore(state => state.setContentRef);
  const observedElementRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const calculateSizeRatio = useCallback(() => {
    const width = observedElementRef.current?.offsetWidth
    const height = observedElementRef.current?.offsetHeight

    if (width && height) {
      setSizeRatio(getSizeRatio(width, height, 375, 667))
    }
  }, [])

  useLayoutEffect(() => {
    if (!observedElementRef.current) {
      return;
    }

    const observer = new ResizeObserver(() => calculateSizeRatio());

    observer.observe(observedElementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [])

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentRef(contentRef);
    }
  }, [])

  return (
    <>
      <HeadContent />
      <div className={'w-full h-full min-lg:p-4'} style={{'--size-ratio': sizeRatio} as CSSProperties}>
        <div ref={observedElementRef} className={'flex items-center justify-center w-full h-full'}>
          <div ref={contentRef} className={`relative overflow-hidden w-full h-full translate-x-0 translate-y-0 min-lg:border-2 min-lg:border-black min-lg:rounded-xl min-lg:box-content min-lg:max-w-[calc(375px*var(--size-ratio))] min-lg:max-h-[calc(667px*var(--size-ratio))]`}>
            <AnimatedOutlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
      <Scripts />
    </>
  )
}

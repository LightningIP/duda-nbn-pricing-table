import {
  type MaybeComputedElementRef,
  unrefElement, useEventListener, useMutationObserver, useResizeObserver
} from '@vueuse/core';
//import { tryOnMounted } from '@vueuse/shared'
import { shallowRef, watch } from 'vue'

export interface useElementScrollHeightOptions {
  /**
   * Reset values to 0 on component unmounted
   *
   * @default true
   */
  reset?: boolean

  /**
   * Listen to window resize event
   *
   * @default true
   */
  windowResize?: boolean
  /**
   * Listen to window scroll event
   *
   * @default true
   */
  windowScroll?: boolean

  /**
   * Immediately call update on component mounted
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Timing to recalculate the bounding box
   *
   * Setting to `next-frame` can be useful when using this together with something like {@link useBreakpoints}
   * and therefore the layout (which influences the bounding box of the observed element) is not updated on the current tick.
   *
   * @default 'sync'
   */
  updateTiming?: 'sync' | 'next-frame'
}

/**
 * Reactive bounding box of an HTML element.
 *
 * @see https://vueuse.org/useElementBounding
 * @param target
 */
export function useElementScrollHeight(
  target: MaybeComputedElementRef,
  options: useElementScrollHeightOptions = {},
) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
    updateTiming = 'sync',
  } = options

  const scrollHeight = shallowRef(0)

  function recalculate() {
    const el = unrefElement(target)

    if (!el) {
      if (reset) {
        scrollHeight.value = 0
      }
      return
    }

    const rect = el.getBoundingClientRect()

    scrollHeight.value = rect.height
  }

  function update() {
    if (updateTiming === 'sync')
      recalculate()
    else if (updateTiming === 'next-frame')
      requestAnimationFrame(() => recalculate())
  }

  useResizeObserver(target, update)
  watch(() => unrefElement(target), ele => !ele && update())
  // trigger by css or style
  useMutationObserver(target, update, {
    attributeFilter: ['style', 'class'],
  })

  if (windowScroll)
    useEventListener('scroll', update, { capture: true, passive: true })
  if (windowResize)
    useEventListener('resize', update, { passive: true })

  //tryOnMounted(() => {
    if (immediate)
      update()
  //})

  return {
    scrollHeight,
    update,
  }
}

export type useElementScrollHeightReturn = ReturnType<typeof useElementScrollHeight>

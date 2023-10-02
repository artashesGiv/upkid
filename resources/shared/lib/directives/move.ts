import { DirectiveOptions } from 'vue'
import {Maybe} from "@/shared/types/helpers";
import isMobile from "@/shared/lib/utils/other/isMobile";

const TinyGesture = () =>
    // @ts-ignore
    import(/* webpackMode: "lazy", webpackPreload: true, webpackChunkName: "chunks/libs/tinygesture" */ 'tinygesture')

type TineGestureEvent = 'panstart' | 'panend' | 'panmove'
type TinyGesture = {
    destroy: () => void
    on: (name: TineGestureEvent, callback: (event: Event) => void) => void
    off: (name: TineGestureEvent, callback: (event: Event) => void) => void
    touchMoveY: number
    velocityY: number
}

let moveDirective: Maybe<Move> = null

class Move {
    private _startCoordinate: Maybe<number> = null
    private _isClosable = false
    private _closeTimeout
    private _scrolled: Maybe<number> = null
    private readonly _closeTime = 100
    private _isMovable = true
    private gesture: Maybe<TinyGesture> = null
    private readonly element: Maybe<HTMLElement> = null
    private onCloseHandler: Maybe<() => void> = null
    private scrollableElement: Maybe<HTMLElement> = null

    private startScrollableOffset: Maybe<number> = null

    constructor(el: HTMLElement, onClose?: () => void) {
        this.element = el
        this.addEvents()
        if (onClose) {
            this.onCloseHandler = onClose.bind(this)
        }
    }

    private onScroll = (event: Event) => {
        const scrollableElement = event.target as HTMLElement

        if (this.scrolled === null) {
            this.scrolled = scrollableElement.scrollTop
            this.isMovable = this.scrolled === 0
        }
    }

    private onTouchStart = (event: TouchEvent) => {
        this.isMovable = !this.scrollableElement || (this.scrollableElement && this.scrollableElement.scrollTop === 0)
        this.startCoordinate = event.touches[0].clientY
    }

    private onTouchMove = (event: TouchEvent) => {
        this.isMovable = Number(this.scrollableElement?.scrollTop) <= Number(this.element?.scrollTop)

        if (this.startCoordinate && this.isMovable) {
            const diffClientY = event.touches[0].clientY - this.startCoordinate
            const isClosed = diffClientY > Number(this.element?.clientHeight) / 4
            if (isClosed) {
                if (event.touches.length === 1 && diffClientY > 0) {
                    this.setElementStyle('transform', `translate(0,${diffClientY}px)`)
                }

                this.isClosable = true
            }
        }

    }

    private onTouchEnd = (event: TouchEvent) => {
        this.startCoordinate = null
        this.isMovable = true
        if (this.element) {
            this.setElementStyle('transform', this.isClosable ? `translate(0,calc(100% + 3rem))` : '')
            this.setElementStyle('transition', `transform ${this._closeTime}ms ease`)

            this._closeTimeout = setTimeout(() => {
                this.element!.style.transition = ''

                if (this.onCloseHandler && this.isClosable) {
                    this.onCloseHandler()
                    this.isClosable = false
                }
            }, this._closeTime)
        }

        this.removeScrollEvent()
    }

    private onPanMove(event) {
        // console.log(this.isMovable, 'moveAble')
        //
        // console.log(event)

        const isMovable = this.scrollableElement?.scrollTop === this.element?.scrollTop

        if (this.isMovable && this.gesture && this.element) {
            console.log(isMovable)
            const moved = this.gesture.touchMoveY
            const swipeForce = this.gesture.velocityY
            let closable = false

            if (event.touches.length === 1 && moved > 0) {
                this.setElementStyle('transform', `translate(0,${moved}px)`)
                closable = moved >= (window.innerHeight - this.startCoordinate!) / 2 || swipeForce >= 20
            }

            if (this.isClosable !== closable) {
                this.isClosable = closable
            }
        }
    }

    private addEvents() {
        this.setScrollableElement()
        this.addScrollEvent()
        this.setElementStyle('transition', '')
    }

    private removeEvents() {
        this.removeScrollEvent()
    }

    private addScrollEvent() {
        this.scrollableElement?.addEventListener('touchstart', this.onTouchStart, { passive: true })
        this.scrollableElement?.addEventListener('touchend', this.onTouchEnd, { passive: true })
        this.scrollableElement?.addEventListener('touchmove', this.onTouchMove, { passive: true })
    }

    private removeScrollEvent() {
        this.scrollableElement?.removeEventListener('scroll', this.onScroll)
    }

    private setElementStyle(styleName: string, value: string) {
        if (this.element) {
            this.element.style[styleName] = value
        }
    }

    private setScrollableElement() {
        const isScrollable = this.element?.querySelector('[data-v-move-scrollable]') !== null
        if (isScrollable) {
            if (this.element?.querySelector('[data-v-move-scrollable]') !== null && this.element?.querySelector('[data-v-move-scrollable]') !== this.scrollableElement) {
                this.scrollableElement = this.element?.querySelector('[data-v-move-scrollable]')
                this.startScrollableOffset = this.scrollableElement?.scrollTop
            }
        }
    }

    destroy() {
        this.removeEvents()
        this.removeScrollEvent()
        this.gesture?.destroy()
        clearTimeout(this._closeTimeout)
    }

    get startCoordinate() {
        return this._startCoordinate
    }

    set startCoordinate(value) {
        this._startCoordinate = value
    }

    get isClosable() {
        return this._isClosable
    }

    set isClosable(value) {
        this._isClosable = value
    }

    get isMovable() {
        return this._isMovable
    }

    set isMovable(value) {
        this._isMovable = value
    }

    get scrolled() {
        return this._scrolled
    }

    set scrolled(value) {
        this._scrolled = value
    }
}

export default {
    bind(el, binding) {
        if (isMobile()) {
            moveDirective = new Move(el, binding.value?.onClose)
        }
    },
    unbind() {
        moveDirective?.destroy()
    },
} as DirectiveOptions

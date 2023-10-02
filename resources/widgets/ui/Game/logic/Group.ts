import Rect from '@/widgets/ui/Game/logic/Rect'

export default class Group<I extends Rect = Rect> {
    // @ts-ignore
    _pool: Record<I['uid'], I> = {}
    protected context: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement, ...rects: I[]) {
        this.add(...rects)
        this.context = canvas
    }

    get length() {
        return Object.keys(this._pool).length
    }

    get pool() {
        return this._pool
    }

    draw() {
        Object.values<I>(this._pool).forEach(rect => {
            rect.draw()
        })
    }

    add(...rects: Rect[]) {
        rects.forEach(rect => {
            this._pool[rect.uid] = rect
        })
    }

    remove(...rectIds: Rect['uid'][]) {
        rectIds.forEach(uid => {
            delete this._pool[uid]
        })
    }
}

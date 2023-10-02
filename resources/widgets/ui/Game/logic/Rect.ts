import { Maybe } from '@/shared/types/helpers'

export type Options = {
    color?: Color
    size?: Size
}

type Color = string
type Size = [width: number, height: number]

export function getTimestamp() {
    return new Date().getTime()
}

export default class Rect {
    protected context: CanvasRenderingContext2D

    private readonly size: Size
    private readonly rectColor: Color
    private readonly image: Maybe<HTMLImageElement>
    private appears = 0

    static count = 0

    _id: number

    x = 0
    y = 0

    constructor(context: CanvasRenderingContext2D, options?: Options) {
        this._id = Rect.count++

        this.context = context

        this.size = options?.size ?? [100, 100]
        this.rectColor = options?.color ?? '#fff'

        this.image = this.loadImage()
        this.appears = 0
    }

    get uid() {
        return this._id
    }

    get width() {
        return this.size[0]
    }

    get height() {
        return this.size[1]
    }

    get color() {
        return this.rectColor
    }

    get top() {
        return this.y
    }

    get right() {
        return this.x + this.width
    }

    get bottom() {
        return this.y + this.height
    }

    get left() {
        return this.x
    }

    get resize() {
        return {
            width: 50,
            height: 50
        }
    }

    setX(positionX) {
        this.x = positionX

        return this
    }

    setY(pos: number) {
        this.y = pos

        return this
    }

    setPosition(x, y) {
        this.x = x
        this.y = y

        return this
    }

    protected loadImage(): Maybe<HTMLImageElement> {
        return null
    }

    draw() {
        this.context.beginPath()
        if (this.image) {
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height)

        } else {
            this.context.rect(this.x, this.y, this.width, this.height)
        }
        this.context.fillStyle = this.color
        if (this.appears <= 100) {
            this.context.globalAlpha = this.appears++ / 100
            this.context.fill()
            this.context.globalAlpha = 1
        } else {
            this.context.fill()
        }
        this.context.closePath()
    }
}

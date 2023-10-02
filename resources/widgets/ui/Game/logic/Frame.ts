export default class Frame {
    private canvas: HTMLCanvasElement

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
    }

    getRect() {
        return this.canvas.getBoundingClientRect()
    }

    get left() {
        return this.canvas.getBoundingClientRect().left
    }

    get right() {
        return this.canvas.getBoundingClientRect().right
    }

    get top() {
        return this.canvas.getBoundingClientRect().top
    }

    get bottom() {
        return this.canvas.getBoundingClientRect().bottom
    }
}

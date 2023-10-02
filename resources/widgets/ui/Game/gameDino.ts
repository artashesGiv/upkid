import { Dino, FoodGroup } from './logic'
import { getTimestamp } from '@/widgets/ui/Game/logic/Rect'

let _canvas: HTMLCanvasElement

let mousePosition: [x: number, y: number] = [0, 0]

let missingCount = 0
let catchCount = 0

let timestamp = getTimestamp()

// let text: CanvasRenderingContext2D
let gameOverCallback: () => void

let isStarted = false
let timeStarted = 0

let dino: Dino
let foods: FoodGroup
let clear: () => void
let interval: ReturnType<typeof setInterval>

const SPACING_OFFSET = 10
const TIMEOUT = 10

type RectType = {
    x: number
    y: number
    width: number
    height: number
}

function checkIntersection(r1: RectType, r2: RectType) {
    if (r2.x > r1.x - r2.width && r2.x < r1.x + r1.width) {
        if (r2.y > r1.y - r2.height && r2.y < r1.y + r1.height) {
            return true
        }
    }
}

// Run for start animation visibility
function runVisible() {
    const initXPosition = 100
    let initYPosition = _canvas.height

    dino.setPosition(initXPosition, initYPosition)
    clear()
    dino.draw()

    return new Promise(resolve => {
        interval = setInterval(() => {
            dino.setPosition(initXPosition, (initYPosition -= 2))
            clear()
            dino.draw()

            // console.log(dino.bottom, _canvas.height)
            if (dino.bottom <= _canvas.height - SPACING_OFFSET) {
                clearInterval(interval)

                resolve('')
            }
        }, 10)
    })
}

// call after actions with module
function initialize(canvas: HTMLCanvasElement) {
    _canvas = canvas

    catchCount = 0
    missingCount = 0

    document.onmousemove = event => {
        const { x, y } = getMousePos(_canvas, event)

        mousePosition = [x, y]
    }

    clear = () => {
        const context = canvas.getContext('2d')!

        context.clearRect(0, 0, _canvas.width, _canvas.height)
    }

    dino = new Dino(canvas.getContext('2d')!)
    dino.setPosition(_canvas.width - dino.width - 2, _canvas.height - dino.height - 30)

    foods = new FoodGroup(canvas)

    // text = _canvas.getContext('2d')!
}

function getCanvasBoundingRect() {
    return _canvas.getBoundingClientRect()
}

function getMousePos(canvas, evt) {
    const rect = getCanvasBoundingRect() // abs. size of element
    const scaleX = canvas.width / rect.width // relationship bitmap vs. element for x
    const scaleY = canvas.height / rect.height // relationship bitmap vs. element for y

    return {
        x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    }
}

function gameOver() {
    isStarted = false

    foods.clear()
    draw()

    clearInterval(interval)

    gameOverCallback()
}

function checkGameOver() {
    if (catchCount >= 8) {
        gameOver()
    }

    // console.log('timestamps', timestamp, timeStarted)
    if (catchCount === 0 && timeStarted && timestamp - timeStarted >= 20000) {
        gameOver()
    }
}

function run() {
    timeStarted = getTimestamp()

    interval = setInterval(() => {
        checkGameOver()

        clear()
        draw()
    }, 10)
}

function setDinoPosition() {
    const [x] = mousePosition
    const canvasRect = getCanvasBoundingRect()

    dino.setY(canvasRect.height - dino.height - SPACING_OFFSET)

    if (x < dino.width / 2) {
        dino.setX(0)
    } else if (x > canvasRect.width - dino.width / 2) {
        dino.setX(canvasRect.width - dino.width)
    } else {
        dino.setX(x - dino.width / 2)
    }
}

function checkFoodIntersection() {
    const canvasRect = getCanvasBoundingRect()

    const missided: number[] = []
    const excluded: number[] = []

    Object.values(foods.pool).forEach(food => {
        if (checkIntersection(dino, food)) {
            // console.log('colliderect', food.uid)
            excluded.push(food.uid)
            catchCount++
        }
        if (food.y > canvasRect.height) {
            // console.log('missing', food.uid)
            missided.push(food.uid)
            missingCount++
        }
    })

    foods.remove(...excluded, ...missided)
}

function draw() {
    setDinoPosition()
    dino.draw()

    const time = getTimestamp()
    if (timestamp + TIMEOUT < time) {
        foods.fall()

        timestamp = time
    }

    foods.draw()

    checkFoodIntersection()

    if (foods.length < 1) {
        foods.create()
    }

    // text.font = '34px sans-serif'
    // text.fillText(`Поймано сладостей: ${catchCount}`, 20, 40)
}

export default {
    initialize,
    run,
    gameOver,
    runVisible,
    onGameOver(cb: () => void) {
        gameOverCallback = cb
    },
}

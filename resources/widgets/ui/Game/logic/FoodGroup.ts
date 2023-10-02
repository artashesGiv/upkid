import Group from './Group'
import Food from './Food'

const CREATED_OFFSET = 50

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export function getRandomInteger(min: number, max: number) {
    return +Math.floor(Math.random() * (max - min) + min).toFixed(0)
}

export default class FoodGroup extends Group<Food> {
    create() {
        const r = getRandomInteger(0, 10)
        const g = getRandomInteger(0, 10)
        const b = getRandomInteger(0, 10)

        const food = new Food(this.context.getContext('2d')!, {
            color: `#${r}${g}${b}`,
        })
        const canvasRect = this.context.getBoundingClientRect()

        food.setPosition(getRandomInteger(CREATED_OFFSET, canvasRect.width - food.width - CREATED_OFFSET), -food.height)
        this.add(food)
    }

    clear() {
        this._pool = {}
    }

    fall() {
        Object.values(this.pool).forEach(rect => {
            rect.fall()
        })
    }

    remove(...rectIds) {
        super.remove(...rectIds)
    }
}

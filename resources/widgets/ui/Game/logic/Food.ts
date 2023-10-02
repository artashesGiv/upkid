import Rect from './Rect'
import { getRandomInteger } from '@/widgets/ui/Game/logic/FoodGroup'

const generateImage = (num: number) => {
    const img = new Image(50, 50)
    img.src = `/images/decoration/main/game/item${num}.svg`

    return img
}

const mapImages = {}

export default class Food extends Rect {
    get width() {
        return 50
    }

    get height() {
        return 50
    }

    fall() {
        this.y += 3
    }

    override loadImage() {
        const num = getRandomInteger(1, 5)

        const image = mapImages[num]

        if (image) {
            return image
        }

        mapImages[num] = generateImage(num)

        return mapImages[num]
    }
}

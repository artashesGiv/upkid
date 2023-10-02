import Rect from './Rect'

let image

const imageDino = `<svg xmlns="http://www.w3.org/2000/svg" width="156" height="110" fill="none">
    <path fill="#fff" fill-rule="evenodd"
          d="M60.866 5.5V0h44.266v5.5h5.533v22H82.999V33h16.6v5.5H71.931v11h20.725v12.075H156v27.169h-5.961v6.037H86.696V55.537h-3.697V60.5h-5.533V55h-5.534v16.5H66.4V77h-5.533v5.5h-5.533v11h5.533V99H49.799v-5.5h-5.533V88h-5.533v5.5H33.2V99h-5.534v5.5H33.2v5.5H22.133V88H16.6v-5.5h-5.534V77H5.533v-5.5H0v-33h5.533v11h5.533V55H16.6v5.5h11.066V55H33.2v-5.5h5.533V44h11.066v-5.5h5.534v-33h5.533Zm11.066 0H66.4V11h5.533V5.5Z"
          clip-rule="evenodd"/>
    <path fill="#fff"
          d="M101.598 100.819h-8.941v9.056h8.941v-9.056ZM141.098 100.819h8.941v9.056h-8.941v-9.056Z"/>
</svg>
`

export default class Dino extends Rect {
    override loadImage() {
        if (!image) {
            const img = new Image(this.width, this.height)
            img.src = '/images/decoration/main/game/Dino1.png'
            img.width = this.width
            img.height = this.height

            // img.onload = () => {
            //     this.context.drawImage(img, this.x, this.y)
            // }

            return img
        }

        return image
    }

    get width() {
        return 135.1
    }

    get height() {
        return 96
    }
}

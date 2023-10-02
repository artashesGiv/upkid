<template lang="pug">

.b-game(
    ref="container"
)
    canvas.__canvas(
        ref="window"
        :width="width"
        :height="height"
    )

</template>

<script lang="ts">
import {Component, Emit, Ref, Vue} from 'vue-property-decorator'
import game from './gameDino'

let timeout

@Component
export default class Game extends Vue {
    @Ref('window') windowRef!: HTMLCanvasElement
    @Ref('container') containerRef!: HTMLDivElement

    width = 1200
    height = 600

    @Emit('gameOver') gameOverEmit() {
        /**/
    }

    mounted() {
        game.initialize(this.windowRef)
        game.onGameOver(this.gameOverEmit)

        const { width, height } = this.containerRef.getBoundingClientRect()

        this.width = width
        this.height = height

        timeout = setTimeout(() => {
            game.runVisible()
        }, 500)
    }

    beforeDestroy() {
        clearTimeout(timeout)
    }

    public run() {
        game.run()
    }

    public stop(){
        game.gameOver()
    }
}
</script>

<!-- <style lang="scss" src="./Game.critical.scss" /> -->
<!-- <style lang="scss" src="./Game.main.scss" /> -->

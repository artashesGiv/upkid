<template lang="pug">

.b-main(
    :class="`main--state-${isReady || isGame ? 'wide' : 'view'}`"
)
    img.__background(
        src="/images/decoration/main/Union.svg"
        srcset="/images/decoration/main/UnionMobile.svg 769w, /images/decoration/main/Union.svg"
        fetchpriority="high"
        alt="child"
    )
    transition(
        name="fade"
        mode="out-in"
    )
        template(
            v-if="!$device.size.desktop"
        )
            main-view-component(
                key="mobile-view"
            )
        template(
            v-else-if="isReady || isGame"
        )
            transition-group(
                name="fade-group"
            )
                template(
                    v-if="isGame"
                )
                    .__button-stop-game.container(
                        key="button-stop-game"
                    )
                        button-component(
                            ariaLabel="Esc"
                            size="xs"
                            view="secondary-brand-outline"
                        ) Esc
                        p {{ sectionContent.game.buttonEnd }}
                    game-component.__absolute(
                        key="game"
                        ref="game"
                        @gameOver="onEndGame"
                    )
                template(
                    v-if="isReady"
                )
                    main-ready-component.__absolute(
                        key="ready"
                        @complete="startGame"
                        @startCount="onStartCount"
                    )
        main-response-component(
            v-else-if="isCompleted"
            key="response"
            @repeat="onRepeat"
        )
        main-view-component(
            v-else
            key="view"
            @click="isReady = true"
        )
    transition-fade
        .__ticker(
            v-if="!isReady && !isGame"
        )
            .__wrapper(
                v-if="isTicker"
            )
                .__list(
                    v-for="_ in 4"
                )
                    p.__item(
                        v-for="step in sectionContent.ticker"
                    ) {{ step }}
            .__list
                p.__item(
                    v-for="step in sectionContent.ticker"
                ) {{ step }}

</template>

<script lang="ts">
import { Component, Inject, Mixins, Ref, Watch } from 'vue-property-decorator'

import { MainView } from './states'
import ModalDefaultMixin from '@/shared/lib/mixins/utility/modalDefault'

import { DeviceProviderValue } from '@/shared/lib/providers/device'
import { LanguageContent } from '@/shared/api/types'
import { onKeydown } from '@/shared/lib/utils/other/keydown'
import TransitionFade from '@/shared/lib/ui/TransitionFade/TransitionFade.vue'

let timeout

@Component({
    components: {
        TransitionFade,
        'main-response-component': () =>
            import(
                /* webpackChunkName: "chunks/game" */
                './states/MainResponse/MainResponse.vue'
            ),
        'game-component': () =>
            import(
                /* webpackChunkName: "chunks/game" */
                '@/widgets/ui/Game/Game.vue'
            ),
        'main-ready-component': () =>
            import(
                /* webpackChunkName: "chunks/game" */
                './states/MainReady/MainReady.vue'
            ),
        'main-view-component': MainView,
    },
})
export default class Main extends Mixins(ModalDefaultMixin) {
    @Inject('$device') $device!: DeviceProviderValue

    get sectionContent(): LanguageContent['main'] {
        return this.$content.main
    }

    isGame = false
    isReady = false

    isCompleted = false

    @Ref('game') gameRef!: never

    get isTicker() {
        return this.$device.size.maxMobileLate
    }

    onRepeat() {
        this.isGame = false
        this.isReady = true
    }

    startGame() {
        // this.isGame = true
        this.isReady = false

        // @ts-ignore
        this.gameRef!.run()
    }

    stopGame() {
        // @ts-ignore
        this.gameRef.stop()
        this.onEndGame()
    }

    onStartCount() {
        this.isGame = true
    }

    onEndGame() {
        this.isGame = false
        this.isReady = false
        this.isCompleted = true
    }

    onKeydownEsc(e: KeyboardEvent) {
        onKeydown(e, [
            {
                key: 'esc',
                callback: this.stopGame,
            },
        ])
    }

    addEvents() {
        // console.log('addEvents')
        document.addEventListener('keydown', this.onKeydownEsc, { passive: true })
    }

    removeEvents() {
        // console.log('removeEvents')
        document.removeEventListener('keydown', this.onKeydownEsc)
    }

    beforeDestroy() {
        clearTimeout(timeout)
        this.removeEvents()
    }

    @Watch('isGame')
    onToggleIsGame(value) {
        if (value) {
            this.addEvents()
        } else {
            this.removeEvents()
        }
    }
}
</script>

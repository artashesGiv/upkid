<template lang="pug">

.b-main-ready
    transition(
        name="fade"
        mode="out-in"
    )
        .__notify(
            v-if="isNotify"
            key="notify"
        )
            p {{ sectionContent.game.textStart }}
            .__wrapper
                img.__mouse(
                    src="/images/decoration/main/mouse.svg"
                    alt="mouse"
                )
        .__count(
            v-else
            key="count"
        )
            transition(
                name="scaling"
                mode="out-in"
                appear
            )
                img(
                    v-if="[1, 2, 3].includes(count)"
                    :key="count"
                    :src="`/images/decoration/main/game/count${count}.svg`"
                    alt="count"
                )

</template>

<script lang="ts">
import {Component, Emit, Vue, Watch} from 'vue-property-decorator'
import {LanguageContent} from "@/shared/api/types";

let timeout
let interval

@Component
export default class MainReady extends Vue {
    get sectionContent(): LanguageContent['main'] {
        return this.$content.main
    }

    isNotify = true
    count = 3

    @Emit('complete') completeEmit() {/**/}
    @Emit('startCount') startCountEmit() {/**/}

    setNotify(value: boolean) {
        this.isNotify = value

        interval = setInterval(() => {
            this.setCount(this.count - 1)
        }, 1500)
    }

    setCount(count: number) {
        if (count <= 3 && count >= 0) {
            this.count = count
        }
    }

    mounted() {
        timeout = setTimeout(() => {
            this.setNotify(false)
            this.startCountEmit()
        }, 4000)
    }

    beforeDestroy() {
        clearTimeout(timeout)
    }

    @Watch('count')
    onChangeCount(value) {
        if (value < 1) {
            clearInterval(interval)

            this.completeEmit()
        }
    }
}
</script>

<!-- <style lang="scss" src="./MainReady.critical.scss" /> -->
<!-- <style lang="scss" src="./MainReady.main.scss" /> -->

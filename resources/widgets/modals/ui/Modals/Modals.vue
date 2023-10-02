<template lang="pug">
    div
        component(
            v-for="modalName in modalList"
            v-if="isOpenModal(modalName)"
            :key="modalName"
            :is="`modal-${modalName}-component`"
        )

</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {modals} from "@/widgets/modals/model/module/state";
import {Getter} from "@/shared/lib/utils/other/decorators";
import {ModalsActiveGetter} from "@/widgets/modals/model/module/getters";

export type ModalsProps = {

}

@Component
export default class Modals extends Vue {
    @Getter('modals/active') active!: ModalsActiveGetter

    modalList = modals

    isOpenModal(modalName) {
        return this.active === modalName
    }

    @Watch('active')
    onChangeModalActive(newValue, oldValue) {
        if (newValue !== null) {
            this.$scrollLock.disablePageScroll()
        } else {
            this.$scrollLock.enablePageScroll()
        }
    }
}
</script>

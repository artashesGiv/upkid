<template lang="pug">
    .b-avatar
        transition-fade-component
            picture-component.__image(
                v-if="isSuccess"
                :src="imagePath"
                fallbackExt="png"
                alt="avatar"
            )
            .__wrapper(
                v-else-if="isError"
            )
                p.__title {{nameSymbol}}
</template>

<script lang="ts">
import {Component, Prop, VModel, Vue, Watch} from 'vue-property-decorator'
import {SizePropsType} from "@/shared/types/helpers";

export type AvatarProps = {
    imagePath?: string,
    username: string
}

@Component
export default class Avatar extends Vue {
    @Prop() readonly imagePath: AvatarProps['imagePath']
    @Prop() readonly username!: AvatarProps['username']

    isSuccess = false
    isError = false

    setIsSuccess(value: boolean){
        this.isSuccess = value
    }

    setIsError(value: boolean){
        this.isError = value
    }

    setImageStatus() {
        if (this.imagePath) {
            const img = new Image();
            img.src = `${this.imagePath}.png`;

            this.setIsSuccess(false)
            this.setIsError(false)

            if(img.complete){
                this.setIsSuccess(true)
            }

            img.onload = () => {
                this.setIsSuccess(true)
            };

            img.onerror = () => {
                this.setIsError(true)
            };
        } else {
            this.setIsError(true)
        }
    }

    get nameSymbol(): string {
        return this.username[0]
    }

    mounted() {
        this.setImageStatus()
    }

    @Watch('imagePath')
    onChangeAvatar() {
        this.setImageStatus()
    }
}
</script>

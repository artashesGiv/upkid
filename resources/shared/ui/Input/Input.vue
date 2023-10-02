<template lang="pug">

.b-input(
    :class="classes"
)
    input.__value(
        v-if="!isMask"
        v-model="valueModel"
        :placeholder="placeholder"
        :disabled="isDisabledProps"
        v-on:input="onInput"
    )
    cleave.__value(
        v-else
        v-model="valueModel"
        :placeholder="placeholder"
        :disabled="isDisabledProps"
        :raw="true"
        :options="cleaveOptions"
        v-on:input="onCleaveInput"
    )
    transition-fade-component
        .__error
            tooltip-component.__tooltip(
                v-if="isErrorProps && errorText"
                v-bind="tooltipProps"
            )
                icon-base-component.__icon(
                    tag="button"
                    name="warning"
                )
                template(
                    #content
                )
                    p {{errorText}}
</template>

<script lang="ts">
import {
    Component,
    Inject,
    Prop,
    PropSync,
    VModel,
    Vue
} from 'vue-property-decorator'
import {SizePropsType, ViewPropsType} from "@/shared/types/helpers"
import {Tooltip, TooltipProps} from "../Tooltip";
import {DeviceProviderValue} from "@/shared/lib/providers/device";

export type InputProps = {
    value: string
    placeholder: string
    isDisabled?: boolean
    isError?: boolean
    view?: Extract<ViewPropsType, 'base' | 'secondary'>
    size?: Extract<SizePropsType, 'm' | 'l'>
    errorText?: string
    mask?: "phone" | "none"
}

@Component({
    components: {
        'tooltip-component': Tooltip
    }
})
export default class Input extends Vue {
    @Prop({default: 'base'}) readonly view?: InputProps['view']
    @Prop({default: 'l'}) readonly size?: InputProps['size']
    @Prop() readonly placeholder!: InputProps['placeholder']
    @Prop() readonly isDisabled?: InputProps['isDisabled']
    @Prop() readonly errorText?: InputProps['errorText']
    @Prop({ default: "none" }) readonly mask?: InputProps['mask']
    @PropSync('isError') isErrorSync?: InputProps['isError']

    @VModel() valueModel!: InputProps['value']

    @Inject('$device') $device!: DeviceProviderValue

    clearError() {
        this.isErrorSync = false
    }

    onInput(e: InputEvent){
        this.clearError()
    }

    onCleaveInput(value: string) {
        this.valueModel = value.replace('+', '')
        this.clearError()
    }

    get cleaveOptions() {
        return {
            numericOnly: true,
            blocks: [2, 3, 3, 2, 2],
            delimiters: [' ', ' ', '-', '-'],
            prefix: '+',
            noImmediatePrefix: true,
            copyDelimiter: true,
        }
    }

    get isMask() {
        return this.mask !== "none"
    }

    get tooltipProps(): TooltipProps {
        return {
            position: 'top-left',
            actionType: this.$device.size.desktop ? 'hover' : 'click'
        }
    }

    get classes() {
        const optional = {
            'is-disabled': this.isDisabledProps,
            'is-error': this.isErrorProps,
        }

        return [`input--size-${this.size}`, `input--view-${this.view}`, optional]
    }


    get isDisabledProps(){
        return typeof this.isDisabled !== 'undefined' && this.isDisabled
    }

    get isErrorProps(){
        return typeof this.isErrorSync !== 'undefined' && this.isErrorSync
    }
}
</script>


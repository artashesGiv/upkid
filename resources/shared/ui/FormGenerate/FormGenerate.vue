<template lang="pug">

.b-form-generate(
    :class="classes"
)
    input-component.__input(
        v-for="(fieldName, index) in fields"
        :key="fieldName"
        :value="valueModel[fieldName]"
        :style="index !== 0 && styles"
        :view="view"
        :size="currentSize"
        :isDisabled="loading"
        v-bind="appearance[fieldName].binding"
        :isError="isError(fieldName)"
        @input="onInput(fieldName, $event)"
    )
    button-component.__button(
        :ariaLabel="buttonText"
        :style="buttonStyles"
        :size="currentSize"
        :loading="loading"
        view="secondary-brand"
        @click="onClick"
    ) {{ buttonText }}
    p.__policy(
        v-if="isPolicy"
        :class="`form-generate__policy--view-${view}`"

        v-html="privacyText"
    )

</template>

<script lang="ts">
import {Component, Emit, Inject, Prop, VModel, Vue} from 'vue-property-decorator'

import { Input } from '@/shared/ui/Input'
import {DeviceProviderValue} from '@/shared/lib/providers/device'
import pxToRem from '@/shared/lib/utils/other/pxToRem'
import {LanguageContent} from "@/shared/api/types";

type FieldName = 'name' | 'email' | 'phone' | 'age'
type FieldAppearance = {
    validRegex: RegExp,
    binding: Record<string, string>
}

export type FormGenerateProps = {
    direction?: 'row' | 'column' | 'byDevice'
    size?: 'm' | 'l' | 'byDevice'
    buttonText?: string
    view?: Input['view']
    isPolicy?: boolean
    isValidation?: boolean
    loading?: boolean
}

@Component({
    components: {
        'input-component': Input
    },
})
export default class FormGenerate extends Vue {
    @VModel() valueModel!: Partial<Record<FieldName, string>>
    @Prop({ default: 'column' }) readonly direction!: FormGenerateProps['direction']
    @Prop({ default: 'byDevice' }) readonly size!: FormGenerateProps['size']
    @Prop({ default: "Оставить заявку" }) readonly buttonText!: FormGenerateProps['buttonText']
    @Prop({ default: 'base' }) readonly view!: FormGenerateProps['view']
    @Prop({ default: false }) readonly isPolicy!: FormGenerateProps['isPolicy']
    @Prop({ default: true }) readonly isValidation!: FormGenerateProps['isValidation']
    @Prop({ default: false }) readonly loading?: boolean

    @Inject('$device') $device!: DeviceProviderValue

    errors: FieldName[] = []

    @Emit('click')
    clickEmit() {/**/}

    onClick() {
        if (this.isValidation) {
            if (this.validate()) {
                this.clickEmit()
            }
        } else {
            this.clickEmit()
        }
    }

    validate(): boolean {
        let isSuccess = true

        const entries = Object.entries(this.valueModel) as unknown as [FieldName, string][]

        entries.forEach(([key, value]) => {
            const { validRegex } = this.appearance[key]

            if (!validRegex.test(value)) {
                isSuccess = false

                this.errors.push(key)
            }
        })

        return isSuccess
    }

    get buttonStyles() {
        if (this.currentDirection === 'row') {
            return {
                'margin-left': `${pxToRem(12)}px`
            }
        }

        return {
            'margin-top': this.$device.size.maxMobile ? `${pxToRem(12)}px` : `${pxToRem(24)}px`
        }
    }

    get classes() {
        return `form-generate--direction-${this.currentDirection}`
    }

    get currentDirection(): Exclude<FormGenerate['direction'], 'byDevice'> {
        if (this.direction === 'byDevice') {
            return this.$device.size.maxMobileLate ? 'column' : 'row'
        }
        return this.direction
    }

    get currentSize() {
        if (this.size === 'byDevice') {
            return this.$device.size.maxMobile ? 'm' : 'l'
        }

        return this.size
    }

    get styles() {
        // maybe change number rem
        const spacing = this.$device.size.maxMobile ? pxToRem(8) : pxToRem(12)

        if (this.currentDirection === 'column') {
            return { 'margin-top': `${spacing}px` }
        }
        return { 'margin-left': `${spacing}px` }
    }

    isError(fieldName: FieldName) {
        return this.errors.includes(fieldName)
    }

    get appearance(): Record<FieldName, FieldAppearance> {
        return {
            name: {
                validRegex: /^.{2,}$/,
                binding: {
                    placeholder: this.$staticContent.forms.placeholders.name,
                    errorText: this.$staticContent.forms.errorTexts.name,
                }
            },
            email: {
                validRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
                binding: {
                    placeholder: this.$staticContent.forms.placeholders.email,
                    errorText: this.$staticContent.forms.errorTexts.email,
                }
            },
            phone: {
                validRegex: /^\d{11}$/,
                binding: {
                    mask: "phone",
                    placeholder: this.$staticContent.forms.placeholders.phone,
                    errorText: this.$staticContent.forms.errorTexts.phone,
                }
            },
            age: {
                validRegex: /^\d{1,2}$/,
                binding: {
                    placeholder: this.$staticContent.forms.placeholders.age,
                    errorText: this.$staticContent.forms.errorTexts.age,
                }
            }
        }
    }

    get fields(): FieldName[] {
        return Object.keys(this.valueModel) as FieldName[]
    }

    get privacyText(): LanguageContent['privacy'] {
        return this.$content.privacy
    }

    onInput(fieldName, value) {
        this.valueModel = {
            ...this.valueModel,
            [fieldName]: value,
        }

        if (this.errors.includes(fieldName)) {
            this.errors = this.errors.filter(field => field !== fieldName)
        }
    }
}
</script>

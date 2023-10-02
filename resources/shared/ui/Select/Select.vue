<template lang="pug">

.b-select(
    :class="classes"
    v-click-outside="() => setIsOpen(false)"
)
    .__wrapper.-head(
        v-on:click.stop="toggleIsOpen"
    )
        transition-fade-component
            .__option.-head(
                v-if="activeOption"
                :id="activeOption.id"
                :key="activeOption.id"
            )
                //icon-flag-component(
                //    :name="valueModel"
                //    :size="size"
                //)
                p {{activeOption.text}}
    transition(
        name="fade-down"
        mode="out-in"
    )
        .__wrapper.-list(
            v-if="isOpen"
        )
            .__option.-list(
                v-for="option in filteredOptions"
                v-on:click="onSetValue(option.id)"
            )
                //icon-flag-component(
                //    :name="option.id"
                //    :size="size"
                //)
                p {{option.text}}

</template>

<script lang="ts">
import {Component, Prop, VModel, Vue, Watch} from 'vue-property-decorator'
import {SizePropsType} from '@/shared/types/helpers'
import {IconFlag} from '@/shared/lib/ui/IconFlag'
import {onKeydown} from '@/shared/lib/utils/other/keydown'
import {Languages} from '@/entities/content'

export type SelectOption = {
    id: Languages,
    text: string,
}

export type SelectProps = {
    size?: Extract<SizePropsType, 'm' | 's'>
    value: SelectOption['id']
}

@Component({
    components: {
        'icon-flag-component': IconFlag
    }
})
export default class Select extends Vue {
    @VModel() valueModel!: Languages

    @Prop({default: 'm'}) readonly size!: SelectProps['size']

    options: SelectOption[] = [
        {
            id: Languages.ENGLISH,
            text: 'EN'
        },
        {
            id: Languages.ROMANIAN,
            text: 'RO'
        },
        // {
        //     id: Languages.ENGLISH,
        //     text: 'EN'
        // }
    ]

    isOpen = false

    setIsOpen(value: boolean){
        this.isOpen = value
    }

    toggleIsOpen(): void {
        this.setIsOpen(!this.isOpen)
    }

    onSetValue(value: SelectProps['value']){
        this.setValue(value)
        this.setIsOpen(false);
    }

    setValue(value: SelectProps['value']){
        this.valueModel = value
    }

    onKeydown(e) {
        onKeydown(e, [
            {
                key: 'esc',
                callback: () => this.setIsOpen(false),
            },
            {
                key: 'enter',
                callback: () => this.setIsOpen(false),
            },
        ])
    }

    onScrollPage(){
        if(this.isOpen){
            this.setIsOpen(false)
        }
    }

    addEvents() {
        document.addEventListener('keydown', this.onKeydown, { passive: true })
        document.addEventListener('scroll', this.onScrollPage, { passive: true })
    }

    removeEvents() {
        document.removeEventListener('keydown', this.onKeydown)
        document.removeEventListener('scroll', this.onScrollPage)
    }

    get classes() {
        return  [
            `select--size-${this.size}`
        ]
    }

    get activeOption(){
        return this.options.find(option => option.id === this.valueModel)
    }

    get filteredOptions(){
        return this.options.filter(option => option.id !== this.valueModel)
    }

    @Watch('isOpen')
    onChangeIsOpen(newValue: boolean){
        if(newValue) {
            this.addEvents()
        } else {
            this.removeEvents()
        }
    }

    beforeDestroy() {
        this.removeEvents()
    }
}
</script>

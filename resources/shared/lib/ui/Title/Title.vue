<script lang="ts">
import {VNode} from "vue"
import {Functional} from "@/shared/lib/utils/other/functional-component"
import {IconName, SizePropsType, ViewPropsType} from "@/shared/types/helpers"

export type TitleProps = {
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div',
    size?: Extract<SizePropsType, 's' | 'm' | 'l'>,
    view?: Extract<ViewPropsType, 'base' | 'surface'>
    highlightLeft?: boolean
    highlightRight?: boolean
    highlightSize?: 'm' | 'l'
    icon?: IconName
}


export default Functional<TitleProps>((h, { props, data, children }) => {
    const slot = h('div', {
        class: 'title__content',
    }, children)

    const highlightSize = props.highlightSize ?? 'm'

    const list: VNode[] = []

    const highlightSrc = `/images/decoration/highlight/${props.view || "base"}.svg`

    if(props.highlightLeft) {
        const highlight = h('image-component', {
            class: [
                'title__highlight',
                'title__highlight--left',
                `title__highlight--size-${highlightSize}`
            ],
            props: {
                src: highlightSrc,
            },
        })

        list.push(highlight)
    }

    list.push(slot)

    if(props.icon) {
        const icon = h('icon-base-component', {
            class: 'title__icon',
            props: {
                name: props.icon,
            },
        })

        list.push(icon)
    }

    if(props.highlightRight) {
        const highlight = h('image-component', {
            class: [
                'title__highlight',
                'title__highlight--right',
                `title__highlight--size-${highlightSize}`
            ],
            props: {
                src: highlightSrc,
            },
        })

        list.push(highlight)
    }

    return h(
        props.tag || 'div',
        {
            class: ['title', data.staticClass, data.class, `title--size-${props.size || 'm'}`, `title--view-${props.view || 'base'}`],
        },
        list
    )
})
</script>


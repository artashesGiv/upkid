<script lang="ts">
import {Functional} from '@/shared/lib/utils/other/functional-component'
import {TagPropsType} from '@/shared/types/helpers'
import getOptionsByTag from "@/shared/lib/utils/other/getOptionsByTag";
import {isNullable} from "@/shared/lib/utils/other/isNullable";

export type LinkProps = {
    tag: Extract<TagPropsType, 'a' | 'router-link' | 'button'>
    href?: string
    view?: 'base' | 'surface' | 'secondary'
    isBold?: boolean
}

export default Functional<LinkProps>((h, { props, data, listeners, children }) => {

    const optionalClass = {
        'is-bold': !isNullable(props.isBold)
    }

    return h(
        props.tag,
        {
            class: ['link', data.staticClass, data.class, `link--view-${props.view || 'base' }`, optionalClass],
            ...(props.tag === 'a' && props.href) && {
                attrs: getOptionsByTag('a', props.href)
            },
            ...(props.tag === 'router-link' && props.href) && {
                props: getOptionsByTag('router-link', props.href)
            },
            ...props.tag === 'button' && {
                attrs: getOptionsByTag('button'),
                on: {
                    click: () => (listeners.click as Function)()
                }
            },
        },
        [
            children
        ]
    )
})
</script>



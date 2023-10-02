<script lang="ts">
import {VNode} from "vue";
import {IconName, ViewPropsType} from "@/shared/types/helpers";
import {Functional} from "@/shared/lib/utils/other/functional-component";

export type TagProps = {
    icon?: IconName
    view?: Extract<ViewPropsType, 'base' | 'brand'>
}

export default Functional<TagProps>((h, { props, data, listeners, children }) => {
    const classes = [
        'tag',
        data.staticClass,
        data.class,
        `tag--view-${props.view || 'base'}`
    ]
    const onItemClick = listeners.click as Function

    const icon = h('icon-base-component', {
        props: {
            name: props.icon,
        }
    })

    const content: VNode[] = []

    if (props.icon) {
        content.push(icon)
    }

    return h(
        'div',
        {
            class: classes,
            on: {
                ...listeners.input && {
                    click: () => onItemClick()
                }
            }
        },
        [
            content,
            children
        ]
    )
})
</script>


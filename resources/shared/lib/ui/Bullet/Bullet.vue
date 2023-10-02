<script lang="ts">
import {IconName} from '@/shared/types/helpers'
import {Functional} from '@/shared/lib/utils/other/functional-component'

export type BulletProps = {
    icon: IconName
}

export default Functional<BulletProps>((h, {
    props,
    data,
    children,
}) => {
    const classes = ['bullet', data.staticClass, data.class]

    const icon = h('icon-base-component', {
        props: {
            name: props.icon,
        },
        class: 'bullet__icon'
    })

    return h(
        'div',
        {
            class: classes,
        },
        [
            icon,
            children,
        ],
    )
})
</script>

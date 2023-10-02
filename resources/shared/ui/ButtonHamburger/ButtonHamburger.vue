<script lang="ts">

import {Functional} from "@/shared/lib/utils/other/functional-component";

export type ButtonHamburgerProps = {
    value: boolean
}

export default Functional<ButtonHamburgerProps>((h, { props, data, listeners }) => {
    const classes = ['button-hamburger', data.staticClass, data.class]
    const onItemClick = listeners.input as Function

    if(props.value){
        classes.push('is-active')
    }

    return h(
        'div',
        {
            class: classes,
            on: {
                click: () => onItemClick(!props.value)
            }
        },
        [
            h('span'),
            h('span'),
            h('span')
        ]
    )
})
</script>


<script lang="ts">
import {Functional} from "@/shared/lib/utils/other/functional-component";
import {ViewPropsType} from "@/shared/types/helpers";

export type IconSocialProps = {
    view: Extract<ViewPropsType,'base' | 'surface'>,
    name: 'tik-tok' | 'instagram' | 'facebook'
    href: string
}


export default Functional<IconSocialProps>((h, { props, data }) => {
    const icon =  h(
        'icon-base-component',
        {
            props: {
                name: props.name,
            },
        },
    )

    return h(
        'a',
        {
            class: ['icon-social', data.staticClass, data.class, `icon-social--view-${props.view}`],
            attrs: {
                href: props.href,
                target: '_blank',
                rel: 'noopener noreferrer'
            }
        },
        [
            icon
        ]
    )
})
</script>


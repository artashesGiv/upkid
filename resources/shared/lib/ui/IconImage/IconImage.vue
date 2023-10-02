<script lang="ts">
import {VNode} from "vue";
import {Functional} from "@/shared/lib/utils/other/functional-component";

export type IconSvgName = 'users' | 'facebook' | 'instagram' | 'link' | 'phone' | 'twitter'

export type IconImageProps = {
    name: IconSvgName
    src: string
}


export default Functional<IconImageProps>((h, { props, data }) => {

    const children: VNode[] = []

    if(props.src) {
        const image = h('image-component', {
            props: {
                alt: `Иконка ${props.name}`,
                src: props.src
            }
        })
        children.push(image)
    }

    return h(
        'i',
        {
            class: ['icon-image', data.staticClass, data.class],
        },
        children
    )
})
</script>


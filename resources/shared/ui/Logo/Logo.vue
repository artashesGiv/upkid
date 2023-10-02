<script lang="ts">
import {Functional} from "@/shared/lib/utils/other/functional-component";

export type LogoProps = {
    view: 'base' | 'inverse'
}

export default Functional<LogoProps>((h, { data, props }) => {

    const defaultView = props.view || 'base'

    const image = h('image-component', {
        props: {
            src: `/images/utility/${defaultView === 'base' ? 'logo' : 'logo-inverse'}.svg`
        }
    })

    return h('div', {
        class: ['logo', data.staticClass, data.class],
    }, [image])
})
</script>

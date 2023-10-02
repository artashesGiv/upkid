<script lang="ts">
import {Functional} from "@/shared/lib/utils/other/functional-component";
import {SizePropsType} from "@/shared/types/helpers";

export type IconFlagProps = {
    name: 'cis' | 'en' | 'ro'
    size: Extract<SizePropsType, 's' | 'm'>
}

export default Functional<IconFlagProps>((h, { props, data }) => h(
    'icon-image-component',
    {
        class: ['icon-flag', data.class, data.staticClass, `icon-flag--size-${props.size || 'm'}`],
        props: {
            src: `/images/icons/flags/${props.name}.svg`,
            name: `Флаг ${props.name}`
        }
    },
))
</script>


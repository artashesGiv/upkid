import IconFlag from './IconFlag.vue'
import {selectControl} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/lib/icon/IconFlag',
    component: IconFlag,
    argTypes: {
        size: selectControl(['s', 'm']),
        name: selectControl(['cis', 'ro', 'en']),
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {IconFlag},
    methods: {},
    template: '<IconFlag v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    size: 'm',
    name: 'cis'
}

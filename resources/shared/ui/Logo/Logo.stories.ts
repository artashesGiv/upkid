import Logo from './Logo.vue'
import {selectControl} from "../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/ui/Logo',
    component: Logo,
    argTypes: {
        view: selectControl(['base', 'inverse'])
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Logo},
    methods: {},
    template: '<Logo v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    view: 'base'
}

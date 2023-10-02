import ButtonHamburger from './ButtonHamburger.vue'
import {booleanControl} from "../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/ui/ButtonHamburger',
    component: ButtonHamburger,
    argTypes: {
        value: booleanControl(),
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {ButtonHamburger},
    methods: {},
    template: '<ButtonHamburger v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    value: false
}

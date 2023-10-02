import Select from './Select.vue'
import {selectControl} from "../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/ui/Select',
    component: Select,
    argTypes: {
        size: selectControl(['s', 'm'])
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    data: () => ({
        valueModel: 'cis'
    }),
    components: {Select},
    methods: {},
    template: '<Select v-bind="$props" v-model="valueModel"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    size: 'm'
}

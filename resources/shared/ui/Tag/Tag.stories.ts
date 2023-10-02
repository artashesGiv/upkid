import Tag from './Tag.vue'
import {selectControl} from "../../../../.storybook/libs/stories-utils";
import {IconName} from "../../../../.storybook/libs/IconName";

export default {
    title: 'shared/ui/Tag',
    component: Tag,
    argTypes: {
        icon: selectControl(IconName)
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Tag},
    methods: {},
    template: '<Tag v-bind="$props">Text</Tag>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    icon: 'placeholder'
}

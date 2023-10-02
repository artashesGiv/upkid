import IconSocial from './IconSocial.vue'
import {selectControl} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/lib/icon/IconSocial',
    component: IconSocial,
    argTypes: {
        view: selectControl(['base', 'surface']),
        name: selectControl(['tik-tok', 'facebook', 'instagram']),
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {IconSocial},
    methods: {},
    template: '<IconSocial v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    view: 'base',
    name: 'tik-tok'
}

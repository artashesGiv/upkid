import IconImage from './IconImage.vue'
import {selectControl} from "../../../../../.storybook/libs/stories-utils";

export default {
    title: 'shared/lib/icon/IconImage',
    component: IconImage,
    argTypes: {
        name: selectControl(['users'])
    },
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {IconImage},
    methods: {},
    template: '<IconImage v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    name: 'users',
    src: '/images/icons/brand/users.svg'
}

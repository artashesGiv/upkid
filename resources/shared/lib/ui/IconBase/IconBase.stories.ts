import IconBase from "./IconBase.vue"
import {IconName} from '../../../../../.storybook/libs/IconName'
import {defineControls} from '../../../../../.storybook/libs/stories-utils'

export default {
    title: 'shared/lib/icon/IconBase',
    component: IconBase,
    argTypes: defineControls({
        name: IconName
    }),
}

const Template: TemplateFn = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {IconBase},
    methods: {
    },
    template: '<IconBase v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
    name: 'placeholder',
}

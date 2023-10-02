import {ReviewParents, ReviewParentsProps} from '@/pages/Index/sections/ReviewParents'

export default {
    title: 'ReviewParents',
    component: ReviewParents,
    argTypes: {},
}

const Template = (args: ReviewParentsProps) => ({
    props: Object.keys(args),
    components: {ReviewParents},
    methods: {},
    template: '<ReviewParents v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

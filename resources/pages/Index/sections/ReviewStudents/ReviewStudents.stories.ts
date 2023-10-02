import {ReviewStudents, ReviewStudentsProps} from '@/pages/Index/sections/ReviewStudents'

export default {
    title: 'ReviewStudents',
    component: ReviewStudents,
    argTypes: {},
}

const Template = (args: ReviewStudentsProps) => ({
    props: Object.keys(args),
    components: {ReviewStudents},
    methods: {},
    template: '<ReviewStudents v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

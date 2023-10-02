import {FreeLesson, FreeLessonProps} from '@/features/free-lesson/FreeLesson'

export default {
    title: 'features/order/FreeLesson',
    component: FreeLesson,
    argTypes: {},
}

const Template = (args: FreeLessonProps) => ({
    props: Object.keys(args),
    components: {FreeLesson},
    methods: {},
    template: '<FreeLesson v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

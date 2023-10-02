import FreeLessonOrder from './FreeLessonOrder.vue'

export default {
    title: 'features/order/FreeLessonOrder',
    component: FreeLessonOrder,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {FreeLessonOrder},
    methods: {},
    template: '<FreeLessonOrder v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

import Teachers from './Teachers.vue'

export default {
    title: 'Teachers',
    component: Teachers,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Teachers},
    methods: {},
    template: '<Teachers v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

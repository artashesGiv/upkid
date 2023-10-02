import Advantages from './Advantages.vue'

export default {
    title: 'Advantages',
    component: Advantages,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Advantages},
    methods: {},
    template: '<Advantages v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

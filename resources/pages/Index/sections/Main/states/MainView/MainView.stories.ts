import Section from './MainView.vue'

export default {
    title: 'Section',
    component: Section,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Section},
    methods: {},
    template: '<Section v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

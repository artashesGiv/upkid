import Benefits from './Benefits.vue'

export default {
    title: 'Benefits',
    component: Benefits,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Benefits},
    methods: {},
    template: '<Benefits v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

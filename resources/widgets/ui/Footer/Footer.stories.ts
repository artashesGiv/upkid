import Footer from './Footer.vue'

export default {
    title: 'Footer',
    component: Footer,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Footer},
    methods: {},
    template: '<Footer v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

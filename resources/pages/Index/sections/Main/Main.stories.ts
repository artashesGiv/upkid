import Main from './Main.vue'

export default {
    title: 'Main',
    component: Main,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Main},
    methods: {},
    template: '<Main v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

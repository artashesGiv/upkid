import MainReady from './MainReady.vue'

export default {
    title: 'MainReady',
    component: MainReady,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {MainReady},
    methods: {},
    template: '<MainReady v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

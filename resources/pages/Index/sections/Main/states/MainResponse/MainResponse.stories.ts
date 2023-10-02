import MainResponse from './MainResponse.vue'

export default {
    title: 'MainResponse',
    component: MainResponse,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {MainResponse},
    methods: {},
    template: '<MainResponse v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

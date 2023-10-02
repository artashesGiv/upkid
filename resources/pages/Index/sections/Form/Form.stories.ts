import Form from './Form.vue'

export default {
    title: 'Form',
    component: Form,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Form},
    methods: {},
    template: '<Form v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

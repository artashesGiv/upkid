import FormGenerate from './FormGenerate.vue'

export default {
    title: 'FormGenerate',
    component: FormGenerate,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {FormGenerate},
    methods: {},
    template: '<FormGenerate v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

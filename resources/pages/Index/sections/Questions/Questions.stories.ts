import Questions from './Questions.vue'

export default {
    title: 'Questions',
    component: Questions,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Questions},
    methods: {},
    template: '<Questions v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

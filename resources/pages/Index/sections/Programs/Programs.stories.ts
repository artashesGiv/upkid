import Programs from './Programs.vue'

export default {
    title: 'Programs',
    component: Programs,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Programs},
    methods: {},
    template: '<Programs v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

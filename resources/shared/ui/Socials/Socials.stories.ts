import Socials from './Socials.vue'

export default {
    title: 'Socials',
    component: Socials,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Socials},
    methods: {},
    template: '<Socials v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

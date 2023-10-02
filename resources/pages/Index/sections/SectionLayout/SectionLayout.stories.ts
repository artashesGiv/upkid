import SectionLayout from './SectionLayout.vue'

export default {
    title: 'SectionLayout',
    component: SectionLayout,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {SectionLayout},
    methods: {},
    template: '<SectionLayout v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

import Link from './Link.vue'

export default {
    title: 'Link',
    component: Link,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {Link},
    methods: {},
    template: '<Link v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}

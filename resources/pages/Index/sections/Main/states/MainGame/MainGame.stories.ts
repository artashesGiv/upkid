import MainGame from './MainGame.vue'

export default {
    title: 'MainGame',
    component: MainGame,
    argTypes: {},
}

const Template = (args: any, {argTypes}: any) => ({
    props: Object.keys(argTypes),
    components: {MainGame},
    methods: {},
    template: '<MainGame v-bind="$props"/>',
})

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
